package org.example.backend.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.models.PaymentMethod;
import org.example.backend.payload.*;
import org.example.backend.security.services.UserDetailsImpl;
import org.example.backend.services.BookingService;
import org.example.backend.services.PaymentService;
import org.example.backend.services.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private StripeService stripeService;


    @PostMapping("/bookings/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
        System.out.println("StripePaymentDTO received "+stripePaymentDTO);
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDTO);
        return new ResponseEntity<>(paymentIntent.getClientSecret(),HttpStatus.CREATED);
    }
    @PostMapping("/booking/users/payments/online")
    public ResponseEntity<PaymentDTO> confirmOnlinePayment(@RequestBody StripeConfirmationDTO confirmationDTO) throws StripeException {
        PaymentDTO paymentDTO = paymentService.createPaymentForBooking(
                confirmationDTO.getBookingId(),
                PaymentMethod.STRIPE
        );
        return new ResponseEntity<>(paymentDTO, HttpStatus.OK);
    }
        @PreAuthorize("hasRole('PARTICIPANT') or hasRole('ADMIN')")
    @PostMapping("/bookings")
    public ResponseEntity<BookingDTO> bookTicket(@Valid @RequestBody BookingDTO bookingDTO){
        return new ResponseEntity<>(bookingService.bookTicket(bookingDTO), HttpStatus.CREATED);
    }



    @PreAuthorize("hasRole('PARTICIPANT') or hasRole('ADMIN')")
    @GetMapping("/bookings/my")
    public ResponseEntity<List<BookingDTO>> showMyBookings(){
        return new ResponseEntity<>(bookingService.showMyBooking(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER') or hasRole('PARTICIPANT')")
    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> showBookingDetails(@PathVariable Long bookingId){
        return new ResponseEntity<>(bookingService.showBookingDetails(bookingId), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    @PostMapping("/staff/validate-ticket")
    public ResponseEntity<TicketValidationResponseDTO> validateTicket(@RequestBody TicketValidationDTO validationDTO) {
        return new ResponseEntity<>(bookingService.validateTicket(validationDTO.getQrCode()), HttpStatus.OK);
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/bookings")
    public ResponseEntity<BookingResponse> getAllBookings(
                                                          @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                          @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                          @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_BOOKINGS_BY, required = false) String sortBy,
                                                          @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder){
        BookingResponse bookingResponse = bookingService.getAllBookings(pageNumber, pageSize, sortBy,sortOrder);
        return new ResponseEntity<>(bookingResponse,HttpStatus.OK);
    }

    @PutMapping("/admin/bookings/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(@PathVariable Long bookingId, @RequestBody BookingStatusUpdateDTO bookingStatusUpdateDTO){

                BookingDTO bookingDTO = bookingService.updateBooking(bookingId, bookingStatusUpdateDTO.getStatus());
                return  new ResponseEntity<BookingDTO>(bookingDTO, HttpStatus.OK);
    }

}
