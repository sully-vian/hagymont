package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Get all reservations", description = "Retrieve a list of all reservations.")
    @GetMapping
    public List<ReservationDTO> getAllReservations() {
        return reservationService.getAllReservations()
                .stream()
                .map(ReservationDTO::new)
                .collect(Collectors.toList());
    }

    // Get all reservations for a specific user
    @Operation(summary = "Get reservations by user", description = "Retrieve all reservations made by a specific user.")
    @GetMapping("/user/{username}")
    public List<ReservationDTO> getReservationsByUser(@PathVariable String username) {
        return reservationService.getReservationsByUser(username)
                .stream()
                .map(ReservationDTO::new)
                .collect(Collectors.toList());
    }

    // Create a reservation
    @Operation(summary = "Create a reservation", description = "Create a new reservation with the provided details.")
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation createdReservation = reservationService.createReservation(reservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ReservationDTO(createdReservation));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Delete a reservation
    @Operation(summary = "Delete a reservation", description = "Cancel a reservation by its ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        boolean deleted = reservationService.deleteReservation(id);
        return deleted
                ? ResponseEntity.ok("Reservation canceled")
                : ResponseEntity.notFound().build();
    }
}
