package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.models.Booking;
import org.example.backend.models.BookingStatus;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.BookingItemDTO;
import org.example.backend.payload.BookingResponse;
import org.example.backend.payload.TicketValidationResponseDTO;
import org.example.backend.repositories.BookingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface BookingService {


    BookingDTO bookTicket(@Valid BookingDTO bookingDTO);


    TicketValidationResponseDTO validateTicket(String qrCode);
    BookingDTO showBookingDetails(Long bookingId);

    BookingDTO cancelBooking(Long bookingId);

    BookingResponse allBookingsFromEvent(Long eventId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    BookingResponse allBookings(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    BookingResponse getAllBookings(Integer pageNumber, Integer pageSize, String sortBy,String sortOrder);

    BookingDTO updateBooking( Long bookingId, BookingStatus status);

    BookingResponse getAllOrganizerBookings(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    List<BookingDTO> getMyTickets(String email);
}
