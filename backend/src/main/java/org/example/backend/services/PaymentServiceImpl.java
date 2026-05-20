package org.example.backend.services;

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



    @Override
    public PaymentDTO createPaymentForBooking(Long bookingId, PaymentMethod paymentMethod) {
        Booking bookingFromDb = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "bookingId", bookingId));


        if(bookingFromDb.getPayment()!=null) throw new APIException("You have already payed.");

        Payment payment = new Payment();
        payment.setBooking(bookingFromDb);
        payment.setPaymentMethod(paymentMethod);
        payment.setPaymentDate(LocalDate.now());
        bookingFromDb.setStatus(BookingStatus.CONFIRMED);
        payment.setStatus(PaymentStatus.COMPLETED);

        paymentRepository.save(payment);
        bookingRepository.save(bookingFromDb);

        return modelMapper.map(payment,PaymentDTO.class);
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
