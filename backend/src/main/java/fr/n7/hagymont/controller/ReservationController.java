package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.service.ReservationService;
import fr.n7.hagymont.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import fr.n7.hagymont.dto.ReservationDTO;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Récupérer toutes les réservations
    @GetMapping
    public List<ReservationDTO> getAllReservations() {
        return reservationService.getAllReservations().stream().map(r -> new ReservationDTO(r)).collect(Collectors.toList());
    }

    // Récupérer les réservations d'un utilisateur
    @GetMapping("/user/{username}")
    public List<ReservationDTO> getReservationsByUser(@PathVariable String username) {
        //try {
        return reservationService.getReservationsByUser(username).stream().map(r -> new ReservationDTO(r)).collect(Collectors.toList());
        //} catch (ResourceNotFoundException ex) {
        //    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        //}
        
    }

    // Créer une réservation
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservation) {
        try {
            Reservation createdReservation = reservationService.createReservation(reservation);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ReservationDTO(createdReservation));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        boolean deleted = reservationService.deleteReservation(id);
        return deleted
                ? ResponseEntity.ok("Reservation canceled")
                : ResponseEntity.notFound().build();
    }
}
