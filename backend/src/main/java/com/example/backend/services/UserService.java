package com.example.backend.services;

import com.example.backend.models.RegisterDetails;
import com.example.backend.repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private RegisterDetailsRepository registerDetailsRepo;

    public List<RegisterDetails> getAllUsers() {
        return registerDetailsRepo.findAll();
    }

    public String deleteUser(long id){
        Optional<RegisterDetails> user = registerDetailsRepo.findById(id);

        if(user.isPresent()){
            RegisterDetails registerDetails = user.get();

            registerDetails.getRoles().clear();
            registerDetailsRepo.save(registerDetails);

            registerDetailsRepo.delete(registerDetails);
            return "user details successfully deleted";
        }
        else{
            return "user not found";
        }
    }

    public boolean updateUserById(Long id, RegisterDetails updatedUser) {
        Optional<RegisterDetails> existingUserOptional = registerDetailsRepo.findById(id);

        if (existingUserOptional.isPresent()) {
            RegisterDetails existingUser = existingUserOptional.get();

            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setRoles(updatedUser.getRoles());

            registerDetailsRepo.save(existingUser);
            return true;
        } else {
            return false;
        }
    }

    public RegisterDetails getUserByUserId(long id) {
        Optional<RegisterDetails> user = registerDetailsRepo.findById(id);
        return user.orElse(null);
    }
}
