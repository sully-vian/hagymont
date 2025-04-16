package fr.n7.hagymont.api.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    //one club have many rooms (1:N)
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();

    // one club have one parking (1:1)
    @OneToOne(
            mappedBy = "club",
            cascade = CascadeType.ALL,
            optional = true)//optional = true means that the parking can be null
    private Parking parking;

    public Club() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void addRoom(Room room) {
        rooms.add(room);
        room.setClub(this);
    }

    public void removeRoom(Room room) {
        rooms.remove(room);
        room.setClub(null);
    }

    public Parking getParking() {
        return parking;
    }

    public void setParking(Parking parking) {
        if (this.parking != null) {
            this.parking.setClub(null);
        }
        this.parking = parking;
        if (parking != null) {
            parking.setClub(this);
        }
    }
}
