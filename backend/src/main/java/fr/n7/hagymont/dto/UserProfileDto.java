package fr.n7.hagymont.dto;

import java.time.LocalDate;

import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.User.UserGender;
import fr.n7.hagymont.model.User.UserType;

public class UserProfileDto {

    /* Json format :
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

    public UserProfileDto() {}

    public static UserProfileDto toDto(User user) {
        if (user==null){
            return null;
        }
        UserProfileDto dto  = new UserProfileDto();
        dto.username = user.getUsername();
        dto.firstname = user.getFirstname();
        dto.secondname = user.getSecondname();
        dto.gender = user.getGender() != null ? user.getGender().name() : null;
        dto.type = user.getType() != null ? user.getType().name() : null;
        dto.birthdate = user.getBirthdate();
        dto.phone = user.getPhone();
        dto.email = user.getEmail();
        dto.cardStart = user.getCardStart();
        dto.cardEnd = user.getCardEnd();
        return dto;
    }

    public static User fromDto(UserProfileDto dto) {
        User user = new User();
        user.setFirstname(dto.firstname);
        user.setSecondname(dto.secondname);
        user.setGender(UserGender.valueOf(dto.gender));
        user.setType(UserType.valueOf(dto.type));
        user.setBirthdate(dto.birthdate);
        user.setPhone(dto.phone);
        user.setEmail(dto.email);
        user.setCardStart(dto.cardStart);
        user.setCardEnd(dto.cardEnd);
        return user;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public String getSecondname() { return secondname; }
    public void setSecondname(String secondName) { this.secondname = secondName; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String mail) { this.email = mail; }
    public LocalDate getCardStart() { return cardStart; }
    public void setCardStart(LocalDate cardStart) { this.cardStart = cardStart; }
    public LocalDate getCardEnd() { return cardEnd; }
    public void setCardEnd(LocalDate cardEnd) { this.cardEnd = cardEnd; }

}
