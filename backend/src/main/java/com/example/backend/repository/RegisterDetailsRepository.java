package com.example.backend.repository;

import com.example.backend.models.RegisterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterDetailsRepository extends JpaRepository<RegisterDetails, Long> {

    RegisterDetails findByUsername(String username);

}
