package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.Room;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByClubId(Long clubId);

    List<Room> findByType(String type);
}
