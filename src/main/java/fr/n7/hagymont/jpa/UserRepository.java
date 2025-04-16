package fr.n7.hagymont.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.User;

public interface UserRepository extends JpaRepository<User, String> {

    List<User> findByType(User.UserType type);

    User findByUsername(String username);
}
