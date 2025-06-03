package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.RoomDTO;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // GET /rooms/{id} - User consulte une salle par son ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        if (room == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new RoomDTO(room));
    }

    // GET /rooms - User consulte toutes les salles existantes (filtre)
    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms(
            @RequestParam(required = false) String typeFilter) {
        List<Room> allRooms = roomService.getAllRooms(typeFilter);
        List<RoomDTO> roomDTOs = allRooms.stream()
                .map(RoomDTO::new)
                .toList();
        return ResponseEntity.ok(roomDTOs);
    }

    // POST /rooms - créer une nouvelle chambre (admin)
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoom);
    }

    // DELETE /rooms/{id} - Supprimer la chambre (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        boolean deleted = roomService.deleteRoom(id);
        return deleted ? ResponseEntity.ok("Room deleted")
                : ResponseEntity.notFound().build();
    }

    // PATCH /rooms/{id} - Modifier l'info (admin)
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateRoom(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {
        try {
            Room updatedRoom = roomService.updateRoom(id, updates);
            return ResponseEntity.ok(updatedRoom);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}
