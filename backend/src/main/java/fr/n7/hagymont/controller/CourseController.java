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
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Operation(summary = "Get all courses", description = "Retrieve a list of all courses.")
    @GetMapping
    public ResponseEntity<List<CourseInfosDTO>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @Operation(summary = "Search courses", description = "Search for courses where the category, coach, or room contains the query.")
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
    @Operation(summary = "Choose courses", description = "Retrieve a list of future courses, optionally filtered by keyword.")
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

    @Operation(summary = "Get courses by club ID", description = "Retrieve a list of courses for a specific club.")
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

    @Operation(summary = "Get available courses by category", description = "Retrieve a list of available courses filtered by category.")
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

    @Operation(summary = "Get courses by coach username", description = "Retrieve a list of courses taught by a specific coach.")
    @GetMapping("/coach/{coachUsername}")
    public ResponseEntity<List<CourseInfosDTO>> getCoursesByCoach(@PathVariable String coachUsername) {
        List<Course> courses = courseService.getCoursesByCoach(coachUsername);
        List<CourseInfosDTO> courseInfos = courses.stream()
                .map(CourseInfosDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(courseInfos);
    }

    @Operation(summary = "Create a new course", description = "Create a new course with the provided details.")
    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody CourseInfosDTO courseInfosDTO) {
        try {
            courseService.createCourse(courseInfosDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(courseInfosDTO);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @Operation(summary = "Delete a course", description = "Delete a course by its ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        if (!courseService.deleteCourse(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Course deleted");
    }

    @Operation(summary = "Get course by ID", description = "Retrieve details of a specific course by its ID.")
    @GetMapping("/{id}")
    public ResponseEntity<CourseInfosDTO> getCourseById(@PathVariable Long id) {
        Optional<Course> courseOpt = courseService.getCourseById(id);
        if (courseOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new CourseInfosDTO(courseOpt.get()));
    }

    @Operation(summary = "Update a course", description = "Update an existing course with the provided details.")
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
