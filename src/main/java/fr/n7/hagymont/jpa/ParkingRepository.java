package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.Parking;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingRepository extends JpaRepository<Parking, Long> {

    List<Parking> findByClubId(Long clubId);
}
