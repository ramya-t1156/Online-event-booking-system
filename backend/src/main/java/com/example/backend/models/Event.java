package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "eventss")
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;
    private String type;
    private String location;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    private int capacity;
    private double price;

    private long organizerId;

    private String status;
}
