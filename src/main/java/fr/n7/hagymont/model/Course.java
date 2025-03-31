package fr.n7.hagymont.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private LocalDate date;
    private String start_time;
    private String end_time;

    @ManyToOne
    @JoinColumn(name = "room_id") //FK: room_id
    private Room room;

    @OneToMany(mappedBy = "course")
    private final List<Reservation> reservations = new ArrayList<>(); // Initialize the list

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)  // 外键不可空
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

    public String getDate() {
        return date != null ? date.toString() : null;
    }

    public void setDate(String date) {
        this.date = LocalDate.parse(date);
    }

    public String getStartTime() {
        return start_time;
    }

    public void setStarTime(String start_time) {
        this.start_time = start_time;
    }

    public String getEndTime() {
        return end_time;
    }

    public void setEndTime(String end_time) {
        this.end_time = end_time;
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
