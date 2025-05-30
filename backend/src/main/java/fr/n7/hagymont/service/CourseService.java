package fr.n7.hagymont.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.repository.CourseRepository;
import fr.n7.hagymont.repository.RoomRepository;
import fr.n7.hagymont.repository.UserRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Course> getCoursesByClubId(Long clubId) {
        return courseRepository.findByClubId(clubId);
    }

    // GET /courses - User consulte les cours disponibles (filtre)
    public List<Course> getAvailableCourses(String categoryName) {
        Course.Category category = Course.Category.valueOf(categoryName);
        if (category == null) {
            return List.of();
        }
        LocalDateTime now = LocalDateTime.now();
        return courseRepository.findByCategoryAndStartTimeAfter(category, now);
    }

    // GET /courses/coach/{coachUsername}- Coach consulte ses propres cours
    public List<Course> getCoursesByCoach(String username) {
        return courseRepository.findByCoachUsername(username);
    }

    // POST /courses - Coach crée un nouveau cours
    public Course createCourse(Course course) throws ResourceNotFoundException {
        // Vérifier si la salle et le coach existent
        String coachUsername = course.getCoach().getUsername();
        System.out.println(coachUsername);
        Long roomId = course.getRoom().getId();
        validateRoom(roomId);
        validateCoach(coachUsername);
        Optional<User> coachOpt = Optional.of(userRepository.findByUsername(coachUsername));
        User coach = coachOpt.orElseThrow(() -> new ResourceNotFoundException("Coach not found"));
        course.setCoach(coach);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + roomId));
        course.setRoom(room);

        return courseRepository.save(course);
    }

    // DELETE /courses/{id} - Coach supprime un cours
    public boolean deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // PATCH /courses/{id} - Coach modifie les informations d'un cours
    // Vérifier si la salle et le coach existent
    public Course updateCourse(Long id, Map<String, Object> updates) throws ResourceNotFoundException {
        Optional<Course> courseOptional = courseRepository.findById(id);
        Course course = courseOptional.orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            switch (key) {
                case "type":
                    course.setCategory(Course.Category.valueOf((String) value));
                    break;
                case "startTime":
                    course.setStartTime(LocalDateTime.parse((String) value));
                    break;
                case "endTime":
                    course.setEndTime(LocalDateTime.parse((String) value));
                    break;
                case "capacity":
                    course.setCapacity((Integer) value);
                    break;
                case "price":
                    course.setPrice((Double) value);
                    break;
                case "roomId":
                    Room room = roomRepository.findById((Long) value)
                            .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
                    course.setRoom(room);
                    break;
                case "coachUsername":
                    User coach = Optional.of(userRepository.findByUsername(value.toString()))
                            .orElseThrow(() -> new ResourceNotFoundException("Coach not found"));
                    if (coach.getType() != User.UserType.coach) {
                        throw new IllegalArgumentException("this user is not a coach");
                    }
                    course.setCoach(coach);
                    break;
            }
        }

        return courseRepository.save(course);
    }

    // Valider l'existence de la salle
    private void validateRoom(Long id) throws ResourceNotFoundException {
        if (!roomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Room not found with ID: " + id);
        }
    }

    // Valider l'existence du coach and son type
    private void validateCoach(String username) {
        User coach = userRepository.findByUsername(username);
        if (!(coach == null)) {
            if (coach.getType() != User.UserType.coach) {
                throw new IllegalArgumentException("this user is not a coach");
            }
        }
    }
}
