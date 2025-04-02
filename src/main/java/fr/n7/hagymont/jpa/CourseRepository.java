package fr.n7.hagymont.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCoach_Login(String coachLogin);

    List<Course> findByRoomId(Long roomId);

    List<Course> findByType(String type);
}
