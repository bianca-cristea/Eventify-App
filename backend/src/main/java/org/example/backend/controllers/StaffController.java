package org.example.backend.controllers;



import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.UserDTO;
import org.example.backend.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(name = "Staff", description = "Staff management")
@RestController
@RequestMapping("/api")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @Operation(summary = "Assign staff to event")
    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/events/{eventId}/staff")
    public ResponseEntity<UserDTO> assignStaffToEvent(@PathVariable Long eventId, @RequestBody UserDTO userDTO){
        return new ResponseEntity<>(staffService.assignStaffToEvent(eventId,userDTO), HttpStatus.CREATED);
    }


    @Operation(summary = "Eliminate staff from event")
    @PreAuthorize("hasRole('ORGANIZER')")
    @DeleteMapping("/events/{eventId}/staff/{userId}")
    public ResponseEntity<UserDTO> eliminateStaffFromEvent(@PathVariable Long eventId, @PathVariable Long userId){
        return new ResponseEntity<>(staffService.eliminateStaffFromEvent(eventId,userId), HttpStatus.OK);
    }

    @Operation(summary = "Get staff from event")
    @PreAuthorize("hasRole('ORGANIZER')")
    @GetMapping("/events/{eventId}/staff")
    public ResponseEntity<UserDTO> getStaffFromEvent(@PathVariable Long eventId){
        return new ResponseEntity<>(staffService.getStaffFromEvent(eventId), HttpStatus.OK);
    }

    @Operation(summary = "Check ticket")
    @PreAuthorize("hasRole('STAFF') or hasRole('ORGANIZER')")
    @PostMapping("/bookings/{bookingId}/checkin")
    public ResponseEntity<BookingDTO> checkTicket(@RequestParam String qrCode){
        return new ResponseEntity<>(staffService.checkTicket(qrCode), HttpStatus.OK);
    }

}
