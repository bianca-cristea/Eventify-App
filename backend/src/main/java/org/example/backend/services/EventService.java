package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.payload.EventDTO;
import org.example.backend.payload.EventResponse;
import org.springframework.web.multipart.MultipartFile;

public interface EventService {
    EventResponse getAllEvents(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    EventDTO getEventById(Long eventId);

    EventResponse getEventsByCategory(Long categoryId);

    EventDTO createEvent(@Valid EventDTO eventDTO);

    EventDTO updateEvent(Long eventId, @Valid EventDTO eventDTO);

    EventDTO deleteEvent(Long eventId);

    EventResponse getMyEvents(Long userId);

    EventDTO updateEventImage(Long eventId, MultipartFile image);
}
