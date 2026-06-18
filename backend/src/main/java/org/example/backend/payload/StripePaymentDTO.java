package org.example.backend.payload;

import lombok.Data;

import java.util.Map;


@Data
public class StripePaymentDTO {
    private Long amount;
    private String currency;
    private Long bookingId;
    private String email;
    private String name;
    private String description;
    private Map<String,String> metadata;
}
