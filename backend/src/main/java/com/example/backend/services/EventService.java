package com.example.backend.services;

import com.example.backend.models.Event;
import com.example.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepo;

    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }

    public Event getEventById(long id){
        return eventRepo.findById(id).get();
    }

    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    public Event updateEvent(long id , Event eventDetails){
        Event event = eventRepo.findById(id).orElseThrow(()-> new RuntimeException("Event not found"));

        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setType(eventDetails.getType());
        event.setLocation(eventDetails.getLocation());
        event.setStartDateTime(eventDetails.getStartDateTime());
        event.setEndDateTime(eventDetails.getEndDateTime());
        event.setCapacity(eventDetails.getCapacity());
        event.setPrice(eventDetails.getPrice());
        event.setOrganizerId(eventDetails.getOrganizerId());
        event.setStatus(eventDetails.getStatus());

        return eventRepo.save(event);
    }

    public void deleteEvent(long id){
        eventRepo.deleteById(id);
    }

    public List<Event> getEventsByOrganizerId(long organizerId){
        return eventRepo.findByOrganizerId(organizerId);
    }

    public List<Event> getEventsByStatus(String status){
        return eventRepo.findByStatus(status);
    }

    public List<Event> getEventsByStartDateTimeAfter(LocalDateTime dateTime){
        return eventRepo.findByStartDateTimeAfter(dateTime);
    }

    public List<Event> getEventsByPriceLessThanEqual(double price){
        return eventRepo.findByPriceLessThanEqual(price);
    }
}
