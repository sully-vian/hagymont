package fr.n7.hagymont.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.PropertyGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIdentityInfo(generator = PropertyGenerator.class, property = "id")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private LocalDate start_time;
    private LocalDate end_time;
    private Integer capacity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "room_id") // FK: room_id
    private Room room;

    @OneToMany(mappedBy = "course")
    private final List<Reservation> reservations = new ArrayList<>(); // Initialize the list

    @ManyToOne
    @JoinColumn(name = "coach_username", referencedColumnName = "username", nullable = false)
    private User coach;

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStartTime() {
        return start_time != null ? start_time.toString() : null;
    }

    public void setStarTime(String start_time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        this.start_time = LocalDate.parse(start_time, formatter);
    }

    public String getEndTime() {
        return end_time != null ? end_time.toString() : null;
    }

    public void setEndTime(String end_time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        this.end_time = LocalDate.parse(end_time, formatter);
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public User getCoach() {
        return coach;
    }

    public void setCoach(User coach) {
        this.coach = coach;
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

    public void addReservation(Reservation reservation) {
        reservations.add(reservation);
        reservation.setCourse(this); // set the course of the reservation to this course
    }

    public void removeReservation(Reservation reservation) {
        // remove the reservation from the list
        reservations.remove(reservation);
        reservation.setCourse(null);
    }

    public void clearReservations() {
        // remove the course from all reservations
        for (Reservation reservation : reservations) {
            reservation.setCourse(null);
        }
        reservations.clear();
    }

}
