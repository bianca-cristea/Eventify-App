package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.payload.ChatRequestDTO;
import org.example.backend.payload.ChatResponseDTO;
import org.example.backend.services.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDTO> chat(@RequestBody ChatRequestDTO request) {

        String answer = aiService.askAI(request.getQuestion());

        return ResponseEntity.ok(new ChatResponseDTO(answer));
    }
}