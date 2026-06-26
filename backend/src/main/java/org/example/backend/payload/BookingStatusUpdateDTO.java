package org.example.backend.payload;

import lombok.Data;
import org.example.backend.models.BookingStatus;

@Data
public class BookingStatusUpdateDTO {
    private BookingStatus status;
}
