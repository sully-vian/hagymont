package fr.n7.hagymont.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.OneToMany;

@Entity
@JsonIdentityInfo(generator = PropertyGenerator.class, property = "id")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Category category;

    public enum Category {
        salsa,
        yoga,
        cardio_fit,
        zumba,
        step,
        pilates,
        natation,
        renforcement,
        cardio_yoga,
        strength_renforcement,
        yoga_morning,
        aqua_fit,
        machine_training,
        yoga_sunset,
        pilates_power,
        yoga_deep,
        machine_tone,
        boxing_kick,
        core_burn,
        yoga_sun,
        diving_intro,
        machine_strength,
        cardio_cycle,
        cardio_burn,
        pilates_milan,
        dance_italian_fit,
        machine_sculpt,
        crossfit_berlin,
        machine_core,
        pickleball_sport,
        cardio_royal,
        machine_focus,
        cardio_sunrise,
        machine_weight,
        yoga_wave,
        tennis_pro,
        golf_elite,
        pilates_private,
        yoga_beach,
        aqua_training,
        core_paddle,
        pickleball_elite,
        relax_spa
    }

    @Column(name = "startTime", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "endTime", nullable = false)
    private LocalDateTime endTime;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDateTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
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
