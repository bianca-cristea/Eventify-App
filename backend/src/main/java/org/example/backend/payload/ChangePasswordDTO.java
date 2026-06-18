package org.example.backend.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordDTO {
    @NotBlank
    private String oldPassword;

    @NotBlank
    @Size(min = 4)
    private String newPassword;
}
