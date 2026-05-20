package org.example.backend.services;

import org.example.backend.models.PaymentMethod;
import org.example.backend.payload.PaymentDTO;
import org.example.backend.payload.PaymentResponse;
import org.springframework.data.domain.Page;

public interface PaymentService {
    PaymentDTO createPaymentForBooking(Long bookingId, PaymentMethod paymentMethod);

    PaymentResponse getMyPayments(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder);

    PaymentResponse getAllPayments(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder);


}
