package fr.n7.hagymont.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.model.User;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser_Username(String username);

    Optional<Reservation> findByCourseIdAndUserUsername(Long courseId, String username);

    List<Reservation> findByid(Long id);

    List<Reservation> findByStatus(String status);

    boolean existsByUserAndCourse(User user, Course course);
}
