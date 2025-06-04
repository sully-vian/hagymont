package fr.n7.hagymont.dto;

import java.time.LocalDateTime;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Room;

public class CourseInfosDTO {

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
    private String category;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer capacity;
    private Double price;
    private PlaceDTO place;
    private String coach;

    public CourseInfosDTO() {
    }

    public CourseInfosDTO(Course course) {
        if (course == null) {
            return;
        }
        this.id = course.getId();
        this.category = course.getCategory().toString();
        this.startTime = course.getStartTime();
        this.endTime = course.getEndTime();
        this.capacity = course.getCapacity();
        this.price = course.getPrice();
        this.place = new PlaceDTO(course.getRoom());
        this.coach = course.getCoach().getUsername();
    }

    public static Course fromDto(CourseInfosDTO dto) {
        Course course = new Course();
        course.setId(dto.id);
        course.setCategory(Course.Category.valueOf(dto.category));
        course.setStartTime(dto.startTime);
        course.setEndTime(dto.endTime);
        course.setCapacity(dto.capacity);
        course.setPrice(dto.price);
        return course;
    }

    public static class PlaceDTO {
        private String type;
        private String club;
        private String address;

        public PlaceDTO() {
        }

        public PlaceDTO(Room room) {
            this.type = room.getType();
            this.club = room.getClub().getName();
            this.address = room.getClub().getAddress();
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getClub() {
            return club;
        }

        public void setClub(String club) {
            this.club = club;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
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

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public PlaceDTO getPlace() {
        return place;
    }

    public void setPlace(PlaceDTO place) {
        this.place = place;
    }

    public String getCoach() {
        return coach;
    }

    public void setCoach(String coach) {
        this.coach = coach;
    }
}
