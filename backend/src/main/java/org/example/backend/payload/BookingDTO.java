package org.example.backend.payload;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.models.BookingStatus;
import org.example.backend.models.RefundStatus;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {

    private Long bookingId;
    private LocalDateTime bookingDate;
    private BookingStatus status;
    private Double totalAmount;
    private String qrCode;
    private List<BookingItemDTO> bookingItems;
    private Long userId;
    private RefundStatus refundStatus; //
}
