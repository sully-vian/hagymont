package fr.n7.hagymont.service;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.repository.CourseRepository;
import fr.n7.hagymont.repository.RoomRepository;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    // GET /courses - User consulte les cours disponibles (filtre)
    public List<Course> getAvailableCourses(String type) {
        LocalDate now = LocalDate.now();
        return courseRepository.findByTypeAndStartTimeAfter(type, now);
    }

    // GET /courses/coach/{coachUsername}- Coach consulte ses propres cours
    public List<Course> getCoursesByCoach(String username) {
        return courseRepository.findByCoachUsername(username);
    }

    // POST /courses - Coach crée un nouveau cours
    public Course createCourse(Course course) throws ResourceNotFoundException {
        // Vérifier si la salle et le coach existent
        validateRoom(course.getRoom().getId());
        validateCoach(course.getCoach().getUsername());
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
    public Course updateCourse(Long id, Map<String, Object> updates) throws ResourceNotFoundException{
        Optional<Course> courseOptional = courseRepository.findById(id);
        Course course = courseOptional.orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
        
            switch (key) {
                case "type":
                    course.setType(value.toString());
                    break;
                case "startTime":
                    course.setStartTime(value.toString());
                    break;
                case "endTime":
                    course.setEndTime(value.toString());
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

    // Convertir une chaîne en LocalDate
    private LocalDate parseDate(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(dateStr, formatter);
    }

    // Valider l'existence de la salle 
    private void validateRoom(Long id) throws ResourceNotFoundException{
        if (!roomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Room not found with ID: " + id);
        }
    }

    // Valider l'existence du coach and son type
    private void validateCoach(String username) {
        User coach = userRepository.findByUsername(username);
        if (!(coach == null)){
            if (coach.getType() != User.UserType.coach) {
                throw new IllegalArgumentException("this user is not a coach");
            }
        }
    }
}
