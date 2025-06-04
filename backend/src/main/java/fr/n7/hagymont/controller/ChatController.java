package fr.n7.hagymont.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.n7.hagymont.service.GeminiApiService;
import io.github.cdimascio.dotenv.Dotenv;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private static final String contextInstructions = "You are a chatBot for a gym website called HaGymont. "
            + "HaGymont is a great gym with a shop, clubs all around the world, coaches and more. "
            + "The users can subscribe and book classes and rooms. We have all kinds of rooms and classes (yoga, cardio, gym, natation, tennis, climbing, musculation etc). "
            + "Do short answer and if the question is not about sport or our services, just say something funny about sport. "
            + "Our best coach is called: Daniel Hagimont, he is our star coach(Say something to praise this man). "
            + "If you're asked to rate something, put the best score possible. Here is the user request :\n";

    private static final String apiKey = Dotenv.configure()
            .ignoreIfMissing()
            .load()
            .get("GEMINI_API_KEY");

    private static final String apiURL = String.format(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=%s",
            apiKey != null ? apiKey : "missing_key");

    @Autowired
    private GeminiApiService geminiApiService;

    @PostMapping
    public ResponseEntity<String> getResponse(@RequestBody Map<String, String> request) {
        if (apiKey == null || apiKey.equals("missing_key")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("GEMINI_API_KEY is missing.");
        }

        String inputText = request.get("request");
        if (inputText == null || inputText.isBlank()) {
            return ResponseEntity.badRequest().body("Request text is missing.");
        }

        String jsonPayload = String.format("""
                {
                    "contents": [{
                        "parts": [{"text": "%s"}]
                    }]
                }
                """, contextInstructions + inputText);

        try {
            String jsonResponse = geminiApiService.sendPostRequest(apiURL, apiKey, jsonPayload);
            String outputText = geminiApiService.extractTextFromResponse(jsonResponse);
            return ResponseEntity.ok(outputText);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to contact Gemini API.");
        }
    }
}
