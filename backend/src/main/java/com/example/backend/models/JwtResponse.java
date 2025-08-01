package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private Long userId;
    private String username;
    private String email;
    private String name;
    private String roles;
}
