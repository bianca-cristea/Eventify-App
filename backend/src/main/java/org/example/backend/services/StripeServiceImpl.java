package org.example.backend.services;

import com.stripe.Stripe;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeSearchResult;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.Booking;
import org.example.backend.payload.StripePaymentDTO;
import org.example.backend.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class StripeServiceImpl implements StripeService{

    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @Autowired
    private BookingRepository bookingRepository;

    @PostConstruct
    public void init(){
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {

        Booking booking = bookingRepository.findById(stripePaymentDTO.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "bookingId", stripePaymentDTO.getBookingId()));

        long amountInCents = Math.round(booking.getTotalAmount() * 100);

        Customer customer;
        CustomerSearchParams searchParams =
                CustomerSearchParams.builder()
                        .setQuery("email:'" + stripePaymentDTO.getEmail() + "'")
                        .build();
        CustomerSearchResult customers = Customer.search(searchParams);

        if (customers.getData().isEmpty()) {
            CustomerCreateParams customerParams =
                    CustomerCreateParams.builder()
                            .setName(stripePaymentDTO.getName())
                            .setEmail(stripePaymentDTO.getEmail())
                            .build();
            customer = Customer.create(customerParams);
        } else {
            customer = customers.getData().get(0);
        }

        StripeClient client = new StripeClient(stripeApiKey);

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amountInCents)
                        .setCurrency(stripePaymentDTO.getCurrency())
                        .setCustomer(customer.getId())
                        .setDescription(stripePaymentDTO.getDescription())
                        .build();

        PaymentIntent intent = client.v1().paymentIntents().create(params);

        booking.setStripePaymentIntentId(intent.getId());
        bookingRepository.save(booking);

        return intent;
    }
    }
