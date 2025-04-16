package fr.n7.hagymont.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.api.model.User;

public interface UserRepository extends JpaRepository<User, String> {

    List<User> findByType(User.UserType type);

    User findByUsername(String username);
}
