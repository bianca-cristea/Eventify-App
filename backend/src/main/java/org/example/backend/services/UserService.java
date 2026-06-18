package org.example.backend.services;

import org.example.backend.models.User;
import org.example.backend.payload.ChangePasswordDTO;
import org.example.backend.payload.UserDTO;
import org.example.backend.payload.UserResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;

import java.util.List;

public interface UserService {
    UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDTO getUserById(Long userId);

    UserDTO updateUser(Long userId, UserDTO userDTO);

    UserDTO deleteUser(Long userId);
    void changePassword(ChangePasswordDTO changePasswordDTO);
    UserDTO getMyProfile();
    UserDTO updateMyProfile(UserDTO userDTO);

    UserResponse getAllOrganizers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
}
