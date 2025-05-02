package fr.n7.hagymont.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.service.RoomService;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // GET /rooms/{id} - User consulte une salle par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long roomId) {
        Room room = roomService.getRoomById(roomId);
        if (room == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(room);
    }

    // GET /rooms - User consulte toutes les salles existantes (filtre)
    @GetMapping
    public List<Room> getAllRooms(
            @RequestParam(required = false) String typeFilter) {
        return roomService.getAllRooms(typeFilter);
    }

    // POST /rooms - créer une nouvelle chambre (admin)
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.status(201).body(createdRoom);
    }

    // DELETE /rooms/{id} - Supprimer la chambre (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        boolean deleted = roomService.deleteRoom(id);
        return deleted ? ResponseEntity.ok("Room deleted")
                : ResponseEntity.notFound().build();
    }

    // PATCH /rooms/{id} - Modifier l'info (admin)
    @PatchMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(
            @PathVariable Long roomId,
            @RequestBody Map<String, Object> updates) {
        try {
            Room updatedRoom = roomService.updateRoom(roomId, updates);
            return ResponseEntity.ok(updatedRoom);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }
}
