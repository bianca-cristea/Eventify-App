package org.example.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.example.backend.payload.TicketDTO;
import org.example.backend.services.BookingService;
import org.example.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Tickets", description = "Ticket types")
@RestController
@RequestMapping("/api")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private BookingService bookingService;

    @Operation(summary = "Get types of tickets per event")
    @GetMapping("/events/{eventId}/tickets")
    public ResponseEntity<List<TicketDTO>> typesOfTicketsPerEvent(@PathVariable Long eventId){
        return new ResponseEntity<>(ticketService.typesOfTicketsPerEvent(eventId), HttpStatus.OK);
    }

    @Operation(summary = "Add ticket type")
    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/events/{eventId}/tickets")
    public ResponseEntity<TicketDTO> addTicketType(@PathVariable Long eventId, @Valid @RequestBody TicketDTO ticketDTO){
        return new ResponseEntity<>(ticketService.addTicketType(eventId,ticketDTO),HttpStatus.CREATED);
    }

    @Operation(summary = "Update ticket type")
    @PreAuthorize("hasRole('ORGANIZER')")
    @PutMapping("/events/{eventId}/tickets/{ticketId}")
    public ResponseEntity<TicketDTO> updateTicketType(@PathVariable Long eventId, @PathVariable Long ticketId, @Valid @RequestBody TicketDTO ticketDTO){
        return new ResponseEntity<>(ticketService.updateTicketType(eventId,ticketId,ticketDTO),HttpStatus.OK);
    }

    @Operation(summary = "Delete ticket type")
    @PreAuthorize("hasRole('ORGANIZER')")
    @DeleteMapping("/events/{eventId}/tickets/{ticketId}")
    public ResponseEntity<TicketDTO> deleteTicketType(@PathVariable Long eventId, @PathVariable Long ticketId){
        return new ResponseEntity<>(ticketService.deleteTicketType(eventId,ticketId),HttpStatus.OK);
    }


}
