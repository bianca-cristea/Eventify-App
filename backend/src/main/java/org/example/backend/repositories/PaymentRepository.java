package org.example.backend.repositories;

import org.example.backend.models.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    @Query("SELECT p FROM Payment p WHERE p.booking.user.userId = :userId")
    Page<Payment> findPaymentsByUserId(@Param("userId") Long userId, Pageable pageable);
}
