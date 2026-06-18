package org.example.backend.services;

import jakarta.transaction.Transactional;
import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.*;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.BookingItemDTO;
import org.example.backend.payload.BookingResponse;
import org.example.backend.payload.TicketValidationResponseDTO;
import org.example.backend.repositories.BookingItemRepository;
import org.example.backend.repositories.BookingRepository;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.TicketRepository;
import org.example.backend.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EventRepository eventRepository;




    @Override
    public BookingDTO bookTicket(BookingDTO bookingDTO) {

        Booking booking = new Booking();
        booking.setUser(authUtil.loggedInUser());
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus(BookingStatus.PENDING);
        booking.setQrCode(UUID.randomUUID().toString());

        List<BookingItem> items = new ArrayList<>();

        if (bookingDTO.getBookingItems() == null || bookingDTO.getBookingItems().isEmpty()) {
            throw new APIException("No items in booking.");
        }

        bookingDTO.getBookingItems().forEach(item -> {
            Ticket ticket = ticketRepository.findById(item.getTicketId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ticket", "ticketId", item.getTicketId()));

            if (ticket.getCapacity() < item.getQuantity()) {
                throw new APIException("Only " + ticket.getCapacity() + " tickets left.");
            }

            BookingItem bookingItem = new BookingItem();
            bookingItem.setBooking(booking);
            bookingItem.setTicket(ticket);
            bookingItem.setPriceAtBooking(ticket.getPrice());
            bookingItem.setQuantity(item.getQuantity());
            bookingItem.setStatus(BookingStatus.CONFIRMED);

            ticket.setCapacity(ticket.getCapacity() - item.getQuantity());
            ticketRepository.save(ticket);

            items.add(bookingItem);
        });

        booking.setBookingItemList(items);

        double totalAmount = items.stream()
                .mapToDouble(i -> i.getPriceAtBooking() * i.getQuantity())
                .sum();

        booking.setTotalAmount(totalAmount);

        Booking savedBooking = bookingRepository.save(booking);
        return modelMapper.map(savedBooking, BookingDTO.class);
    }


    @Override
    public List<BookingDTO> showMyBooking() {
        User loggedInUser = authUtil.loggedInUser();

        List<Booking> bookings = bookingRepository.findByUserUserId(loggedInUser.getUserId());

        if (bookings.isEmpty()) throw new APIException("You have no bookings yet.");

        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public BookingDTO showBookingDetails(Long bookingId) {

        Booking bookingFromDB = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "bookingId", bookingId));

        return modelMapper.map(bookingFromDB, BookingDTO.class);
    }
    @Override
    public TicketValidationResponseDTO validateTicket(String qrCode) {
        Booking booking = bookingRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "qrCode", qrCode));

        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            return new TicketValidationResponseDTO(
                    false,
                    "Booking is not confirmed (payment not completed).",
                    null, null, booking.getBookingId()
            );
        }

        if (Boolean.TRUE.equals(booking.getCheckedIn())) {
            return new TicketValidationResponseDTO(
                    false,
                    "Ticket already used at " + booking.getCheckInTime(),
                    null, null, booking.getBookingId()
            );
        }

        booking.setCheckedIn(true);
        booking.setCheckInTime(LocalDateTime.now());
        bookingRepository.save(booking);

        String eventTitle = booking.getBookingItemList().isEmpty() ? "Unknown" :
                booking.getBookingItemList().get(0).getTicket().getEvent().getTitle();

        return new TicketValidationResponseDTO(
                true,
                "Ticket validated successfully.",
                eventTitle,
                booking.getUser().getUsername(),
                booking.getBookingId()
        );
    }

    @Override
    public BookingDTO cancelBooking(Long bookingId) {

        Booking bookingFromDB = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "bookingId", bookingId));

        if (bookingFromDB.getBookingItemList() != null)
            bookingFromDB.getBookingItemList().forEach(item -> item.setStatus(BookingStatus.CANCELLED));
        bookingFromDB.setRefundStatus(RefundStatus.PENDING);
        bookingFromDB.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(bookingFromDB);

        return modelMapper.map(bookingFromDB, BookingDTO.class);
    }


    @Override
    public BookingResponse allBookingsFromEvent(Long eventId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Booking> bookings = bookingRepository.getBookingsByEventId(eventId, pageDetails);

        List<BookingDTO> bookingDTOS = bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .toList();

        BookingResponse bookingResponse = new BookingResponse();
        bookingResponse.setContent(bookingDTOS);
        bookingResponse.setPageNumber(bookings.getNumber());
        bookingResponse.setPageSize(bookings.getSize());
        bookingResponse.setTotalPages(bookings.getTotalPages());
        bookingResponse.setTotalElements(bookings.getTotalElements());
        bookingResponse.setIsLast(bookings.isLast());

        return bookingResponse;
    }


    @Override
    public BookingResponse allBookings(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Booking> bookings = bookingRepository.findAll(pageDetails);

        List<BookingDTO> bookingDTOS = bookings.stream().map(booking -> modelMapper.map(booking, BookingDTO.class)).toList();

        BookingResponse bookingResponse = new BookingResponse();
        bookingResponse.setContent(bookingDTOS);
        bookingResponse.setPageNumber(bookings.getNumber());
        bookingResponse.setPageSize(bookings.getSize());
        bookingResponse.setTotalPages(bookings.getTotalPages());
        bookingResponse.setTotalElements(bookings.getTotalElements());
        bookingResponse.setIsLast(bookings.isLast());

        return bookingResponse;
    }
}
