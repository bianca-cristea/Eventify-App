package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.payload.EventDTO;
import org.example.backend.payload.EventResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EventService {
    EventResponse getAllEvents(Integer pageNumber, Integer pageSize, String by, String order, String sortBy, String sortOrder);

    EventDTO getEventById(Long eventId);

    EventResponse getEventsByCategory(Long categoryId,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    EventDTO createEvent(@Valid EventDTO eventDTO);
    EventDTO publishEvent(Long eventId);

    EventDTO updateEvent(Long eventId, @Valid EventDTO eventDTO);

    EventDTO cancelEvent(Long eventId);

    EventResponse getMyEvents(Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);

    EventDTO updateEventImage(Long eventId, MultipartFile image) throws IOException;

    EventResponse getEventsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);


}
