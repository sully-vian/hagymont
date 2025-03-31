package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.Course;
import java.util.List;
import jakarta.persistence.*;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoachId(Long coachId);

    List<Course> findByRoomId(Long roomId);

    List<Course> findByType(String type);
}
