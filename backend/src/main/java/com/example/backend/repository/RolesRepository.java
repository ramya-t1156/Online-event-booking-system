package com.example.backend.repository;

import com.example.backend.models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByRoleName(String s);
}
