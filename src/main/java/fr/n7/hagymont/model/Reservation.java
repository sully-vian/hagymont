package fr.n7.hagymont.model;

import fr.n7.hagymont.model.Card;
import fr.n7.hagymont.model.Course;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private LocalDate date;
    private double price;

    @ManyToOne
    @JoinColumn(name = "card_id", unique = true) // FK: card_id
    private Card card;

    @ManyToOne
    @JoinColumn(name = "course_id") // FK: course_id
    private Course course;

    @ManyToOne
    @JoinColumn(name = "parking_id") // FK: parking_id
    private Parking parking;

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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Course getCourse() {
        return course;
    }

    public Parking getParking() {
        return parking;
    }

    public void setParking(Parking parking) {
        this.parking = parking;
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
