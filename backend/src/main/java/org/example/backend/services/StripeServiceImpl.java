package org.example.backend.services;

import com.stripe.Stripe;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
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

            StripeClient client = new StripeClient(stripeApiKey);

            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setAmount(stripePaymentDTO.getAmount())
                            .setCurrency(stripePaymentDTO.getCurrency())
                            .build();

            PaymentIntent intent = client.v1().paymentIntents().create(params);

            booking.setStripePaymentIntentId(intent.getId());
            bookingRepository.save(booking);

            return intent;
        }
    }
