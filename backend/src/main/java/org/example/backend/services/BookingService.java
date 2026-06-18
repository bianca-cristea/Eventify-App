package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.BookingItemDTO;
import org.example.backend.payload.BookingResponse;
import org.example.backend.payload.TicketValidationResponseDTO;

import java.util.List;

public interface BookingService {
    BookingDTO bookTicket(@Valid BookingDTO bookingDTO);

    List<BookingDTO> showMyBooking();

    // interfață
    TicketValidationResponseDTO validateTicket(String qrCode);
    BookingDTO showBookingDetails(Long bookingId);

    BookingDTO cancelBooking(Long bookingId);

    BookingResponse allBookingsFromEvent(Long eventId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    BookingResponse allBookings(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    }
