package fr.n7.hagymont.repository;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByClubId(Long clubId);

    List<Room> findByType(String type);
}
