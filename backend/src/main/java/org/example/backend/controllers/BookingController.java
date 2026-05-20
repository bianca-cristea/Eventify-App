package org.example.backend.controllers;

import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.BookingResponse;
import org.example.backend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PreAuthorize("hasRole('PARTICIPANT')")
    @PostMapping("/bookings")
    public ResponseEntity<BookingDTO> bookTicket(@Valid @RequestBody BookingDTO bookingDTO){
        return new ResponseEntity<>(bookingService.bookTicket(bookingDTO), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('PARTICIPANT')")
    @GetMapping("/bookings/my")
    public ResponseEntity<BookingDTO> showMyBookings(){
        return new ResponseEntity<>(bookingService.showMyBooking(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER') or hasRole('PARTICIPANT')")
    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> showBookingDetails(@PathVariable Long bookingId){
        return new ResponseEntity<>(bookingService.showBookingDetails(bookingId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('PARTICIPANT')")
    @PutMapping("/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> cancelBooking(@PathVariable Long bookingId){
        return new ResponseEntity<>(bookingService.cancelBooking(bookingId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER') or hasRole('STAFF')")
    @GetMapping("/events/{eventId}/bookings")
    public ResponseEntity<BookingResponse> allBookingsFromEvent(@PathVariable Long eventId,
                                                                @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                                @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                                @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                                @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {

        return new ResponseEntity<>(bookingService.allBookingsFromEvent(eventId,pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/bookings")
    public ResponseEntity<BookingResponse> allBookings(@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                  @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                  @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                  @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {

        return new ResponseEntity<>(bookingService.allBookings(pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }

}
