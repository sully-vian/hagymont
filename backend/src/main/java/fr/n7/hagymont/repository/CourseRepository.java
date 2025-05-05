package fr.n7.hagymont.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoachUsername(String username);

    List<Course> findByid(Long id);

    List<Course> findByCategory(Course.Category category);

    List<Course> findByPriceBetween(double minPrice, double maxPrice);

    /**
     * équivalent à la requête suivante :
     *
     * <pre>
     * SELECT *
     * FROM Course
     * WHERE category = :category
     *     AND start_time > :startTime
     * </pre>
     */
    List<Course> findByCategoryAndStartTimeAfter(Course.Category category, LocalDateTime startTime);

}
