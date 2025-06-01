package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.status.Status;
import fr.n7.hagymont.dto.UserProfileDto;
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
    public List<UserProfileDto> getAllUsers() {
        return userService.getAllUsers().stream().map(u -> UserProfileDto.toDto(u)).collect(Collectors.toList());
    }

    // GET /users/{username} - récupérer un utilisateur par son nom d'utilisateur
    @GetMapping("/{username}")
    public ResponseEntity<UserProfileDto> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(UserProfileDto.toDto(user));
    }

    // POST /users - créer un nouvel utilisateur
    @PostMapping
    public ResponseEntity<UserProfileDto> createUser(@RequestBody UserProfileDto userDto) {
        User createdUser = userService.createUser(UserProfileDto.fromDto(userDto));
        return ResponseEntity.status(201).body(UserProfileDto.toDto(createdUser));
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        boolean delete = userService.deleteUserByUsername(username);
        if (delete) {
            return ResponseEntity.ok(username + " has been deleted");
        }
        return ResponseEntity.status(404).body(username + " has not been found");
    }

    @PatchMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody Map<String, Object> updates) {
        try {
            User updatedUser = userService.updateUser(username, updates);
            return ResponseEntity.status(200).body(UserProfileDto.toDto(updatedUser));
        } catch (NotUniqueException e) {
            return ResponseEntity.status(505).body(e.getMessage());
        }catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}