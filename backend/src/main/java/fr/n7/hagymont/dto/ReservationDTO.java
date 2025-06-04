package fr.n7.hagymont.dto;

import java.time.LocalDateTime;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Reservation;

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
    private CourseDTO course;
    private String status;

    public ReservationDTO() {
    }

    public ReservationDTO(Reservation reservation) {
        if (reservation == null) {
            return;
        }
        this.id = reservation.getId();
        this.user = reservation.getUser().getUsername();
        this.course = new CourseDTO(reservation.getCourse());
        this.status = reservation.getStatus().toString();
    }

    public static Reservation fromDto(ReservationDTO dto) {
        Reservation reservation = new Reservation();
        reservation.setId(dto.id);
        reservation.setStatus(dto.status);
        return reservation;
    }

    public static class CourseDTO {

        private Long id;
        private String category;
        private LocalDateTime startTime;
        private LocalDateTime endTime;

        public CourseDTO() {
        }

        public CourseDTO(Course course) {
            this.id = course.getId();
            this.category = course.getCategory().toString();
            this.startTime = course.getStartTime();
            this.endTime = course.getEndTime();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public LocalDateTime getStartTime() {
            return startTime;
        }

        public void setStartTime(LocalDateTime startTime) {
            this.startTime = startTime;
        }

        public LocalDateTime getEndTime() {
            return endTime;
        }

        public void setEndTime(LocalDateTime endTime) {
            this.endTime = endTime;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
