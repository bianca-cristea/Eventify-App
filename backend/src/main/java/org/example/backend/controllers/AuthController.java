package org.example.backend.controllers;

import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.payload.AuthenticationResult;
import org.example.backend.security.request.LoginRequest;
import org.example.backend.security.request.SignupRequest;
import org.example.backend.security.response.MessageResponse;
import org.example.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        AuthenticationResult result = authService.login(loginRequest);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                result.getJwtCookie().toString()).body(result.getResponse());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        return authService.register(signupRequest);
    }

    @GetMapping("/username")
    public String getUsername(Authentication authentication) {
        if (authentication != null) {
            return authentication.getName();
        } else
            return "";
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body("No auth in context");
        }
        return ResponseEntity.ok(authService.getUserDetails(authentication));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = authService.logout();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out."));
    }


    @GetMapping("/organizers")
    public ResponseEntity<?> getAllOrganizers(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber) {

        Sort sortByAndOrder = Sort.by(AppConstants.SORT_USERS_BY).descending();
        Pageable pageDetails = PageRequest.of(pageNumber,Integer.parseInt(AppConstants.PAGE_SIZE),sortByAndOrder);
        return ResponseEntity.ok(authService.getAllOrganizers(pageDetails));
    }

}
