package org.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private Long eventId;
    private String title;
    private String description;
    private String image;
    private String location;
    private LocalDateTime eventDate;
    private LocalDateTime endDate;
    private Integer capacity;
    private Double price;
    private Double specialPrice;
    private String status;
    private List<TicketDTO> tickets;
    private Long categoryId;
    private String organizerName;
}
