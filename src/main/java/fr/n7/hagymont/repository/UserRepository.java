package fr.n7.hagymont.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.User;

public interface UserRepository extends JpaRepository<User, String> {

    List<User> findByType(User.UserType type);

    User findByUsername(String username);
}
