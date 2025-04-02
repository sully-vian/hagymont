package fr.n7.hagymont.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {

    Optional<Card> findByUser_Login(String userLogin);
}
