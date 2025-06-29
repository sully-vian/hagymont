package fr.n7.hagymont.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.dto.CourseInfosDTO;
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

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByClubId(Long clubId) {
        return courseRepository.findByRoomClubId(clubId);
    }

    // Search courses, keyword matching for category/coach/room
    public List<Course> searchCourses(String query) {
        if (query == null || query.trim().isEmpty()) {
            return courseRepository.findAll();
        }
        String lowerQuery = query.toLowerCase().trim();
        return courseRepository.findAll().stream()
                .filter(course -> course.getCategory().name().toLowerCase().contains(lowerQuery)
                        || (course.getCoach() != null
                                && course.getCoach().getUsername().toLowerCase().contains(lowerQuery))
                        || (course.getRoom() != null && course.getRoom().getType().toLowerCase().contains(lowerQuery)))
                .toList();
    }

    // Filter future courses
    public List<Course> chooseCourses(String keyword) {
        LocalDateTime now = LocalDateTime.now();
        return searchCourses(keyword).stream()
                .filter(course -> course.getStartTime().isAfter(now))
                .toList();
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

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // POST /courses - Coach crée un nouveau cours
    public Course createCourse(CourseInfosDTO courseInfosDTO) throws ResourceNotFoundException {

        Room room = roomRepository.findById(courseInfosDTO.getPlace().getRoomId()).orElse(null);
        User coach = userRepository.findByUsername(courseInfosDTO.getCoachUsername());

        Course course = new Course();
        course.setCategory((courseInfosDTO.getCategory()));
        course.setStartTime(courseInfosDTO.getStartTime());
        course.setEndTime(courseInfosDTO.getEndTime());
        course.setCapacity(courseInfosDTO.getCapacity());
        course.setPrice(courseInfosDTO.getPrice());
        course.setRoom(room);
        course.setCoach(coach);

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
                case "type" ->
                    course.setCategory(Course.Category.valueOf((String) value));
                case "startTime" ->
                    course.setStartTime(LocalDateTime.parse((String) value));
                case "endTime" ->
                    course.setEndTime(LocalDateTime.parse((String) value));
                case "capacity" ->
                    course.setCapacity((Integer) value);
                case "price" ->
                    course.setPrice((Double) value);
                case "roomId" -> {
                    Room room = roomRepository.findById((Long) value)
                            .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
                    course.setRoom(room);
                }
                case "coachUsername" -> {
                    User coach = Optional.of(userRepository.findByUsername(value.toString()))
                            .orElseThrow(() -> new ResourceNotFoundException("Coach not found"));
                    if (coach.getType() != User.UserType.coach) {
                        throw new IllegalArgumentException("this user is not a coach");
                    }
                    course.setCoach(coach);
                }
            }
        }

        return courseRepository.save(course);
    }
}
