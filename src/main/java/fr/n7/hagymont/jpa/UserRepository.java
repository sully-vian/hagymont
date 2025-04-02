package fr.n7.hagymont.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByType(User.UserType type);

    User findByEmail(String email);

    User findByLogin(String login);
}
