package com.example.backend.services;

import com.example.backend.jwt.JwtTokenProvider;
import com.example.backend.models.*;
import com.example.backend.repository.RegisterDetailsRepository;
import com.example.backend.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    RegisterDetailsRepository regRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RolesRepository rolesRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String getAllUsers(){
        return "All users";
    }

    public String AddUser(UserDetailsDto user){
        RegisterDetails registerDetails = new RegisterDetails();
        registerDetails.setId(user.getUserId());
        registerDetails.setName(user.getName());
        registerDetails.setEmail(user.getEmail());
        registerDetails.setUsername(user.getUsername());
        registerDetails.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Roles> roles = new HashSet<>();
        for(String roleName : user.getRoleNames()){
            Roles role = rolesRepo.findByRoleName("ROLE_" + roleName.toUpperCase());
            roles.add(role);
        }
        registerDetails.setRoles(roles);

        regRepo.save(registerDetails);
        return "User Added Successfully";
    }

public JwtResponse loginUser(LoginRequest login) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword())
    );

    String token = jwtTokenProvider.generateToken(authentication);
    String username = login.getUsername();

    RegisterDetails user = regRepo.findByUsername(username);

    String joinedRoles = authentication.getAuthorities().stream()
            .map(role -> role.getAuthority())
            .collect(Collectors.joining(","));

    return new JwtResponse(
            token,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getName(),
            joinedRoles
    );
}

}
