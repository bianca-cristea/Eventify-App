package org.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Column(name = "checked_in")
    private Boolean checkedIn = false;

    private LocalDateTime checkInTime;

    private Double totalAmount;

    @Column(name = "qr_code")
    private String qrCode;

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private RefundStatus refundStatus;

    @OneToMany(mappedBy = "booking", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<BookingItem> bookingItemList;

    @OneToOne(mappedBy = "booking", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private Payment payment;
}
