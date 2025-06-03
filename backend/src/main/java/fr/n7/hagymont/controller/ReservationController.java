package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.service.ReservationService;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.dto.ReservationDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Get all reservations
    @GetMapping
    public List<ReservationDTO> getAllReservations() {
        return reservationService.getAllReservations()
                .stream()
                .map(ReservationDTO::toDto)
                .collect(Collectors.toList());
    }

    // Get all reservations for a specific user
    @GetMapping("/user/{username}")
    public List<ReservationDTO> getReservationsByUser(@PathVariable String username) {
        return reservationService.getReservationsByUser(username)
                .stream()
                .map(ReservationDTO::toDto)
                .collect(Collectors.toList());
    }

    // Create a reservation
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation createdReservation = reservationService.createReservation(reservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(ReservationDTO.toDto(createdReservation));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Delete a reservation
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        boolean deleted = reservationService.deleteReservation(id);
        return deleted
                ? ResponseEntity.ok("Reservation canceled")
                : ResponseEntity.notFound().build();
    }
}
