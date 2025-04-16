package fr.n7.hagymont.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.api.model.User;
import fr.n7.hagymont.api.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{username}")
    public ResponseEntity<AuthResponse> getUserByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        AuthResponse response = new AuthResponse();
        response.setUsername(user.getUsername());
        response.setPassword(user.getPassword());

        return ResponseEntity.ok(response);
    }
}
