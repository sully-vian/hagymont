package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    Optional<Card> findByUserId(Long userId);
}
