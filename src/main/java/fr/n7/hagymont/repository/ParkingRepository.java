package fr.n7.hagymont.repository;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Parking;

public interface ParkingRepository extends JpaRepository<Parking, Long> {

    List<Parking> findByClubId(Long clubId);
}
