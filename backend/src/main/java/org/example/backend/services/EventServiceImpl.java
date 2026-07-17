package org.example.backend.services;

import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.*;
import org.example.backend.payload.EventDTO;
import org.example.backend.payload.EventResponse;
import org.example.backend.payload.TicketDTO;
import org.example.backend.repositories.BookingItemRepository;
import org.example.backend.repositories.CategoryRepository;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.TicketRepository;
import org.example.backend.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private BookingItemRepository bookingItemRepository;

    @Autowired
    private FileService fileService;

    @Value("${event.image}")
    private String path;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    @Override
    public EventResponse getAllEvents(Integer pageNumber,
                                      Integer pageSize,
                                      String sortBy,
                                      String sortOrder,
                                      String keyword,
                                      String category) {

        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Specification<Event> spec = (root, query, cb) ->
                cb.notEqual(root.get("status"), "CANCELLED");

        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(
                            cb.lower(root.get("title")),
                            "%" + keyword.toLowerCase() + "%"
                    ));
        }

        if (category != null && !category.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(
                            cb.lower(root.get("category").get("categoryName")),
                            category.toLowerCase()
                    ));
        }

        Page<Event> eventsPage = eventRepository.findAll(spec, pageable);

        List<EventDTO> eventDTOs = eventsPage.getContent()
                .stream()
                .map(event -> {
                    EventDTO dto = modelMapper.map(event, EventDTO.class);
                    dto.setImage(constructImageUrl(event.getImage()));
                    return dto;
                })
                .toList();

        EventResponse response = new EventResponse();
        response.setContent(eventDTOs);
        response.setPageNumber(eventsPage.getNumber());
        response.setPageSize(eventsPage.getSize());
        response.setTotalPages(eventsPage.getTotalPages());
        response.setTotalElements(eventsPage.getTotalElements());
        response.setIsLast(eventsPage.isLast());

        return response;
    }

    @Override
    public EventResponse getAllEventsForAdmin( Integer pageNumber,
                                               Integer pageSize,
                                               String sortBy,
                                               String sortOrder
                                               ) {
        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);



        Page<Event> eventsPage = eventRepository.findAll(pageable);

        List<EventDTO> eventDTOs = eventsPage.getContent()
                .stream()
                .map(event -> {
                    EventDTO dto = modelMapper.map(event, EventDTO.class);
                    dto.setImage(constructImageUrl(event.getImage()));
                    return dto;
                })
                .toList();

        EventResponse response = new EventResponse();
        response.setContent(eventDTOs);
        response.setPageNumber(eventsPage.getNumber());
        response.setPageSize(eventsPage.getSize());
        response.setTotalPages(eventsPage.getTotalPages());
        response.setTotalElements(eventsPage.getTotalElements());
        response.setIsLast(eventsPage.isLast());

        return response;
    }


    private String constructImageUrl(String imageName){
        return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageName : imageBaseUrl + "/" + imageName;
    }

    @Override
    public EventDTO getEventById(Long eventId) {
        Event eventFromDb = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));
        return modelMapper.map(eventFromDb, EventDTO.class);
    }

    @Override
    public EventResponse getEventsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Category categoryFromDb = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Event> events = eventRepository.findEventsByCategory(categoryFromDb, pageDetails);
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

        if (events.isEmpty()) {
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

        newEvent.setImage(eventDTO.getImage());

        newEvent.setEndDate(eventDTO.getEndDate());
        newEvent.setLocation(eventDTO.getLocation());
        newEvent.setTitle(eventDTO.getTitle());
        newEvent.setStatus("DRAFT");

        Category category = categoryRepository.findById(eventDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", eventDTO.getCategoryId()));
        newEvent.setCategory(category);

        newEvent.setOrganizer(authUtil.loggedInUser());

        Event savedEvent = eventRepository.save(newEvent);
        return modelMapper.map(savedEvent, EventDTO.class);

    }
    @Override
    public EventDTO publishEvent(Long eventId) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        eventFromDB.setStatus("PUBLISHED");

        Event savedEvent = eventRepository.save(eventFromDB);
        return modelMapper.map(savedEvent, EventDTO.class);
    }

    @Override
    public EventDTO updateEvent(Long eventId, EventDTO eventDTO) {

        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        if (eventDTO.getTitle() != null) {
            eventFromDB.setTitle(eventDTO.getTitle());
        }

        if (eventDTO.getDescription() != null) {
            eventFromDB.setDescription(eventDTO.getDescription());
        }

        if (eventDTO.getEventDate() != null) {
            eventFromDB.setEventDate(eventDTO.getEventDate());
        }

        if (eventDTO.getEndDate() != null) {
            eventFromDB.setEndDate(eventDTO.getEndDate());
        }

        if (eventDTO.getLocation() != null) {
            eventFromDB.setLocation(eventDTO.getLocation());
        }

        if (eventDTO.getImage() != null && !eventDTO.getImage().isBlank()) {

            String image = eventDTO.getImage();

            if (image.startsWith("http")) {
                image = image.substring(image.lastIndexOf("/") + 1);
            }

            eventFromDB.setImage(image);
        }

        if (eventDTO.getStatus() != null && !eventDTO.getStatus().isBlank()) {
            eventFromDB.setStatus(eventDTO.getStatus());
        }


        if (eventDTO.getTickets() != null) {

            for (TicketDTO ticketDTO : eventDTO.getTickets()) {

                TicketType ticketType = TicketType.valueOf(ticketDTO.getTicketType());

                Ticket ticket = ticketRepository
                        .findByEventAndTicketType(eventFromDB, ticketType)
                        .orElse(null);

                if (ticket == null) {
                    ticket = new Ticket();
                    ticket.setEvent(eventFromDB);
                    ticket.setTicketType(ticketType);
                }

                ticket.setPrice(ticketDTO.getPrice());
                ticket.setCapacity(ticketDTO.getCapacity());

                ticketRepository.save(ticket);
            }
        }

        Event savedEvent = eventRepository.save(eventFromDB);

        return modelMapper.map(savedEvent, EventDTO.class);
    }
    @Override
    public List<EventDTO> getStaffEvents() {

        User staff = authUtil.loggedInUser();

        return eventRepository.findByStaff(staff)
                .stream()
                .map(event -> modelMapper.map(event, EventDTO.class))
                .toList();
    }
    @Override
    public EventDTO cancelEvent(Long eventId) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        eventFromDB.setStatus("CANCELLED");
        eventFromDB.getTickets().forEach(ticket ->
                ticket.getBookingItems().forEach(item -> {
                    item.setStatus(BookingStatus.CANCELLED);
                    bookingItemRepository.save(item);
                })
        );
        Event cancelledEvent = eventRepository.save(eventFromDB);

        return modelMapper.map(cancelledEvent, EventDTO.class);
    }

    @Override
    public EventResponse getMyEvents(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Long userId = authUtil.loggedInUserId();
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Event> myEvents = eventRepository.findByOrganizerUserId(userId, pageDetails);

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
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        String fileName = fileService.uploadImage(path, image);
        eventFromDB.setImage(fileName);

        Event savedEvent = eventRepository.save(eventFromDB);
        return modelMapper.map(savedEvent, EventDTO.class);
    }


}
