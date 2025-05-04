package fr.n7.hagymont.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.service.CourseService;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // GET /courses - User consulte les cours disponibles (filtre)
    @GetMapping("/available")
    public List<Course> getAvailableCourses(
            @RequestParam(required = false) String typeFilter) {
        return courseService.getAvailableCourses(typeFilter);
    }

    // GET /courses/coach/{coachUsername} - Coach consulte ses propres cours
    @GetMapping("/coach/{coachUsername}")
    public List<Course> getCoursesByCoach(
            @PathVariable String coachUsername) {
        return courseService.getCoursesByCoach(coachUsername);
    }

    // POST /courses - Coach crée un nouveau cours
    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        try {
            Course createdCourse = courseService.createCourse(course);
            return ResponseEntity.status(201).body(createdCourse);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    // DELETE /courses/{id} - Coach supprime un cours
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        return deleted ? ResponseEntity.ok("Course deleted")
                : ResponseEntity.notFound().build();
    }

    // PATCH /courses/{id} - Coach modifie les informations d'un cours
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateCourse(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {     
        try {
            Course updatedCourse = courseService.updateCourse(id, updates);
            return updatedCourse != null
            ? ResponseEntity.ok(updatedCourse)
            : ResponseEntity.notFound().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }
}
