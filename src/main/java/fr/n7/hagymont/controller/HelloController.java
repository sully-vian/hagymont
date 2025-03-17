package fr.n7.hagymont.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/Serv")
public class HelloController extends HttpServlet {

    // needed for good rendering of the page
    private static final String contextInstructions = """
            You are one of the best AIs existing and you must answer people's requests online. Because it is online, you can only use plain HTML with strictly no Markdown formatting whatsoever. The request is the following: \n
            """;
    private static final String apiURL = """
            https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY
            """.strip();
    private static final String apiKey = Dotenv.configure()
            .directory(System.getProperty("user.dir") + "/webapps/hagymont/WEB-INF/classes")
            .load()
            .get("GEMINI_API_KEY");

    // méthode basique pour afficher la page d'accueil
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/jsp/input.jsp").forward(request, response);
    }

    @Override
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

        String outputText = sendPostRequest(jsonPayload);
        request.setAttribute("inputText", inputText);
        request.setAttribute("outputText", outputText);
        request.getRequestDispatcher("/WEB-INF/jsp/output.jsp").forward(request, response);
    }

    private String sendPostRequest(String jsonPayload) throws IOException {

        String apiURLlWithKey = apiURL.replace("GEMINI_API_KEY", apiKey);

        // Create URL and connection
        URL url = URI.create(apiURLlWithKey).toURL();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // config connection
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        // Send request
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonPayload.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // stop here if response is not OK
        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            return "Error when getting response";
        }

        // Get response
        StringBuilder jsonResponse = new StringBuilder();
        try (InputStream is = connection.getInputStream();
                InputStreamReader isr = new InputStreamReader(is, "utf-8");
                BufferedReader br = new BufferedReader(isr)) {
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                jsonResponse.append(responseLine.trim());
            }
        }

        String outputText = extractTextFromResponse(jsonResponse.toString());

        return outputText;
    }

    private String extractTextFromResponse(String jsonResponse) throws JsonMappingException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        JsonNode rootNode = mapper.readTree(jsonResponse);

        // navigate to the "text" field
        String text = rootNode
                .get("candidates") // to "candidates" array
                .get(0) // to first element
                .get("content") // to "content" array
                .get("parts") // to "parts" array
                .get(0) // to first element
                .get("text") // to text field
                .asText(); // to text value

        return text;
    }
}