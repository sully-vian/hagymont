package fr.n7.hagymont.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoachUsername(String username);

    List<Course> findByCategory(Course.Category category);

    Optional<Course> findById(Long id);

    List<Course> findByPriceBetween(double minPrice, double maxPrice);

    List<Course> findByCategoryAndStartTimeAfter(Course.Category category, LocalDateTime startTime);

    List<Course> findByRoomClubId(Long clubId);
}
