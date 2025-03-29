import java.util.ArrayList;
import java.util.List;


@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;

    @ManyToOne
    @JoinColumn(name = "club_id", unique = true) // FK: club_id
    private Club club;

    @OneToMany(mappedBy = "room") // 1 room can have many courses
    private final List<Course> courses = new ArrayList<>();  // Initialize the list 


    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Club getClub() {
        return club;
    }
    public void setClub(Club club) {
        this.club = club;
    }
    public List<Course> getCourses() {
        return courses;
    }

    public void addCourse(Course course) {
        courses.add(course);
        course.setRoom(this);
    }

    public void removeCourse(Course course) {
        courses.remove(course);
        course.setRoom(null);
    } 

}