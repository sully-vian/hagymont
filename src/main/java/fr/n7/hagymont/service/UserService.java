package fr.n7.hagymont.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.User.UserGender;
import fr.n7.hagymont.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findById(username).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUsername(String username, User user) {
        if (userRepository.existsById(username)) {
            return null;
        }
        user.setUsername(username);
        return userRepository.save(user);
    }

    public User updateGender(UserGender gender, User user) {
        user.setGender(gender);
        return userRepository.save(user);
    }

    public User updateType(fr.n7.hagymont.model.User.UserType type, User user) {
        user.setType(type);
        return userRepository.save(user);
    }

    public User updatePhone(String phone, User user) {
        user.setPhone(phone);
        return userRepository.save(user);
    }

    public User updateEmail(String email, User user) {
        user.setEmail(email);
        return userRepository.save(user);
    }

    public User updatePassword(String password, User user) {
        user.setPassword(password);
        return userRepository.save(user);
    }

    public boolean deleteUserByUsername(String username) {
        if (!userRepository.existsById(username)) {
            return false;
        }
        userRepository.deleteById(username);
        return true;
    }

}