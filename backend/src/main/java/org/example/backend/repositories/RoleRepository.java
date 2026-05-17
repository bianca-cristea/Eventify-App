package org.example.backend.repositories;

import org.example.backend.models.AppRole;
import org.example.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
   Optional<Role> findByRoleName(AppRole appRole);
}
