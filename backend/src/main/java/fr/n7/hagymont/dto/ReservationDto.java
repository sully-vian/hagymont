package fr.n7.hagymont.dto;

import java.time.LocalDateTime;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.model.Room;

public class ReservationDto {
    
    /* Json format :
     *
     * {id, 
     * category, 
     * startTime, 
     * endTime, 
     * capacity,
     * price,
     * place:{type,
     *   club, 
     *   address},
     * coach}
     */

    private Long id;
    private String user;
    private CourseDto course;
    private String status;

    public ReservationDto() {}

    public static ReservationDto toDto(Reservation reservation) {
        if (reservation==null){
            return null;
        }
        ReservationDto dto = new ReservationDto();
        dto.id = reservation.getId();
        dto.user = reservation.getUser().getUsername();
        dto.course = new CourseDto(reservation.getCourse());
        dto.status = reservation.getStatus().toString();
        return dto;
    }

    public static Reservation fromDto(ReservationDto dto) {
        Reservation reservation = new Reservation();
        reservation.setId(dto.id);
        reservation.setStatus(dto.status);
        return reservation;
    }

    public static class CourseDto {
        private Long id;
        private String category;
        private LocalDateTime startTime;
        private LocalDateTime endTime;

        public CourseDto() {}

        public CourseDto(Course course) {
            this.id = course.getId();
            this.category = course.getCategory().toString();
            this.startTime = course.getStartTime();
            this.endTime = course.getEndTime();
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public LocalDateTime getStartTime() { return startTime; }
        public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
        public LocalDateTime getEndTime() { return endTime; }
        public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public CourseDto getCourse() { return course; }
    public void setCourse(CourseDto course) { this.course = course; }
    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}

}
