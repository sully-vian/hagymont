package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.CourseInfosDTO;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.service.CourseService;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseInfosDTO>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CourseInfosDTO>> searchCourses(@RequestParam(required = false) String query) {
        List<Course> courses = courseService.searchCourses(query);
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    // choose courses just for future courses
    @GetMapping("/choose")
    public ResponseEntity<List<CourseInfosDTO>> chooseCourses(@RequestParam(required = false) String keyword) {
        List<Course> courses = courseService.chooseCourses(keyword);
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @GetMapping("/by-club/{clubId}")
    public ResponseEntity<List<CourseInfosDTO>> getCoursesByClubId(@PathVariable Long clubId) {
        List<Course> courses = courseService.getCoursesByClubId(clubId);
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @GetMapping("/available/{category}")
    public ResponseEntity<List<CourseInfosDTO>> getAvailableCourses(@PathVariable String category) {
        List<Course> courses = courseService.getAvailableCourses(category.toUpperCase());
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @GetMapping("/coach/{coachUsername}")
    public ResponseEntity<List<CourseInfosDTO>> getCoursesByCoach(@PathVariable String coachUsername) {
        List<Course> courses = courseService.getCoursesByCoach(coachUsername);
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        try {
            Course createdCourse = courseService.createCourse(course);
            return ResponseEntity.status(HttpStatus.CREATED).body(new CourseInfosDTO(createdCourse));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        if (!courseService.deleteCourse(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Course deleted");
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseInfosDTO> getCourseById(@PathVariable Long id) {
        Optional<Course> courseOpt = courseService.getCourseById(id);
        if (courseOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new CourseInfosDTO(courseOpt.get()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            Course updatedCourse = courseService.updateCourse(id, updates);
            return updatedCourse != null ? ResponseEntity.ok(new CourseInfosDTO(updatedCourse))
                    : ResponseEntity.notFound().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}
