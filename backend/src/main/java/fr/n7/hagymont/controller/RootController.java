package fr.n7.hagymont.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
public class RootController {

    private final String WELCOME_MESSAGE = "Welcome to the Hagymont API! You can find the API's documentation at /docs";

    @Operation(summary = "Welcome endpoint", description = "Returns a welcome message for the API.")
    @RequestMapping("/")
    public ResponseEntity<Map<String, String>> welcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", WELCOME_MESSAGE);
        return ResponseEntity.ok(response);
    }
}