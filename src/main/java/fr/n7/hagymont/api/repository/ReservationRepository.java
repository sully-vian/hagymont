package fr.n7.hagymont.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.api.model.Reservation;

import java.util.List;

import jakarta.persistence.*;
import java.util.ArrayList;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByCardId(Long cardId);

    List<Reservation> findByCourseId(Long courseId);

    List<Reservation> findByParkingId(Long parkingId);

    List<Reservation> findByStatus(String status);
}
