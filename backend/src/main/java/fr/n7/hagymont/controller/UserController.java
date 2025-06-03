package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.UserProfileDTO;
import fr.n7.hagymont.exception.NotUniqueException;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /users - récupérer tous les utilisateurs
    @GetMapping
    public List<UserProfileDTO> getAllUsers() {
        return userService.getAllUsers().stream().map(u -> new UserProfileDTO(u)).collect(Collectors.toList());
    }

    // GET /users/{username} - récupérer un utilisateur par son nom d'utilisateur
    @GetMapping("/{username}")
    public ResponseEntity<UserProfileDTO> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new UserProfileDTO(user));
    }

    // POST /users - créer un nouvel utilisateur
    @PostMapping
    public ResponseEntity<UserProfileDTO> createUser(@RequestBody UserProfileDTO userDTO) {
        User createdUser = userService.createUser(UserProfileDTO.fromDTO(userDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserProfileDTO(createdUser));
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        boolean delete = userService.deleteUserByUsername(username);
        if (delete) {
            return ResponseEntity.ok(username + " has been deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(username + " has not been found");
    }

    @PatchMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody Map<String, Object> updates) {
        try {
            User updatedUser = userService.updateUser(username, updates);
            return ResponseEntity.ok(new UserProfileDTO(updatedUser));
        } catch (NotUniqueException e) {
            return ResponseEntity.status(HttpStatus.HTTP_VERSION_NOT_SUPPORTED).body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
