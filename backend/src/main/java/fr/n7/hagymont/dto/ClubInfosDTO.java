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

    public static Club fromDto(ClubInfosDTO clubDto) {
        Club club = new Club();
        club.setId(clubDto.id);
        club.setName(clubDto.name);
        club.setAddress(clubDto.address);
        return club;
    }

    @Getter
    public static class RoomDTO {
        private Long id;
        private String type;

        public RoomDTO(Long id, String type) {
            this.id = id;
            this.type = type;
        }
    }
}
