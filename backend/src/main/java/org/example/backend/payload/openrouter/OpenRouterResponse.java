package org.example.backend.payload.openrouter;

import lombok.Data;

import java.util.List;

@Data
public class OpenRouterResponse {

    private List<Choice> choices;

    @Data
    public static class Choice {
        private Message message;
    }
}