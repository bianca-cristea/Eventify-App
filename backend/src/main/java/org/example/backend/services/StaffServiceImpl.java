package org.example.backend.services;

import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.Booking;
import org.example.backend.models.BookingStatus;
import org.example.backend.models.Event;
import org.example.backend.models.User;
import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.UserDTO;
import org.example.backend.repositories.BookingRepository;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;


    @Override
    public UserDTO assignStaffToEvent(Long eventId, UserDTO userDTO) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        User staff = userRepository.findById(userDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userDTO.getUserId()));

        eventFromDB.setStaff(staff);
        eventRepository.save(eventFromDB);

        return modelMapper.map(staff, UserDTO.class);
    }

    @Override
    public UserDTO eliminateStaffFromEvent(Long eventId, Long userId) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));

        User staff = eventFromDB.getStaff();
        eventFromDB.setStaff(null);
        eventRepository.save(eventFromDB);

        return modelMapper.map(staff, UserDTO.class);
    }

    @Override
    public UserDTO getStaffFromEvent(Long eventId) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "eventId", eventId));
        User staff = eventFromDB.getStaff();

        if (staff == null) {
            throw new ResourceNotFoundException("Staff", "eventId", eventId);
        }

        return modelMapper.map(staff, UserDTO.class);
    }

    @Override
    public BookingDTO checkTicket(String qrCode) {

        Booking booking = bookingRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Booking", "qrCode", qrCode
                ));


        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new APIException("Ticket already checked in.");
        }


        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new APIException("Ticket is cancelled.");
        }


        if (booking.getPayment() == null) {
            throw new APIException("Ticket not paid.");
        }


        booking.setStatus(BookingStatus.CONFIRMED);


        bookingRepository.save(booking);

        return modelMapper.map(booking, BookingDTO.class);
    }
}