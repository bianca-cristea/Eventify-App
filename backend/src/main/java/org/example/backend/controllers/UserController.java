package org.example.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.payload.APIResponse;
import org.example.backend.payload.ChangePasswordDTO;
import org.example.backend.payload.UserDTO;
import org.example.backend.payload.UserResponse;
import org.example.backend.services.UserService;
import org.example.backend.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Users", description = "User management")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @Operation(summary = "Get all users")
    @GetMapping("/users")
    public ResponseEntity<UserResponse> getAllUsers(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_USERS_BY, required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ){
        return new ResponseEntity<>(userService.getAllUsers(pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }

    @Operation(summary = "Get all organizers")
    @GetMapping("/organizers")
    public ResponseEntity<UserResponse> getAllOrganizers(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_USERS_BY, required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {

        return new ResponseEntity<>(userService.getAllOrganizers(pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }


    @Operation(summary = "Get user by id")
    @GetMapping("/admin/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId){
        return new ResponseEntity<>(userService.getUserById(userId),HttpStatus.OK);
    }

    @Operation(summary = "Update user")
    @PutMapping("/admin/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId, @Valid @RequestBody UserDTO userDTO){
        return new ResponseEntity<>(userService.updateUser(userId,userDTO), HttpStatus.OK);
    }
    @Operation(summary = "Delete user")
    @DeleteMapping("/admin/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable Long userId){
        return new ResponseEntity<>(userService.deleteUser(userId),HttpStatus.OK);
    }

    @Operation(summary = "Get my profile")
    @GetMapping("/users/me")
    public ResponseEntity<UserDTO> getMyProfile(){
        return new ResponseEntity<>(userService.getMyProfile(),HttpStatus.OK);
    }
    @Operation(summary = "Update my profile")
    @PutMapping("/users/me")
    public ResponseEntity<UserDTO> updateMyProfile(@Valid @RequestBody UserDTO userDTO){
        return new ResponseEntity<>(userService.updateMyProfile(userDTO),HttpStatus.OK);
    }
    @Operation(summary = "Change password")
    @PutMapping("/users/me/password")
    public ResponseEntity<APIResponse> changePassword(@Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        userService.changePassword(changePasswordDTO);
        return new ResponseEntity<>(new APIResponse("Password changed successfully.", true), HttpStatus.OK);
    }
}
