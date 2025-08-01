package com.example.backend.controllers;

import com.example.backend.models.RegisterDetails;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUserById(@PathVariable long id){
        return userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER','ORGANIZER')")
    public String updateUser(@PathVariable Long id, @RequestBody RegisterDetails updatedUser) {
        boolean updated = userService.updateUserById(id, updatedUser);
        if (updated) {
            return "User updated successfully.";
        } else {
            return "User not found or update failed.";
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<RegisterDetails> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('USER','ORGANIZER','ADMIN')")
    public RegisterDetails getUserById(@PathVariable long id) {
        return userService.getUserByUserId(id);
    }

}
