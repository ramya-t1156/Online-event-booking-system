package com.example.backend.repository;

import com.example.backend.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {
    List<Event> findByOrganizerId(long organizerId);

    List<Event> findByStatus(String status);

    List<Event> findByStartDateTimeAfter(LocalDateTime dateTime);

    List<Event> findByPriceLessThanEqual(double price);
}
