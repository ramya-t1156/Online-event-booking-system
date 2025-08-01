package com.example.backend.controllers;

import com.example.backend.models.Event;
import com.example.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public Event getEventById(@PathVariable Long id){
        return eventService.getEventById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ORGANIZER','ADMIN')")
    public Event createEvent(@RequestBody Event event){
        return eventService.createEvent(event);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGANIZER','ADMIN')")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event){
        return eventService.updateEvent(id,event);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGANIZER','ADMIN')")
    public void deleteEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
    }

    @GetMapping("/organizer/{id}")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public List<Event> getEventsByOrganizerId(@PathVariable Long id){
        return eventService.getEventsByOrganizerId(id);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public List<Event> getEventsByStatus(@PathVariable String status){
        return eventService.getEventsByStatus(status);
    }

    @GetMapping("/start-after")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public List<Event> getEventsByStartDateTimeAfter(@RequestParam("datetime") String datetime){
        LocalDateTime dateTime = LocalDateTime.parse(datetime);
        return eventService.getEventsByStartDateTimeAfter(dateTime);
    }

    @GetMapping("/price/max")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public List<Event> getEventsByPriceMax(@RequestParam("amount") Double amount){
        return eventService.getEventsByPriceLessThanEqual(amount);
    }
}
