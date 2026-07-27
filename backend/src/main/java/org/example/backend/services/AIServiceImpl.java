package org.example.backend.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.models.Event;
import org.example.backend.payload.openrouter.Message;
import org.example.backend.payload.openrouter.OpenRouterRequest;
import org.example.backend.payload.openrouter.OpenRouterResponse;
import org.example.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final RestTemplate restTemplate;
    private final EventRepository eventRepository;

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Override
    public String askAI(String question) {

        List<Event> events = eventRepository.findAll();

        StringBuilder context = new StringBuilder();

        context.append("""
            You are an assistant for an event booking platform.

            Answer ONLY using the events below.

            If the answer cannot be found in the events, say that no suitable event exists.

            Available events:

            """);

        for (Event event : events) {

            context.append("""
                -------------------------
                Title: %s
                Description: %s
                Category: %s
                Location: %s
                Date: %s
                Status: %s 
                """
                    .formatted(
                            event.getTitle(),
                            event.getDescription(),
                            event.getCategory().getCategoryName(),
                            event.getLocation(),
                            event.getEventDate(),
                            event.getStatus()
                    ));
        }

        context.append("\nUser question:\n");
        context.append(question);

        OpenRouterRequest request = new OpenRouterRequest(
                "google/gemma-4-26b-a4b-it:free",
                List.of(
                        new Message(
                                "user",
                                context.toString()
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);

        headers.add("HTTP-Referer", "http://localhost:8080");
        headers.add("X-Title", "Event Booking Platform");

        HttpEntity<OpenRouterRequest> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<OpenRouterResponse> response =
                restTemplate.exchange(
                        "https://openrouter.ai/api/v1/chat/completions",
                        HttpMethod.POST,
                        entity,
                        OpenRouterResponse.class
                );

        if (response.getBody() == null
                || response.getBody().getChoices() == null
                || response.getBody().getChoices().isEmpty()) {

            return "AI could not generate an answer.";
        }

        return response.getBody()
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}
