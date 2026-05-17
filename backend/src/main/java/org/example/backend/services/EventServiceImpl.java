package org.example.backend.services;

import org.example.backend.payload.EventDTO;
import org.example.backend.payload.EventResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class EventServiceImpl implements EventService{
    @Override
    public EventResponse getAllEvents(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        return null;
    }

    @Override
    public EventDTO getEventById(Long eventId) {
        return null;
    }

    @Override
    public EventResponse getEventsByCategory(Long categoryId) {
        return null;
    }

    @Override
    public EventDTO createEvent(EventDTO eventDTO) {
        return null;
    }

    @Override
    public EventDTO updateEvent(Long eventId, EventDTO eventDTO) {
        return null;
    }

    @Override
    public EventDTO deleteEvent(Long eventId) {
        return null;
    }

    @Override
    public EventResponse getMyEvents(Long userId) {
        return null;
    }

    @Override
    public EventDTO updateEventImage(Long eventId, MultipartFile image) {
        return null;
    }
}
