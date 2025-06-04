package fr.n7.hagymont.dto;

import java.util.List;
import java.util.stream.Collectors;

import fr.n7.hagymont.model.Club;
import lombok.Getter;

@Getter
public class ClubInfosDTO {

    /*
     * Json format :
     * 
     * {id,
     * name,
     * address,
     * rooms:[{id,
     * type}, ...]}
     */
    private Long id;
    private String name;
    private String address;
    private List<RoomDTO> rooms;

    public ClubInfosDTO() {
    }

    public ClubInfosDTO(Club club) {
        if (club == null) {
            return;
        }
        this.id = club.getId();
        this.name = club.getName();
        this.address = club.getAddress();
        this.rooms = club.getRooms().stream()
                .map(room -> new RoomDTO(room.getId(), room.getType()))
                .collect(Collectors.toList());
    }

    public static Club fromDTO(ClubInfosDTO clubDTO) {
        Club club = new Club();
        club.setId(clubDTO.id);
        club.setName(clubDTO.name);
        club.setAddress(clubDTO.address);
        return club;
    }

    @Getter
    public static class RoomDTO {

        private Long id;
        private String type;

        public RoomDTO() {
        }

        public RoomDTO(Long id, String type) {
            this.id = id;
            this.type = type;
        }
    }
}
