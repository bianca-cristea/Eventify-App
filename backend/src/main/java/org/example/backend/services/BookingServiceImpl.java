package org.example.backend.services;

import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.BookingResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService{
    @Override
    public BookingDTO bookTicket(BookingDTO bookingDTO) {
        return null;
    }

    @Override
    public List<BookingDTO> showBookings() {
        return List.of();
    }

    @Override
    public BookingDTO showBookingDetails(Long bookingId) {
        return null;
    }

    @Override
    public BookingDTO cancelBooking(Long bookingId) {
        return null;
    }

    @Override
    public BookingResponse allBookingsFromEvent(Long eventId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        return null;
    }

    @Override
    public BookingResponse allBookings(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        return null;
    }
}
