package org.example.backend.repositories;

import org.example.backend.models.Category;
import org.example.backend.models.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {


    Page<Event> findEventsByCategory(Category categoryFromDb, Pageable pageDetails);

    Page<Event> findByOrganizerUserId(Long userId, Pageable pageDetails);

    Page<Event> findByTitleLikeIgnoreCase(String s, Pageable pageDetails);
}
