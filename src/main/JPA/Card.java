import java.util.ArrayList;
import java.util.List;



@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String start_date;
    private String expiration_date;

   
    @OneToOne
    @JoinColumn(name = "user_id", unique = true) // FK: user_id
    private User user;  

    @OneToMany(mappedBy = "card")
    private final List<Reservation> reservations = new ArrayList<>(); // Initialize the list


    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return start_date;
    }

    public void setStartDate(String start_date) {
        this.start_date = start_date;
    }

    public String getExpirationDate() {
        return expiration_date;
    }

    public void setExpirationDate(String expiration_date) {
        this.expiration_date = expiration_date;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }
    public void addReservation(Reservation reservation) {
        reservations.add(reservation);
        reservation.setCard(this);
    }
    public void removeReservation(Reservation reservation) {
        reservations.remove(reservation);
        reservation.setCard(null);
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}




