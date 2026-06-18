package org.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketValidationResponseDTO {
    private boolean valid;
    private String message;
    private String eventTitle;
    private String participantName;
    private Long bookingId;
}