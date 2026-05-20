package org.example.backend.controllers;


import org.example.backend.models.User;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.TicketDTO;
import org.example.backend.payload.UserDTO;
import org.example.backend.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/events/{eventId}/staff")
    public ResponseEntity<UserDTO> assignStaffToEvent(@PathVariable Long eventId, @RequestBody UserDTO userDTO){
        return new ResponseEntity<>(staffService.assignStaffToEvent(eventId,userDTO), HttpStatus.CREATED);
    }



    @PreAuthorize("hasRole('ORGANIZER')")
    @DeleteMapping("/events/{eventId}/staff/{userId}")
    public ResponseEntity<UserDTO> eliminateStaffFromEvent(@PathVariable Long eventId, @PathVariable Long userId){
        return new ResponseEntity<>(staffService.eliminateStaffFromEvent(eventId,userId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @GetMapping("/events/{eventId}/staff")
    public ResponseEntity<List<UserDTO>> getStaffFromEvent(@PathVariable Long eventId){
        return new ResponseEntity<>(staffService.getStaffFromEvent(eventId), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('STAFF') or hasRole('ORGANIZER')")
    @PostMapping("/bookings/{bookingId}/checkin")
    public ResponseEntity<BookingDTO> checkTicket(@PathVariable Long bookingId){
        return new ResponseEntity<>(staffService.checkTicket(bookingId), HttpStatus.OK);
    }

}
