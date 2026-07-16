package org.example.backend.repositories;

import org.example.backend.models.Event;
import org.example.backend.models.Ticket;
import org.example.backend.models.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
    Optional<Ticket> findByEventAndTicketType(Event event, TicketType ticketType);
}
