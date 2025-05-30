package fr.n7.hagymont.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoachUsername(String username);

    List<Course> findByCategory(Course.Category category);

    List<Course> findByPriceBetween(double minPrice, double maxPrice);

    List<Course> findByCategoryAndStartTimeAfter(Course.Category category, LocalDateTime startTime);

    @Query("SELECT c FROM Course c WHERE c.room.club.id = :clubId")
    List<Course> findByClubId(@Param("clubId") Long clubId);

}
