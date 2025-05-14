package fr.n7.hagymont.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Club;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {

    List<Club> findByAddressContaining(String keyword);
}
