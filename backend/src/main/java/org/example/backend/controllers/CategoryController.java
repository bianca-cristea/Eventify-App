package org.example.backend.controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.example.backend.config.AppConstants;
import org.example.backend.payload.CategoryDTO;
import org.example.backend.payload.CategoryResponse;
import org.example.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Categories", description = "Category management")
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Get all categories")
    @GetMapping("/categories")
    public ResponseEntity<CategoryResponse> getAllCategoriesPublic(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "orderBy", defaultValue = AppConstants.SORT_CATEGORIES_BY, required = false) String orderBy,
            @RequestParam(name = "orderDir", defaultValue = AppConstants.SORT_DIR, required = false) String orderDir
    ){
        return new ResponseEntity<>(categoryService.getAllCategories(pageNumber, pageSize, orderBy, orderDir), HttpStatus.OK);
    }

    @Operation(summary = "Get all categories for admin")
    @GetMapping("/admin/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "orderBy", defaultValue = AppConstants.SORT_CATEGORIES_BY, required = false) String orderBy,
            @RequestParam(name = "orderDir", defaultValue = AppConstants.SORT_DIR,required = false) String orderDir
    ){
        return new ResponseEntity<>(categoryService.getAllCategories(pageNumber,pageSize,orderBy,orderDir), HttpStatus.OK);
    }

    @Operation(summary = "Crate category")
    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO){
        return new ResponseEntity<>(categoryService.createCategory(categoryDTO),HttpStatus.CREATED);
    }
    @Operation(summary = "Update category")
    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long categoryId, @Valid @RequestBody CategoryDTO categoryDTO){
        return new ResponseEntity<>(categoryService.updateCategory(categoryId,categoryDTO),HttpStatus.OK);
    }
    @Operation(summary = "Delete category")
    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> deleteCategory(@PathVariable Long categoryId){
        return new ResponseEntity<>(categoryService.deleteCategory(categoryId),HttpStatus.OK);
    }

}
