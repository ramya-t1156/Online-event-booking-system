package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Column(unique = true)
    private String roleName;
}
