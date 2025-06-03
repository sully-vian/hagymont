package fr.n7.hagymont.dto;

import java.time.LocalDateTime;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Reservation;
import lombok.Getter;

@Getter
public class ReservationDTO {

    /*
     * Json format :
     *
     * {id,
     * category,
     * startTime,
     * endTime,
     * capacity,
     * price,
     * place:{type,
     * club,
     * address},
     * coach}
     */

    private Long id;
    private String user;
    private CourseDto course;
    private String status;

    public ReservationDTO(Reservation reservation) {
        if (reservation == null) {
            return;
        }
        this.id = reservation.getId();
        this.user = reservation.getUser().getUsername();
        this.course = new CourseDto(reservation.getCourse());
        this.status = reservation.getStatus().toString();
    }

    // @Getter a pas l'air de marcher
    public String getUser() {
        return this.user;
    }

    // @Getter a pas l'air de marcher
    public CourseDto getCourse() {
        return this.course;
    }

    public static Reservation fromDto(ReservationDTO dto) {
        Reservation reservation = new Reservation();
        reservation.setId(dto.id);
        reservation.setStatus(dto.status);
        return reservation;
    }

    @Getter
    public static class CourseDto {
        private Long id;
        private String category;
        private LocalDateTime startTime;
        private LocalDateTime endTime;

        public CourseDto() {
        }

        public CourseDto(Course course) {
            this.id = course.getId();
            this.category = course.getCategory().toString();
            this.startTime = course.getStartTime();
            this.endTime = course.getEndTime();
        }

        // @Getter a pas l'air de marcher
        public Long getId() {
            return this.id;
        }

    }
}
