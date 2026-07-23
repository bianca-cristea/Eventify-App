package org.example.backend.controllers;

import com.stripe.exception.StripeException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.backend.config.AppConstants;
import org.example.backend.models.PaymentMethod;
import org.example.backend.payload.PaymentDTO;
import org.example.backend.payload.PaymentResponse;
import org.example.backend.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Payments", description = "Payment")
@RestController
@RequestMapping("/api")
public class PaymentController {

        @Autowired
        private PaymentService paymentService;

    @Operation(summary = "Create payment")
        @PreAuthorize("hasRole('PARTICIPANT')")
        @PostMapping("/payments/bookings/{bookingId}")
        public ResponseEntity<PaymentDTO> createPayment(@PathVariable Long bookingId, @RequestParam PaymentMethod paymentMethod) throws StripeException {

            PaymentDTO response = paymentService.createPaymentForBooking(bookingId,paymentMethod);

            return ResponseEntity.ok(response);
        }

         @Operation(summary = "Get my payments")
        @PreAuthorize("hasRole('PARTICIPANT')")
        @GetMapping("/payments/my")
        public ResponseEntity<PaymentResponse> getMyPayments(
                @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PAYMENTS_BY, required = false) String sortBy,
                @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
            return ResponseEntity.ok(
                    paymentService.getMyPayments(pageNumber,pageSize,sortBy,sortOrder)
            );
        }

        @Operation(summary = "Get all payments")
        @PreAuthorize("hasRole('ADMIN')")
        @GetMapping("/payments")
        public ResponseEntity<PaymentResponse> getAllPayments(
                @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PAYMENTS_BY, required = false) String sortBy,
                @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder)
         {

            return ResponseEntity.ok(
                    paymentService.getAllPayments(pageNumber,pageSize,sortBy,sortOrder)
            );
        }



    }


