package org.example.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.payload.EventDTO;
import org.example.backend.payload.EventResponse;
import org.example.backend.services.EventService;
import org.example.backend.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Tag(name = "Events", description = "Event management")
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AuthUtil authUtils;

    @Operation(summary = "Get all events")
    @GetMapping("/events")
    public ResponseEntity<EventResponse> getAllEvents(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        return new ResponseEntity<>(eventService.getAllEvents(pageNumber,pageSize,sortBy,sortOrder, keyword, category), HttpStatus.OK);
    }

    @Operation(summary = "Get event by id")
    @GetMapping("/events/{eventId}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long eventId) {
        return new ResponseEntity<>(eventService.getEventById(eventId),HttpStatus.OK);
    }

    @Operation(summary = "Get events by category")
    @GetMapping("/categories/{categoryId}/events")
    public ResponseEntity<EventResponse> getEventsByCategory(@PathVariable Long categoryId,@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                             @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                             @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                             @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        return new ResponseEntity<>(eventService.getEventsByCategory(categoryId,pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @Operation(summary = "Get events by keyword")
    @GetMapping("/events/keyword/{keyword}")
    public ResponseEntity<EventResponse> getEventsByKeyword(@PathVariable String keyword,@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                             @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                             @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                             @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        return new ResponseEntity<>(eventService.getEventsByKeyword(keyword,pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @Operation(summary = "Update image")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    @PutMapping({
            "/admin/events/{eventId}/image",
            "/organizer/events/{eventId}/image"
    })
    public ResponseEntity<EventDTO> updateImage(@PathVariable Long eventId, @RequestParam(name = "image")MultipartFile image) throws IOException {
        EventDTO updatedEvent = eventService.updateEventImage(eventId,image);
        return new ResponseEntity<>(updatedEvent,HttpStatus.OK);
    }

    @Operation(summary = "Create event")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    @PostMapping({"/admin/events", "/organizer/events"})
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.createEvent(eventDTO),HttpStatus.CREATED);
    }


    @Operation(summary = "Publish event")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    @PostMapping({
            "/admin/events/{eventId}/publish",
            "/organizer/events/{eventId}/publish"
    })
    public ResponseEntity<EventDTO> publishEvent(@PathVariable Long eventId){
        return new ResponseEntity<>(eventService.publishEvent(eventId), HttpStatus.OK);
    }

    @Operation(summary = "Update event")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZER')")
    @PutMapping({
            "/admin/events/{eventId}",
            "/organizer/events/{eventId}"
    })
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long eventId, @Valid @RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.updateEvent(eventId,eventDTO), HttpStatus.OK);
    }

    @Operation(summary = "Delete event")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    @DeleteMapping({
            "/admin/events/{eventId}",
            "/organizer/events/{eventId}"
    })
    public ResponseEntity<EventDTO> deleteEvent(@PathVariable Long eventId) {
        return new ResponseEntity<>(eventService.cancelEvent(eventId),HttpStatus.OK);
    }
    @Operation(summary = "Get staff events")
    @GetMapping("/staff/events")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<List<EventDTO>> getStaffEvents() {
        return ResponseEntity.ok(eventService.getStaffEvents());
    }

    @Operation(summary = "Get my events")
    @PreAuthorize("hasRole('ORGANIZER')")
    @GetMapping("/events/me/events")
    public ResponseEntity<EventResponse> getMyEvents(@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                     @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                     @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                     @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        return new ResponseEntity<>(eventService.getMyEvents(pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @Operation(summary = "Get all events for Admin")
    @GetMapping("/admin/events")
    public ResponseEntity<EventResponse> getAllEventsForAdmin(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        return new ResponseEntity<>(eventService.getAllEventsForAdmin(pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }
}
