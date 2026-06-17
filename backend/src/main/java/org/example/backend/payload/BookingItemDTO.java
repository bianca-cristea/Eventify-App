package org.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingItemDTO {
    private Long ticketId;
    private Integer quantity;
    private Double priceAtBooking;
}
