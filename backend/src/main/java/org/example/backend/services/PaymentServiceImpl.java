package org.example.backend.services;

import org.example.backend.payload.PaymentDTO;
import org.example.backend.payload.PaymentResponse;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Override
    public PaymentDTO createPaymentForBooking(Long bookingId) {
        return null;
    }

    @Override
    public PaymentResponse getMyPayments(Integer pageNumber, Integer pageSize) {
        return null;
    }

    @Override
    public PaymentResponse getAllPayments(Integer pageNumber, Integer pageSize) {
        return null;
    }


}
