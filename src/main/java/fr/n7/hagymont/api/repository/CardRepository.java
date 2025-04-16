package fr.n7.hagymont.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.api.model.Card;

public interface CardRepository extends JpaRepository<Card, String> {

    Optional<Card> findByUser_Username(String username);
}
