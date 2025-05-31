package fr.n7.hagymont.dto;

import java.time.LocalDate;

import fr.n7.hagymont.model.User;

public class UserProfileDto {

    private String username;
    private String firstname;
    private String secondName;
    private String gender;
    private String type;
    private LocalDate birthdate;
    private String phone;
    private String mail;
    private LocalDate cardStart;
    private LocalDate cardEnd;

    private UserProfileDto(String username, String firstname, String secondName, String gender, String type, LocalDate birthdate, String phone, String mail, LocalDate cardStart, LocalDate cardEnd) {
        this.username = username;
        this.firstname = firstname;
        this.secondName = secondName;
        this.gender = gender;
        this.type = type;
        this.birthdate = birthdate;
        this.phone = phone;
        this.mail = mail;
        this.cardStart = cardStart;
        this.cardEnd = cardEnd;
    }

    public static UserProfileDto toDto(User user) {
        return new UserProfileDto(user.getUsername(), user.getFirstname(), user.getSecondname(), user.getGender().toString(), user.getType().toString(), user.getBirthdate(), user.getPhone(), user.getEmail(), user.getCardStart(), user.getCardEnd());
    }
}
