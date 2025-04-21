package fr.n7.hagymont.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class User {

    @Id
    @Column(nullable = false, unique = true)
    private String username;

    private String firstname;
    private String secondname;

    @Enumerated(EnumType.STRING)
    private UserGender gender;

    public enum UserGender {
        M, F
    }

    @Enumerated(EnumType.STRING)
    private UserType type;

    public enum UserType {
        admin, classic, premium, coach
    }

    private LocalDate birthdate; // "yyyy-MM-dd"
    private String phone;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToOne(
            mappedBy = "user",
            cascade = CascadeType.ALL, // all operations on the user will be propagated to the card
            optional = true // true means that the user can exist without a card
    )
    private Card card;

    @OneToMany(mappedBy = "user")
    private List<PurchaseOrder> orders = new ArrayList<>();

    @OneToMany(mappedBy = "coach")
    private List<Course> coursesCreated = new ArrayList<>();

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

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public List<PurchaseOrder> getOrders() {
        return orders;
    }

    public void setOrders(List<PurchaseOrder> orders) {
        this.orders = orders;
    }

    public List<Course> getCoursesCreated() {
        return coursesCreated;
    }

    public void setCoursesCreated(List<Course> coursesCreated) {
        this.coursesCreated = coursesCreated;
    }

    public void addOrder(PurchaseOrder order) {
        orders.add(order);
        order.setUser(this); // set the user of the order to this user
    }

    public void removeOrder(PurchaseOrder order) {
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
