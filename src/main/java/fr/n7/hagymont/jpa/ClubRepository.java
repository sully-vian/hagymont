package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {

    List<Club> findByAddressContaining(String keyword);
}
