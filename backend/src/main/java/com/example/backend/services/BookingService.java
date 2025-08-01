package com.example.backend.services;

import com.example.backend.models.Booking;
import com.example.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    public List<Booking> getAllBookings(){
        return bookingRepo.findAll();
    }

    public Booking findBookingsById(long id){
        return bookingRepo.findById(id).get();
    }

    public String doBookings(Booking booking){
        bookingRepo.save(booking);
        return "Event booked successfully!";
    }

    public String deleteBooking(long id){
        bookingRepo.deleteById(id);
        return "Event cancelled successfully!";
    }

    public List<Booking> getBookingsByUserId(long userId){
        return bookingRepo.findByUserId(userId);
    }

    public List<Booking> getBookingsByEventId(long eventId){
        return bookingRepo.getBookingByEventId(eventId);
    }

    public List<Booking> getBookingsByStatus(String status){
        return bookingRepo.getBookingsByStatus(status);
    }


}
