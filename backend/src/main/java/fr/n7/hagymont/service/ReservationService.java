package fr.n7.hagymont.service;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.repository.ReservationRepository;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.repository.CourseRepository;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    // Récupérer toutes les réservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Récupérer les réservations d'un utilisateur
    public List<Reservation> getReservationsByUser(String username) {//throws ResourceNotFoundException{
        return reservationRepository.findByUser_Username(username);//.orElseThrow(() -> new ResourceNotFoundException("User not found"));;
    }

    // Créer une réservation
    public Reservation createReservation(Reservation reservation) throws ResourceNotFoundException {
        // Valider l'existence de l'utilisateur et du cours
        String username = reservation.getUser().getUsername();
        User user = Optional.of(userRepository.findByUsername(username))
                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Long courseId = reservation.getCourse().getId();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        // Vérifier si l'utilisateur a déjà réservé ce cours (contrainte unique)
        if (reservationRepository.existsByUserAndCourse(user, course)) {
            throw new IllegalStateException("Reservation already exists");
        }

        // Vérifier la capacité du cours
        if (course.getReservations().size() >= course.getCapacity()) {
            throw new IllegalStateException("course is full");
        }

        // Enregistrer la réservation
        reservation.setUser(user);
        reservation.setCourse(course);
        return reservationRepository.save(reservation);
    }

    // Supprimer une réservation
    public boolean deleteReservation(Long id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
