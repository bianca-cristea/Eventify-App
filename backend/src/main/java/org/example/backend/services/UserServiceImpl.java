package org.example.backend.services;

import org.example.backend.exceptions.APIException;
import org.example.backend.exceptions.ResourceNotFoundException;
import org.example.backend.models.AppRole;
import org.example.backend.models.User;
import org.example.backend.payload.ChangePasswordDTO;
import org.example.backend.payload.UserDTO;
import org.example.backend.payload.UserResponse;
import org.example.backend.repositories.UserRepository;
import org.example.backend.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<User> pageUser = userRepository.findAll(pageDetails);

        List<UserDTO> usersDTOs = pageUser.stream().map(u -> modelMapper.map(u, UserDTO.class)).toList();

        UserResponse userResponse = new UserResponse();
        userResponse.setContent(usersDTOs);
        userResponse.setPageNumber(pageUser.getNumber());
        userResponse.setTotalPages(pageUser.getTotalPages());
        userResponse.setTotalElements(pageUser.getTotalElements());
        userResponse.setLastPage(pageUser.isLast());

        return userResponse;
    }

    @Override
    public UserResponse getAllOrganizers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<User> allOrganizers = userRepository.findByRoleName(AppRole.ROLE_ORGANIZER, pageDetails);
        List<UserDTO> userDTOS = allOrganizers.getContent()
                .stream()
                .map(u -> modelMapper.map(u, UserDTO.class)).toList();

        UserResponse response = new UserResponse();
        response.setContent(userDTOS);
        response.setPageNumber(allOrganizers.getNumber());
        response.setPageSize(allOrganizers.getSize());
        response.setTotalElements(allOrganizers.getTotalElements());
        response.setTotalPages(allOrganizers.getTotalPages());
        response.setLastPage(allOrganizers.isLast());
        return response;

    }

    @Override
    public UserDTO getUserById(Long userId) {
        User userFromDb = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return modelMapper.map(userFromDb, UserDTO.class);

    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User userFromDb = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        userFromDb.setEmail(userDTO.getEmail());
        userFromDb.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User savedUser = userRepository.save(userFromDb);

        return modelMapper.map(savedUser, UserDTO.class);

    }

    @Override
    public UserDTO deleteUser(Long userId) {
        User userFromDb = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        userRepository.delete(userFromDb);

        return modelMapper.map(userFromDb, UserDTO.class);

    }

    @Override
    public UserDTO getMyProfile() {
        User user = authUtil.loggedInUser();
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO updateMyProfile(UserDTO userDTO) {
        User userFromDb = authUtil.loggedInUser();
        userFromDb.setEmail(userDTO.getEmail());
        User savedUser = userRepository.save(userFromDb);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        User userFromDb = authUtil.loggedInUser();

        if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), userFromDb.getPassword())) {
            throw new APIException("Old password is incorrect.");
        }

        userFromDb.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(userFromDb);
    }
}
