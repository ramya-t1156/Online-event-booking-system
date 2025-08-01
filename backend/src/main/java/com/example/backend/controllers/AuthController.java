package com.example.backend.controllers;

import com.example.backend.models.JwtResponse;
import com.example.backend.models.LoginRequest;
import com.example.backend.models.RegisterDetails;
import com.example.backend.models.UserDetailsDto;
import com.example.backend.repository.RegisterDetailsRepository;
import com.example.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private RegisterDetailsRepository registerDetailsRepo;


    @GetMapping
    public String getAllUsers(){
        return authService.getAllUsers();
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserDetailsDto user){
        return authService.AddUser(user);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest login){
        return authService.loginUser(login);
    }

    @GetMapping("/profile")
    public RegisterDetails getUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        return registerDetailsRepo.findByUsername(username);
    }
}
