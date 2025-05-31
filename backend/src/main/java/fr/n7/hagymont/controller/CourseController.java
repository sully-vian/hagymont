package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

import fr.n7.hagymont.dto.CourseInfosDto;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.service.CourseService;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseInfosDto> getAllCourses() {
        return courseService.getAllCourses().stream().map(c -> CourseInfosDto.toDto(c)).collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<CourseInfosDto> searchCourses(@RequestParam(required = false) String query) {
        return courseService.searchCourses(query).stream().map(c -> CourseInfosDto.toDto(c)).collect(Collectors.toList());
    }

    // choose courses just for future courses
    @GetMapping("/choose")
    public List<CourseInfosDto> chooseCourses(@RequestParam(required = false) String keyword) {
        return courseService.chooseCourses(keyword).stream().map(c -> CourseInfosDto.toDto(c)).collect(Collectors.toList());
    }

    @GetMapping("/by-club/{clubId}")
    public ResponseEntity<List<CourseInfosDto>> getCoursesByClubId(@PathVariable Long clubId) {
        List<Course> courses = courseService.getCoursesByClubId(clubId);
        return ResponseEntity.ok(courses.stream().map(c -> CourseInfosDto.toDto(c)).collect(Collectors.toList()));
    }

    @GetMapping("/available/{category}")
    public ResponseEntity<?> getAvailableCourses(@PathVariable String category) {
        List<Course> courses = courseService.getAvailableCourses(category.toUpperCase());
        if (courses.isEmpty()) {
            return ResponseEntity.status(404).body("No available courses found for category: " + category);
        }
        return ResponseEntity.ok(courses.stream().map(c -> CourseInfosDto.toDto(c)).collect(Collectors.toList()));
    }

    @GetMapping("/coach/{coachUsername}")
    public List<CourseInfosDto> getCoursesByCoach(@PathVariable String coachUsername) {
        return courseService.getCoursesByCoach(coachUsername).stream().map(c -> CourseInfosDto.toDto(c)).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        try {
            Course createdCourse = courseService.createCourse(course);
            return ResponseEntity.status(201).body(CourseInfosDto.toDto(createdCourse));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        return deleted ? ResponseEntity.ok("Course deleted") : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            Course updatedCourse = courseService.updateCourse(id, updates);
            return updatedCourse != null ? ResponseEntity.ok(CourseInfosDto.toDto(updatedCourse)) : ResponseEntity.notFound().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }
}
