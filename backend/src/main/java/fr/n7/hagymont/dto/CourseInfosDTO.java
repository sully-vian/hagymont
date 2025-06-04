package fr.n7.hagymont.dto;

import java.time.LocalDateTime;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.model.Course.Category;

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
    private Category category;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer capacity;
    private Double price;
    private PlaceDTO place;
    private String coachUsername;

    public CourseInfosDTO() {
    }

    public CourseInfosDTO(Course course) {
        if (course == null) {
            return;
        }
        this.id = course.getId();
        this.category = course.getCategory();
        this.startTime = course.getStartTime();
        this.endTime = course.getEndTime();
        this.capacity = course.getCapacity();
        this.price = course.getPrice();
        this.place = new PlaceDTO(course.getRoom());
        this.coachUsername = course.getCoach().getUsername();
    }

    public static class PlaceDTO {
        private String type;
        private String club;
        private String address;
        private Long roomId;

        public PlaceDTO() {
        }

        public PlaceDTO(Room room) {
            this.type = room.getType();
            this.club = room.getClub().getName();
            this.address = room.getClub().getAddress();
            this.roomId = room.getId();
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

        public Long getRoomId() {
            return roomId;
        }

        public void setRoomId(Long roomId) {
            this.roomId = roomId;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
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

    public String getCoachUsername() {
        return coachUsername;
    }

    public void setCoachUsername(String coach) {
        this.coachUsername = coach;
    }
}
