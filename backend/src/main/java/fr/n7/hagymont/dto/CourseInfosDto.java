package fr.n7.hagymont.dto;

import java.time.LocalDateTime;

import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.model.Room;

public class CourseInfosDto {
    
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
    private String category;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer capacity;
    private Double price;
    private PlaceDto place;
    private String coach;

    public CourseInfosDto() {}

    public static CourseInfosDto toDto(Course course) {
        CourseInfosDto dto = new CourseInfosDto();
        dto.id = course.getId();
        dto.category = course.getCategory().toString();
        dto.startTime = course.getStartTime();
        dto.endTime = course.getEndTime();
        dto.capacity = course.getCapacity();
        dto.price = course.getPrice();
        dto.place = new PlaceDto(course.getRoom());
        dto.coach = course.getCoach().getUsername();
        return dto;
    }

    public static Course fromDto(CourseInfosDto dto) {
        Course course = new Course();
        course.setId(dto.id);
        course.setCategory(Course.Category.valueOf(dto.category));
        course.setStartTime(dto.startTime);
        course.setEndTime(dto.endTime);
        course.setCapacity(dto.capacity);
        course.setPrice(dto.price);
        return course;
    }

    public static class PlaceDto {
        private String type;
        private String club;
        private String address;

        public PlaceDto() {}

        public PlaceDto(Room room) {
            this.type = room.getType();
            this.club = room.getClub().getName();
            this.address = room.getClub().getAddress();
        }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getClub() { return club; }
        public void setClub(String club) { this.club = club; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public PlaceDto getPlace() { return place; }
    public void setPlace(PlaceDto place) { this.place = place; }
    public String getCoach() { return coach; }
    public void setCoach(String coach) { this.coach = coach; }
}
