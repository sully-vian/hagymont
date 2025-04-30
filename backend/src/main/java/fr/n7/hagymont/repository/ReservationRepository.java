package fr.n7.hagymont.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Reservation;

import java.util.List;

import jakarta.persistence.*;
import java.util.ArrayList;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser_Username(String username);

    List<Reservation> findByid(Long id);

    List<Reservation> findByStatus(String status);

    boolean existsByUserAndCourse(User user, Course course);
}
