package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.payload.TicketDTO;

import java.util.List;

public interface TicketService {
    List<TicketDTO> typesOfTicketsPerEvent(Long eventId);


    TicketDTO addTicketType(Long eventId, @Valid TicketDTO ticketDTO);

    TicketDTO updateTicketType(Long eventId, Long ticketId, @Valid TicketDTO ticketDTO);

    TicketDTO deleteTicketType(Long eventId, Long ticketId);
}
