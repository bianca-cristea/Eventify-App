package org.example.backend.repositories;

import org.example.backend.models.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingItemRepository extends JpaRepository<BookingItem,Long> {
}
