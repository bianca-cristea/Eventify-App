package org.example.backend.repositories;


import org.example.backend.models.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {

}