package fr.n7.hagymont.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiApiService {

    public String sendPostRequest(String apiURL, String apiKey, String jsonPayload) throws IOException {

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

        return jsonResponse.toString();
    }

    public String extractTextFromResponse(String jsonResponse) throws JsonMappingException, JsonProcessingException {
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