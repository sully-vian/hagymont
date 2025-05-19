package fr.n7.hagymont.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.n7.hagymont.model.Club;

public interface ClubRepository extends JpaRepository<Club, Long> {

    List<Club> findByAddressContaining(String address);

    @Query("SELECT c FROM Club c WHERE "
            + "LOWER(c.name) LIKE LOWER(concat('%', :query, '%')) OR "
            + "LOWER(c.address) LIKE LOWER(concat('%', :query, '%'))")
    List<Club> searchClubs(@Param("query") String query);
}
