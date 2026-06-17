package org.example.backend.services;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.example.backend.payload.StripePaymentDTO;

public interface StripeService {

    PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException;
}
