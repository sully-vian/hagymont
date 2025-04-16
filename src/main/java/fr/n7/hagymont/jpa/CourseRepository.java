package fr.n7.hagymont.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, String> {

    List<Course> findByCoachUsername(String username);

    List<Course> findByRoomId(Long roomId);

    List<Course> findByType(String type);
}
