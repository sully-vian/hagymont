package fr.n7.hagymont.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoachUsername(String username);

    List<Course> findByCategory(Course.Category category);

    @Query("SELECT c FROM Course c JOIN FETCH c.room r JOIN FETCH r.club JOIN FETCH c.coach WHERE c.id = :id")
    Optional<Course> findCourseWithDetailsById(@Param("id") Long id);

    List<Course> findByPriceBetween(double minPrice, double maxPrice);

    List<Course> findByCategoryAndStartTimeAfter(Course.Category category, LocalDateTime startTime);

    @Query("SELECT c FROM Course c WHERE c.room.club.id = :clubId")
    List<Course> findByClubId(@Param("clubId") Long clubId);

}
