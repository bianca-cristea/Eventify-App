package org.example.backend.repositories;


import org.example.backend.models.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {

    @Modifying
    @Query("DELETE FROM BookingItem bi WHERE bi.booking.bookingId = ?1")
    void deleteAllByBookingId(Long bookingId);
}