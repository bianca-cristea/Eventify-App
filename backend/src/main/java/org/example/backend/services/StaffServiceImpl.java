package org.example.backend.services;

import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService{


    @Override
    public UserDTO assignStaffToEvent(Long eventId, UserDTO userDTO) {
        return null;
    }

    @Override
    public UserDTO eliminateStaffFromEvent(Long eventId, Long userId) {
        return null;
    }

    @Override
    public List<UserDTO> getStaffFromEvent(Long eventId) {
        return List.of();
    }

    @Override
    public BookingDTO checkTicket(Long bookingId) {
        return null;
    }
}
