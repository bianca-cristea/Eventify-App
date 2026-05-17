package org.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private String title;

    private String description;
    private String image;
    private String location;

    private LocalDateTime eventDate;
    private LocalDateTime endDate;

    private Integer capacity;
    private Double price;
    private String status;
}
