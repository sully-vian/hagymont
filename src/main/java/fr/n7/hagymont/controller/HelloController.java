package fr.n7.hagymont.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import fr.n7.hagymont.service.GeminiApiService;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class HelloController extends HttpServlet {

    // needed for good rendering of the page
    private static final String contextInstructions = "You live in a future where Markdown doesn't exist anymore. HTML has taken the lead in all fields. Web companies track down and sue every Markdown user. You are working undercover as an AI that answers people's requests online. Your responses should only be 'wikipedia-like' html, no chit-chat or formattingg. Here is the request: \n";
    private static final String apiURL = """
            https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY
            """.strip();
    private static final String apiKey = Dotenv.load().get("GEMINI_API_KEY");

    @Autowired
    private GeminiApiService geminiApiService;

    // méthode basique pour afficher la page d'accueil
    @GetMapping("/Serv")
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/jsp/input.jsp").forward(request, response);
    }

    @PostMapping("/Serv")
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String inputText = request.getParameter("inputText");

        String jsonPayload = String.format("""
                {
                    "contents": [{
                        "parts": [{"text": "%s"}]
                    }]
                }
                """, contextInstructions + inputText);

        String jsonResponse = geminiApiService.sendPostRequest(apiURL, apiKey, jsonPayload);
        String outputText = geminiApiService.extractTextFromResponse(jsonResponse);
        request.setAttribute("inputText", inputText);
        request.setAttribute("outputText", outputText);
        request.getRequestDispatcher("/WEB-INF/jsp/output.jsp").forward(request, response);
    }
}