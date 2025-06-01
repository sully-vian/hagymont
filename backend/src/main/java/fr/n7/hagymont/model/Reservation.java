package fr.n7.hagymont.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.PropertyGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    public enum Status {
        confirmed, cancelled
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate date;

    @Column(name = "num_parking_spaces", nullable = false)
    private Integer numParkingSpaces;

    @ManyToOne
    @JoinColumn(name = "course_id") // FK: course_id
    private Course course;

    @ManyToOne
    @JoinColumn(name = "user_id") // FK: user_id
    private User user;

    public Status getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = Status.valueOf(status);
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getNumParkingSpaces() {
        return numParkingSpaces;
    }

    public void setNumParkingSpaces(Integer numParkingSpaces) {
        this.numParkingSpaces = numParkingSpaces;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
