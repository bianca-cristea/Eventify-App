package org.example.backend.controllers;

import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.models.Category;
import org.example.backend.models.Event;
import org.example.backend.models.User;
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

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AuthUtil authUtils;

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


    @GetMapping("/events/{eventId}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long eventId) {
        return new ResponseEntity<>(eventService.getEventById(eventId),HttpStatus.OK);
    }

    @GetMapping("/categories/{categoryId}/events")
    public ResponseEntity<EventResponse> getEventsByCategory(@PathVariable Long categoryId,@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                             @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                             @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                             @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        return new ResponseEntity<>(eventService.getEventsByCategory(categoryId,pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @GetMapping("/events/keyword/{keyword}")
    public ResponseEntity<EventResponse> getEventsByKeyword(@PathVariable String keyword,@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                             @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                             @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                             @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        return new ResponseEntity<>(eventService.getEventsByKeyword(keyword,pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    @PutMapping("/events/{eventId}/image")
    public ResponseEntity<EventDTO> updateImage(@PathVariable Long eventId, @RequestParam(name = "image")MultipartFile image) throws IOException {
        EventDTO updatedEvent = eventService.updateEventImage(eventId,image);
        return new ResponseEntity<>(updatedEvent,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/events")
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.createEvent(eventDTO),HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping("/events/{eventId}/publish")
    public ResponseEntity<EventDTO> publishEvent(@PathVariable Long eventId){
        return new ResponseEntity<>(eventService.publishEvent(eventId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @PutMapping("/events/{eventId}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long eventId, @Valid @RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.updateEvent(eventId,eventDTO), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    @DeleteMapping("/events/{eventId}")
    public ResponseEntity<EventDTO> deleteEvent(@PathVariable Long eventId) {
        return new ResponseEntity<>(eventService.cancelEvent(eventId),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ORGANIZER')")
    @GetMapping("/events/me/events")
    public ResponseEntity<EventResponse> getMyEvents(@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                     @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                     @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_EVENTS_BY, required = false) String sortBy,
                                                     @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        return new ResponseEntity<>(eventService.getMyEvents(pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }


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
