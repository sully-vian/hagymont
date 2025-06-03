package fr.n7.hagymont.dto;

import java.util.List;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.User;
import lombok.Getter;
import lombok.Setter;

/**
 * Infos du cours du point de vue d'un coach
 */
@Getter
@Setter
public class CoachCourseDTO extends CourseInfosDTO {

    private List<UserDTO> users;

    public CoachCourseDTO(Course course) {
        super(course);
        this.users = course.getReservations().stream()
                .map(r -> new UserDTO(r.getUser()))
                .toList();
    }

    @Getter
    @Setter
    public static class UserDTO {

        private String username;
        private String firstName;
        private String lastName;
        private User.UserGender userGender;
        private User.UserType userType;

        public UserDTO(User user) {
            if (user == null) {
                return;
            }
            this.username = user.getUsername();
            this.firstName = user.getFirstname();
            this.lastName = user.getSecondname();
            this.userGender = user.getGender();
            this.userType = user.getType();
        }
    }
}
