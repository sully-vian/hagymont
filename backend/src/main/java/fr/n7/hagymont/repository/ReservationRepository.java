package fr.n7.hagymont.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.Course;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser_Username(String username);

    List<Reservation> findByid(Long id);

    List<Reservation> findByStatus(String status);

    boolean existsByUserAndCourse(User user, Course course);
}
