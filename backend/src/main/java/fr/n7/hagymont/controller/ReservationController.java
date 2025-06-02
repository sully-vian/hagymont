package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.service.ReservationService;
import fr.n7.hagymont.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import fr.n7.hagymont.dto.ReservationDto;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Récupérer toutes les réservations
    @GetMapping
    public List<ReservationDto> getAllReservations() {
        return reservationService.getAllReservations().stream().map(r -> ReservationDto.toDto(r)).collect(Collectors.toList());
    }

    // Récupérer les réservations d'un utilisateur
    @GetMapping("/user/{username}")
    public List<ReservationDto> getReservationsByUser(@PathVariable String username) {
        //try {
        return reservationService.getReservationsByUser(username).stream().map(r -> ReservationDto.toDto(r)).collect(Collectors.toList());
        //} catch (ResourceNotFoundException ex) {
        //    return ResponseEntity.status(404).body(ex.getMessage());
        //}
        
    }

    // Créer une réservation
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDto reservation) {
        try {
            Reservation createdReservation = reservationService.createReservation(reservation);
            return ResponseEntity.status(201).body(ReservationDto.toDto(createdReservation));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
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
