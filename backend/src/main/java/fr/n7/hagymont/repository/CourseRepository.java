package fr.n7.hagymont.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoachUsername(String username);

    List<Course> findByid(Long id);

    List<Course> findByType(String type);

    List<Course> findByPriceBetween(double minPrice, double maxPrice);

    @Query("SELECT c FROM Course c WHERE "
            + "(:type IS NULL OR c.type = :type) AND "
            + "c.start_time >= :currentDate "
            + "ORDER BY c.start_time ASC")
    List<Course> findByTypeAndStartTimeAfter( 
            @Param("type") String type,
            @Param("currentDate") LocalDate currentDate);
    

}
