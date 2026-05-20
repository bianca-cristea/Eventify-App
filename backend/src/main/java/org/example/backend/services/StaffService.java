package org.example.backend.services;

import org.example.backend.payload.BookingDTO;
import org.example.backend.payload.TicketDTO;
import org.example.backend.payload.UserDTO;

import java.util.List;

public interface StaffService {

    UserDTO assignStaffToEvent(Long eventId, UserDTO userDTO);

    UserDTO eliminateStaffFromEvent(Long eventId, Long userId);

    UserDTO getStaffFromEvent(Long eventId);

    BookingDTO checkTicket(String qrCode);
}
