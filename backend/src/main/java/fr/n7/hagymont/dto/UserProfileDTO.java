package fr.n7.hagymont.dto;

import java.time.LocalDate;

import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.User.UserGender;
import fr.n7.hagymont.model.User.UserType;

public class UserProfileDTO {

    /*
     * Json format :
     * 
     * {username,
     * firstname,
     * secondname,
     * gender,
     * type,
     * birthdate,
     * phone,
     * email,
     * cardStart,
     * cardEnd}
     */
    private String username;
    private String firstname;
    private String secondname;
    private String gender;
    private String type;
    private LocalDate birthdate;
    private String phone;
    private String email;
    private LocalDate cardStart;
    private LocalDate cardEnd;

    public UserProfileDTO(User user) {
        if (user == null) {
            return;
        }
        this.username = user.getUsername();
        this.firstname = user.getFirstname();
        this.secondname = user.getSecondname();
        this.gender = user.getGender() != null ? user.getGender().name() : null;
        this.type = user.getType() != null ? user.getType().name() : null;
        this.birthdate = user.getBirthdate();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.cardStart = user.getCardStart();
        this.cardEnd = user.getCardEnd();
    }

    public static User fromDTO(UserProfileDTO DTO) {
        User user = new User();
        user.setFirstname(DTO.firstname);
        user.setSecondname(DTO.secondname);
        user.setGender(UserGender.valueOf(DTO.gender));
        user.setType(UserType.valueOf(DTO.type));
        user.setBirthdate(DTO.birthdate);
        user.setPhone(DTO.phone);
        user.setEmail(DTO.email);
        user.setCardStart(DTO.cardStart);
        user.setCardEnd(DTO.cardEnd);
        return user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSecondname() {
        return secondname;
    }

    public void setSecondname(String secondName) {
        this.secondname = secondName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
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

    public void setEmail(String mail) {
        this.email = mail;
    }

    public LocalDate getCardStart() {
        return cardStart;
    }

    public void setCardStart(LocalDate cardStart) {
        this.cardStart = cardStart;
    }

    public LocalDate getCardEnd() {
        return cardEnd;
    }

    public void setCardEnd(LocalDate cardEnd) {
        this.cardEnd = cardEnd;
    }

}
