package fr.n7.hagymont.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.ReservationDTO;
import fr.n7.hagymont.exception.DuplicateReservationException;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Get all reservations
    @Operation(summary = "Get all reservations", description = "Retrieve a list of all reservations.")
    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        List<ReservationDTO> reservationDTOs = reservations.stream()
                .map(ReservationDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(reservationDTOs);
    }

    // Get all reservations for a specific user
    @Operation(summary = "Get reservations by user", description = "Retrieve all reservations made by a specific user.")
    @GetMapping("/user/{username}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUser(@PathVariable String username) {
        List<Reservation> reservations = reservationService.getReservationsByUser(username);
        List<ReservationDTO> reservationDTOs = reservations.stream()
                .map(ReservationDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(reservationDTOs);
    }

    // Create a reservation
    @Operation(summary = "Create a reservation", description = "Create a new reservation with the provided details.")
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation createdReservation = reservationService.createReservation(reservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ReservationDTO(createdReservation));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DuplicateReservationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getReservation());
        }
    }

    // Delete a reservation
    @Operation(summary = "Delete a reservation", description = "Cancel a reservation by its ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        boolean deleted = reservationService.deleteReservation(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Reservation canceled");
    }
}
