package fr.n7.hagymont.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import fr.n7.hagymont.model.Reservation;
import jakarta.persistence.*;
import java.util.ArrayList;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByCardId(Long cardId);

    List<Reservation> findByCourseId(Long courseId);

    List<Reservation> findByParkingId(Long parkingId);

    List<Reservation> findByStatus(String status);
}
