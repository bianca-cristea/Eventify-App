package org.example.backend.repositories;

import org.example.backend.models.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    Booking findByUserUserId(Long userId);

    @Query("SELECT b FROM Booking b "+
            "JOIN b.bookingItemList bi "+
            "JOIN bi.ticket t "+
            "JOIN t.event e "+
            "WHERE e.eventId = :eventId")
    Page<Booking> getBookingsByEventId(@Param("eventId")  Long eventId, Pageable pageDetails);
}
