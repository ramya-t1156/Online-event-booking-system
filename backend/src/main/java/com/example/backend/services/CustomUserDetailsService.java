package com.example.backend.services;

import com.example.backend.models.RegisterDetails;
import com.example.backend.repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    RegisterDetailsRepository regRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        RegisterDetails user = regRepo.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException(username);
        }

        Set<GrantedAuthority> authorities = user.getRoles().stream()
                .map(roles -> new SimpleGrantedAuthority(roles.getRoleName()))
                .collect(Collectors.toSet());

        return new User(user.getUsername() , user.getPassword() , authorities);
    }
}
