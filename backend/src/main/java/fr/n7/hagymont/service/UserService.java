package fr.n7.hagymont.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.User.UserGender;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.model.User.UserType;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return Optional.of(userRepository.findByUsername(username)).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public boolean deleteUserByUsername(String username) {
        if (!userRepository.existsByUsername(username)) {
            return false;
        }
        userRepository.deleteByUsername(username);
        return true;
    }

    public User updateUser(String username, Map<String, Object> updates) {
        User user = Optional.of(userRepository.findByUsername(username)).orElse(null);
        if (user == null) {
            return null;
        }
        updates.forEach((key, value) -> {
            switch (key) {
                case "firstname":
                    user.setFirstname((String) value);
                    break;
                case "secondname":
                    user.setSecondname((String) value);
                    break;
                case "gender":
                    user.setGender(UserGender.valueOf((String) value));
                    break;
                case "type":
                    user.setType(UserType.valueOf((String) value));
                    break;
                case "birthdate":
                    user.setBirthdate(LocalDate.parse((String) value));
                    break;
                case "phone":
                    user.setPhone((String) value);
                    break;
                case "email":
                    user.setEmail((String) value);
                    break;
                case "password":
                    user.setPassword((String) value);
                    break;
                case "card_start":
                    user.setCardStart(LocalDate.parse((String) value));
                    break;
                case "card_end":
                    user.setCardEnd(LocalDate.parse((String) value));
                    break;
                // TODO: traiter les orders et les cours
                default:
                    break;
            }
        });

        return userRepository.save(user);
    }

}