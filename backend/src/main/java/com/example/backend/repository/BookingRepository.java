package com.example.backend.repository;

import com.example.backend.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(long userId);

    List<Booking> getBookingByEventId(long eventId);

    List<Booking> getBookingsByStatus(String status);
}
