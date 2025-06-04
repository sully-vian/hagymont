package fr.n7.hagymont.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Club;

public interface ClubRepository extends JpaRepository<Club, Long> {

    List<Club> findByAddressContaining(String address);

    List<Club> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(String queryName, String queryAddress);
}
