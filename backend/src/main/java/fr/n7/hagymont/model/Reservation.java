package fr.n7.hagymont.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.PropertyGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@JsonIdentityInfo(generator = PropertyGenerator.class, property = "id")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private LocalDate date;

    @Column(nullable = true)
    private Integer parking_space; // Integer et pas int pour pouvoir le mettre à null

    @ManyToOne
    @JoinColumn(name = "user_id", unique = true) // FK: card_id
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id") // FK: course_id
    private Course course;

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date != null ? date.toString() : null;
    }

    public void setDate(String date) {
        this.date = LocalDate.parse(date);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public Integer getParkingSpace() {
        return parking_space;
    }

    public void setParkingSpace(Integer parking_space) {
        this.parking_space = parking_space;
    }

    public void setCourse(Course course) {
        if (this.course != null) {
            this.course.getReservations().remove(this);
        }
        this.course = course;
        if (course != null) {
            course.getReservations().add(this);
        }
    }
}
