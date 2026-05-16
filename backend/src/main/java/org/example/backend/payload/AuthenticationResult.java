package org.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.backend.security.response.UserInfoResponse;
import org.example.backend.security.services.UserDetailsServiceImpl;
import org.springframework.http.ResponseCookie;

@Data
@AllArgsConstructor
public class AuthenticationResult {
    private final UserInfoResponse response;
    private final ResponseCookie jwtCookie;
}
