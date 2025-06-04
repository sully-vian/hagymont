package fr.n7.hagymont.dto;

import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.model.Room;
import lombok.Getter;

@Getter
public class RoomDTO {

    private Long id;
    private String type;
    private ClubDTO club;

    public RoomDTO() {
    }

    public RoomDTO(Room room) {
        if (room == null) {
            return;
        }
        this.id = room.getId();
        this.type = room.getType();
        this.club = new ClubDTO(room.getClub());
    }

    @Getter
    public static class ClubDTO {

        private Long id;
        private String name;
        private String address;

        public ClubDTO() {
        }

        public ClubDTO(Club club) {
            if (club == null) {
                return;
            }
            this.id = club.getId();
            this.name = club.getName();
            this.address = club.getAddress();
        }
    }

}
