package fr.n7.hagymont.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.PropertyGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Entity
@JsonIdentityInfo(generator = PropertyGenerator.class, property = "username")
public class User {

    @Id
    @Column(nullable = false, unique = true)
    private String username;

    private String firstname;
    private String secondname;

    @Enumerated(EnumType.STRING)
    private UserGender gender;

    public enum UserGender {
        M, F, N
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType type;

    public enum UserType {
        admin, classic, premium, coach
    }

    //@Column(nullable = false)
    private LocalDate birthdate; // "yyyy-MM-dd"
    private String phone;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "card_start")
    private LocalDate cardStart;

    @Column(name = "card_end")
    private LocalDate cardEnd;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<OrderBasket> orders = new ArrayList<>();

    @OneToMany(mappedBy = "coach")
    private List<Course> coursesCreated = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();
    // Getters and setters
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSecondname() {
        return secondname;
    }

    public void setSecondname(String secondname) {
        this.secondname = secondname;
    }

    public UserGender getGender() {
        return gender;
    }

    public void setGender(UserGender gender) {
        this.gender = gender;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getCardEnd() {
        return cardEnd;
    }

    public void setCardEnd(LocalDate cardEnd) {
        this.cardEnd = cardEnd;
    }

    public LocalDate getCardStart() {
        return cardStart;
    }

    public void setCardStart(LocalDate cardStart) {
        this.cardStart = cardStart;
    }

    public List<OrderBasket> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderBasket> orders) {
        this.orders = orders;
    }

    public List<Course> getCoursesCreated() {
        return coursesCreated;
    }

    public void setCoursesCreated(List<Course> coursesCreated) {
        this.coursesCreated = coursesCreated;
    }

    public void addOrder(OrderBasket order) {
        orders.add(order);
        order.setUser(this); // set the user of the order to this user
    }

    public void removeOrder(OrderBasket order) {
        orders.remove(order);
        order.setUser(null); // set the user of the order to null
    }

    public void addCourseCreated(Course course) {
        coursesCreated.add(course);
        course.setCoach(this); // set the coach of the course to this user
    }

    public void removeCourseCreated(Course course) {
        coursesCreated.remove(course);
        course.setCoach(null); // set the coach of the course to null
    }

    public void clearCoursesCreated() {
        for (Course course : coursesCreated) {
            course.setCoach(null); // set the coach of the course to null
        }
        coursesCreated.clear();
    }

}
