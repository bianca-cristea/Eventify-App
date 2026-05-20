package org.example.backend.controllers;

import org.example.backend.payload.PaymentDTO;
import org.example.backend.payload.PaymentResponse;
import org.example.backend.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

        @Autowired
        private PaymentService paymentService;

        @PreAuthorize("hasRole('PARTICIPANT')")
        @PostMapping("/payments/bookings/{bookingId}")
        public ResponseEntity<PaymentDTO> createPayment(@PathVariable Long bookingId) {

            PaymentDTO response = paymentService.createPaymentForBooking(bookingId);

            return ResponseEntity.ok(response);
        }


        @PreAuthorize("hasRole('PARTICIPANT')")
        @GetMapping("/payments/my")
        public ResponseEntity<PaymentResponse> getMyPayments(
                @RequestParam(defaultValue = "0") Integer pageNumber,
                @RequestParam(defaultValue = "10") Integer pageSize
        ) {

            return ResponseEntity.ok(
                    paymentService.getMyPayments(pageNumber, pageSize)
            );
        }


        @PreAuthorize("hasRole('ADMIN')")
        @GetMapping("/payments")
        public ResponseEntity<PaymentResponse> getAllPayments(
                @RequestParam(defaultValue = "0") Integer pageNumber,
                @RequestParam(defaultValue = "10") Integer pageSize
        ) {

            return ResponseEntity.ok(
                    paymentService.getAllPayments(pageNumber, pageSize)
            );
        }



    }


