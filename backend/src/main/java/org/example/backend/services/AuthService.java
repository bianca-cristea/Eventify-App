package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.payload.AuthenticationResult;
import org.example.backend.payload.UserResponse;
import org.example.backend.security.request.LoginRequest;
import org.example.backend.security.request.SignupRequest;
import org.example.backend.security.response.MessageResponse;
import org.example.backend.security.response.UserInfoResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthenticationResult login(LoginRequest loginRequest);

    ResponseEntity<MessageResponse> register(@Valid SignupRequest signupRequest);

    UserInfoResponse getUserDetails(Authentication authentication);

    ResponseCookie logout();

    UserResponse getAllOrganizers(Pageable pageable);
}
