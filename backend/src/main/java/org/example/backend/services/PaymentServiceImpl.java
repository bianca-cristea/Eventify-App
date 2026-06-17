package org.example.backend.services;

import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.*;
import org.example.backend.payload.PaymentDTO;
import org.example.backend.payload.PaymentResponse;
import org.example.backend.repositories.BookingRepository;
import org.example.backend.repositories.PaymentRepository;
import org.example.backend.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {


    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${stripe.secret.key}")
    private String stripeApiKey;


    @Override
    public PaymentDTO createPaymentForBooking(Long bookingId, PaymentMethod paymentMethod) throws StripeException {
        Booking bookingFromDb = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "bookingId", bookingId));

        if (bookingFromDb.getPayment() != null) throw new APIException("You have already payed.");

        if (bookingFromDb.getStripePaymentIntentId() == null) {
            throw new APIException("No payment intent associated with this booking.");
        }

        StripeClient client = new StripeClient(stripeApiKey);
        PaymentIntent paymentIntent = client.v1().paymentIntents().retrieve(bookingFromDb.getStripePaymentIntentId());

        if (!"succeeded".equals(paymentIntent.getStatus())) {
            throw new APIException("Payment not completed yet.");
        }

        Payment payment = new Payment();
        payment.setBooking(bookingFromDb);
        payment.setPaymentMethod(paymentMethod);
        payment.setPaymentDate(LocalDate.now());
        payment.setStatus(PaymentStatus.COMPLETED);

        bookingFromDb.setStatus(BookingStatus.CONFIRMED);

        paymentRepository.save(payment);
        bookingRepository.save(bookingFromDb);

        return modelMapper.map(payment, PaymentDTO.class);
    }

    @Override
    public PaymentResponse getMyPayments(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?
                Sort.by(sortBy).ascending():
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Payment> payments = paymentRepository.findPaymentsByUserId(authUtil.loggedInUserId(),pageDetails);
        if(payments.isEmpty()) throw new APIException("No Payments yet.");

        List<PaymentDTO> paymentDTOS = payments.stream().map(payment -> modelMapper.map(payment,PaymentDTO.class)).toList();

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setContent(paymentDTOS);
        paymentResponse.setPageNumber(payments.getNumber());
        paymentResponse.setPageSize(payments.getSize());
        paymentResponse.setTotalPages(payments.getTotalPages());
        paymentResponse.setTotalElements(payments.getTotalElements());
        paymentResponse.setIsLast(payments.isLast());

        return paymentResponse;

    }

    @Override
    public PaymentResponse getAllPayments(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?
                Sort.by(sortBy).ascending():
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Payment> payments = paymentRepository.findAll(pageDetails);
        if(payments.isEmpty()) throw new APIException("No Payments yet.");

        List<PaymentDTO> paymentDTOS = payments.stream().map(payment -> modelMapper.map(payment,PaymentDTO.class)).toList();

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setContent(paymentDTOS);
        paymentResponse.setPageNumber(payments.getNumber());
        paymentResponse.setPageSize(payments.getSize());
        paymentResponse.setTotalPages(payments.getTotalPages());
        paymentResponse.setTotalElements(payments.getTotalElements());
        paymentResponse.setIsLast(payments.isLast());

        return paymentResponse;
    }


}
