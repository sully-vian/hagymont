import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCoachId(Long coachId);

    List<Course> findByRoomId(Long roomId);
    
    List<Course> findByType(String type);
}