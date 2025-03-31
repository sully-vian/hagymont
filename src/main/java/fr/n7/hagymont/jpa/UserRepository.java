package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.User;
import jakarta.persistence.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByType(User.UserType type);

    User findByEmail(String email);

    User findByLogin(String login);
}
