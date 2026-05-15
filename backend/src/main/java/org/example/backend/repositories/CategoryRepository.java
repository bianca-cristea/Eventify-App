package org.example.backend.repositories;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.example.backend.models.Category;
import org.example.backend.payload.CategoryResponse;
import org.example.backend.services.CategoryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByCategoryName(@NotBlank @Size(min = 3, message="The name of the category should have at least 3 characters.") String categoryName);
}
