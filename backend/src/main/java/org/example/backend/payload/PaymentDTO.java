package org.example.backend.payload;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.models.PaymentMethod;
import org.example.backend.models.PaymentStatus;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private Long paymentId;

    private PaymentMethod paymentMethod;

    private LocalDate paymentDate;

    private PaymentStatus status;
}
