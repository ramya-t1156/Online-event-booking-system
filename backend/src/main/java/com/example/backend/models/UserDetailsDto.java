package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {
    private long userId;
    private String name;
    private String email;
    private String password;
    private String username;
    private Set<String> roleNames;
}
