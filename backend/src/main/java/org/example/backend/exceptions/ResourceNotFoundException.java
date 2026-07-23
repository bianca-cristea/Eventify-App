package org.example.backend.exceptions;




public class ResourceNotFoundException extends RuntimeException{

    private String resourceName;
    private String fieldName;
    private String field;
    private Long fieldId;

    public ResourceNotFoundException() {
    }

    public ResourceNotFoundException(String resourceName, String field, String fieldName ) {
        super(String.format("%s not found with %s: %s", resourceName,field, fieldName));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.field = field;
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Long fieldId) {
        super(String.format("%s not found with %s: %s", resourceName,fieldName,fieldId));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldId = fieldId;
    }
}
