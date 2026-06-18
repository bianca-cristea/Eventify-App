package org.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingItemDTO {
    private Long ticketId;
    private Integer quantity;
    private Double priceAtBooking;
    private String ticketType;
    private String eventTitle;
    private LocalDateTime eventDate;
    private String eventLocation;
    private String eventImage;
}
