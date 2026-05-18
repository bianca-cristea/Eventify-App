package org.example.backend.payload;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.example.backend.models.TicketType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {


    private Long ticketId;
    private TicketType ticketType;
    private Long eventId;
    private Double price;
    private Integer capacity;
}
