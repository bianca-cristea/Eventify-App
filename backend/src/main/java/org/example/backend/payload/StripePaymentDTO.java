package org.example.backend.payload;

import lombok.Data;

@Data
public class StripePaymentDTO {
    private Long amount;
    private String currency;
    private Long bookingId;
}
