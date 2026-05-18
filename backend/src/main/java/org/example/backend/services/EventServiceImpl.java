package org.example.backend.services;

import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.Category;
import org.example.backend.models.Event;
import org.example.backend.models.User;
import org.example.backend.payload.EventDTO;
import org.example.backend.payload.EventResponse;
import org.example.backend.repositories.CategoryRepository;
import org.example.backend.repositories.EventRepository;
import org.example.backend.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private FileService fileService;

    @Value("${event.image}")
    private String path;

    @Override
    public EventResponse getAllEvents(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Event> events = eventRepository.findAll(pageDetails);

        List<EventDTO> eventDTOs = events.stream().map(event -> modelMapper.map(event, EventDTO.class)).toList();
        EventResponse eventResponse = new EventResponse();
        eventResponse.setContent(eventDTOs);
        eventResponse.setPageNumber(events.getNumber());
        eventResponse.setPageSize(events.getSize());
        eventResponse.setTotalPages(events.getTotalPages());
        eventResponse.setTotalElements(events.getTotalElements());
        eventResponse.setIsLast(events.isLast());

        return eventResponse;
    }

    @Override
    public EventDTO getEventById(Long eventId) {
        Event eventFromDb = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event","eventId",eventId));
        return modelMapper.map(eventFromDb,EventDTO.class);
    }

    @Override
    public EventResponse getEventsByCategory(Long categoryId,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Category categoryFromDb = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category","categoryId",categoryId));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Event> events = eventRepository.findEventsByCategory(categoryFromDb,pageDetails);
        List<EventDTO> eventDTOs = events.stream().map(event -> modelMapper.map(event,EventDTO.class)).toList();

        EventResponse eventResponse = new EventResponse();
        eventResponse.setContent(eventDTOs);
        eventResponse.setPageNumber(events.getNumber());
        eventResponse.setPageSize(events.getSize());
        eventResponse.setTotalPages(events.getTotalPages());
        eventResponse.setTotalElements(events.getTotalElements());
        eventResponse.setIsLast(events.isLast());

        return eventResponse;
    }

    @Override
    public EventResponse getEventsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Event> pageEvents = eventRepository.findByTitleLikeIgnoreCase('%' + keyword + '%', pageDetails);

        List<Event> events = pageEvents.getContent();
        List<EventDTO> eventDTOs = events.stream()
                .map(event -> modelMapper.map(event, EventDTO.class))
                .toList();

        if(events.isEmpty()){
            throw new APIException("Events not found with keyword: " + keyword);
        }
        EventResponse eventResponse = new EventResponse();
        eventResponse.setContent(eventDTOs);
        eventResponse.setPageNumber(pageEvents.getNumber());
        eventResponse.setPageSize(pageEvents.getSize());
        eventResponse.setTotalPages(pageEvents.getTotalPages());
        eventResponse.setTotalElements(pageEvents.getTotalElements());
        eventResponse.setIsLast(pageEvents.isLast());

        return eventResponse;
    }

    @Override
    public EventDTO createEvent(EventDTO eventDTO) {

        Event newEvent = new Event();
        newEvent.setDescription(eventDTO.getDescription());
        newEvent.setEventDate(eventDTO.getEventDate());
        newEvent.setCapacity(eventDTO.getCapacity());
        newEvent.setImage(eventDTO.getImage());
        newEvent.setEndDate(eventDTO.getEndDate());
        newEvent.setLocation(eventDTO.getLocation());
        newEvent.setTitle(eventDTO.getTitle());
        newEvent.setStatus("DRAFT");

        Category category = categoryRepository.findById(eventDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category","categoryId", eventDTO.getCategoryId()));
        newEvent.setCategory(category);

        newEvent.setOrganizer(authUtil.loggedInUser());

        Event savedEvent = eventRepository.save(newEvent);
        return modelMapper.map(savedEvent,EventDTO.class);

    }

    @Override
    public EventDTO updateEvent(Long eventId, EventDTO eventDTO) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() ->  new ResourceNotFoundException("Event","eventId",eventId));

        eventFromDB.setDescription(eventDTO.getDescription());
        eventFromDB.setEventDate(eventDTO.getEventDate());
        eventFromDB.setCapacity(eventDTO.getCapacity());
        eventFromDB.setImage(eventDTO.getImage());
        eventFromDB.setEndDate(eventDTO.getEndDate());
        eventFromDB.setLocation(eventDTO.getLocation());
        eventFromDB.setTitle(eventDTO.getTitle());

        Event savedEvent = eventRepository.save(eventFromDB);
        return modelMapper.map(savedEvent,EventDTO.class);

    }

    @Override
    public EventDTO deleteEvent(Long eventId) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() ->  new ResourceNotFoundException("Event","eventId",eventId));

        eventRepository.delete(eventFromDB);
        //de sters booking urile in care sunt events

        return modelMapper.map(eventFromDB,EventDTO.class);
    }

    @Override
    public EventResponse getMyEvents(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Long userId = authUtil.loggedInUserId();
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Event> myEvents = eventRepository.findByOrganizerUserId(userId,pageDetails);

        List<EventDTO> eventDTOs = myEvents.stream().map(event -> modelMapper.map(event, EventDTO.class)).toList();

        EventResponse eventResponse = new EventResponse();
        eventResponse.setContent(eventDTOs);
        eventResponse.setPageNumber(myEvents.getNumber());
        eventResponse.setPageSize(myEvents.getSize());
        eventResponse.setTotalPages(myEvents.getTotalPages());
        eventResponse.setTotalElements(myEvents.getTotalElements());
        eventResponse.setIsLast(myEvents.isLast());

        return eventResponse;
    }

    @Override
    public EventDTO updateEventImage(Long eventId, MultipartFile image) throws IOException {
       Event eventFromDB = eventRepository.findById(eventId)
               .orElseThrow(() ->  new ResourceNotFoundException("Event","eventId",eventId));

       String fileName = fileService.uploadImage(path, image);
       eventFromDB.setImage(fileName);

       Event savedEvent = eventRepository.save(eventFromDB);
       return modelMapper.map(savedEvent,EventDTO.class);
    }


}
