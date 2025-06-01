package fr.n7.hagymont.dto;

import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.model.Room;

import java.util.List;
import java.util.stream.Collectors;

public class ClubInfosDto {

    /* Json format :
     * 
     * {id,
     * name, 
     * address, 
     * rooms:[{id, 
     *   type}, ...]}
     */

    private Long id;
    private String name;
    private String address;
    private List<RoomDto> rooms;

    public ClubInfosDto() {}

    public static ClubInfosDto toDto(Club club) {
        ClubInfosDto dto = new ClubInfosDto();
        dto.id = club.getId();
        dto.name = club.getName();
        dto.address = club.getAddress();
        dto.rooms = club.getRooms().stream()
            .map(room -> new RoomDto(room.getId(), room.getType()))
            .collect(Collectors.toList());
        return dto;
    }

    public static Club fromDto(ClubInfosDto clubDto) {
        Club club = new Club();
        club.setId(clubDto.id);
        club.setName(clubDto.name);
        club.setAddress(clubDto.address);
        return club;
    }

    public static class RoomDto {
        private Long id;
        private String type;

        public RoomDto(Long id, String type) {
            this.id = id;
            this.type = type;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public List<RoomDto> getRooms() { return rooms; }
    public void setRooms(List<RoomDto> rooms) { this.rooms = rooms; }
}
