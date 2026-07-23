package org.example.backend.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.models.PaymentMethod;
import org.example.backend.payload.*;
import org.example.backend.services.BookingService;
import org.example.backend.services.PaymentService;
import org.example.backend.services.StripeService;
import org.example.backend.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Bookings", description = "Booking and ticket management")

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private StripeService stripeService;

    @Autowired
    private AuthUtil authUtil;


    @Operation(summary = "Create Stripe Client secret")
    @PostMapping("/bookings/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
        System.out.println("StripePaymentDTO received "+stripePaymentDTO);
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDTO);
        return new ResponseEntity<>(paymentIntent.getClientSecret(),HttpStatus.CREATED);
    }
    @Operation(summary = "Confirm online payment")
    @PostMapping("/booking/users/payments/online")
    public ResponseEntity<PaymentDTO> confirmOnlinePayment(@RequestBody StripeConfirmationDTO confirmationDTO) throws StripeException {
        PaymentDTO paymentDTO = paymentService.createPaymentForBooking(
                confirmationDTO.getBookingId(),
                PaymentMethod.STRIPE
        );
        return new ResponseEntity<>(paymentDTO, HttpStatus.OK);
    }
    @Operation(summary = "Book ticket")
        @PreAuthorize("hasRole('PARTICIPANT') or hasRole('ADMIN')")
    @PostMapping("/bookings")
    public ResponseEntity<BookingDTO> bookTicket(@Valid @RequestBody BookingDTO bookingDTO){
        return new ResponseEntity<>(bookingService.bookTicket(bookingDTO), HttpStatus.CREATED);
    }

    @Operation(summary = "Show my bookings")
    @GetMapping("/bookings/my-tickets")
    public ResponseEntity<List<BookingDTO>> showMyBookings(){
        String username = authUtil.loggedInUser().getUsername();
        return new ResponseEntity<>(bookingService.getMyTickets(username), HttpStatus.OK);
    }

    @Operation(summary = "Show bookings details")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('PARTICIPANT')")
    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> showBookingDetails(@PathVariable Long bookingId){
        return new ResponseEntity<>(bookingService.showBookingDetails(bookingId), HttpStatus.OK);
    }

    @Operation(summary = "Validate ticket")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    @PostMapping("/staff/validate-ticket")
    public ResponseEntity<TicketValidationResponseDTO> validateTicket(@RequestBody TicketValidationDTO validationDTO) {
        return new ResponseEntity<>(bookingService.validateTicket(validationDTO.getQrCode()), HttpStatus.OK);
    }

    @Operation(summary = "Get my tickets")
    @GetMapping("/my-tickets")
    public ResponseEntity<List<BookingDTO>> getMyTickets(Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.getMyTickets(authentication.getName())
        );
    }
    @Operation(summary = "Cancel booking")
    @PreAuthorize("hasRole('PARTICIPANT')")
    @PutMapping("/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> cancelBooking(@PathVariable Long bookingId){
        return new ResponseEntity<>(bookingService.cancelBooking(bookingId), HttpStatus.OK);
    }
    @Operation(summary = "Get all booking from event")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('STAFF')")
    @GetMapping("/events/{eventId}/bookings")
    public ResponseEntity<BookingResponse> allBookingsFromEvent(@PathVariable Long eventId,
                                                                @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                                @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                                @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                                @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {

        return new ResponseEntity<>(bookingService.allBookingsFromEvent(eventId,pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }

//    @Operation(summary = "Get all bookings for admin")
//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/bookings")
//    public ResponseEntity<BookingResponse> allBookings(@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
//                                                  @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
//                                                  @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
//                                                  @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
//
//        return new ResponseEntity<>(bookingService.allBookings(pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
//    }
    @Operation(summary = "Get all bookings for admin")
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

    @Operation(summary = "Get all bookings for the organizer")
    @PreAuthorize("hasRole('ORGANIZER')")
    @GetMapping("/organizer/bookings")
    public ResponseEntity<BookingResponse> getAllOrganizerBookings(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_BOOKINGS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder){
        BookingResponse bookingResponse = bookingService.getAllOrganizerBookings(pageNumber, pageSize, sortBy,sortOrder);
        return new ResponseEntity<>(bookingResponse,HttpStatus.OK);
    }

    @Operation(summary = "Update booking status")
    @PutMapping({
            "/admin/bookings/{bookingId}/status",
            "/organizer/bookings/{bookingId}/status"
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZER')")
    public ResponseEntity<BookingDTO> updateBookingStatus(@PathVariable Long bookingId, @RequestBody BookingStatusUpdateDTO bookingStatusUpdateDTO){

                BookingDTO bookingDTO = bookingService.updateBooking(bookingId, bookingStatusUpdateDTO.getStatus());
                return  new ResponseEntity<BookingDTO>(bookingDTO, HttpStatus.OK);
    }

}
