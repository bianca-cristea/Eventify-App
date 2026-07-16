package org.example.backend.services;

import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.Event;
import org.example.backend.models.Ticket;
import org.example.backend.models.TicketType;
import org.example.backend.payload.TicketDTO;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.TicketRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<TicketDTO> typesOfTicketsPerEvent(Long eventId) {
       Event eventFromDB = eventRepository.findById(eventId)
               .orElseThrow(() -> new ResourceNotFoundException("Event","eventId",eventId));

       List<Ticket> ticketsPerEvent = eventFromDB.getTickets();
       List<TicketDTO> ticketDTOS = ticketsPerEvent.stream().map(ticket -> modelMapper.map(ticket,TicketDTO.class)).toList();

       return ticketDTOS;
    }

    @Override
    public TicketDTO addTicketType(Long eventId, TicketDTO ticketDTO) {

        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event","eventId",eventId));
        Ticket newTicket = new Ticket();
        newTicket.setTicketType(TicketType.valueOf(ticketDTO.getTicketType()));
        newTicket.setEvent(eventFromDB);
        newTicket.setPrice(ticketDTO.getPrice());
        newTicket.setCapacity(ticketDTO.getCapacity());

        ticketRepository.save(newTicket);

        return modelMapper.map(newTicket,TicketDTO.class);
    }

    @Override
    public TicketDTO updateTicketType(Long eventId, Long ticketId, TicketDTO ticketDTO) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event","eventId",eventId));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket","ticketId",ticketId));

        if (!ticket.getEvent().getEventId().equals(eventId)) {
            throw new APIException("Ticket does not belong to this event");
        }

        ticket.setTicketType(TicketType.valueOf(ticketDTO.getTicketType()));
        ticket.setEvent(eventFromDB);
        ticket.setPrice(ticketDTO.getPrice());
        ticket.setCapacity(ticketDTO.getCapacity());

        Ticket updatedTicket = ticketRepository.save(ticket);

        return modelMapper.map(updatedTicket,TicketDTO.class);
    }

    @Override
    public TicketDTO deleteTicketType(Long eventId, Long ticketId) {
        Event eventFromDB = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event","eventId",eventId));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket","ticketId",ticketId));

        ticketRepository.delete(ticket);

        return modelMapper.map(ticket,TicketDTO.class);
    }
}
