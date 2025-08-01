package com.example.backend.controllers;

import com.example.backend.models.Booking;
import com.example.backend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingService bookingService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> findAllBookings(){
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public Booking findBookingById(@PathVariable long id){
        return bookingService.findBookingsById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String createBooking(@RequestBody Booking booking){
        return bookingService.doBookings(booking);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String deleteBooking(@PathVariable long id){
        return bookingService.deleteBooking(id);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN','ORGANIZER')")
    public List<Booking> getBookingsByUserId(@PathVariable long userId){
        return bookingService.getBookingsByUserId(userId);
    }

    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasAnyRole('ORGANIZER','ADMIN')")
    public List<Booking> getBookingsByEventId(@PathVariable long eventId){
        return bookingService.getBookingsByEventId(eventId);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<Booking> getBookingsByStatus(@PathVariable String status){
        return bookingService.getBookingsByStatus(status);
    }
}
