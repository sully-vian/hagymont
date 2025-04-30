package fr.n7.hagymont.service;

import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ClubRepository clubRepository;  //FK

    public Room getRoomById(Integer roomId) {
        return roomRepository.findById(id).orElse(null);
    }

    public List<Room> getAllRooms(String typeFilter) {
        if (typeFilter != null) {
            return roomRepository.findByType(typeFilter);
        }
        return roomRepository.findAll();
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public boolean deleteRoom(Integer roomId) {
        if (roomRepository.existsById(roomId)) {
            roomRepository.deleteById(roomId);
            return true;
        }
        return false;
    }

    public Room updateRoom(Integer roomId, Map<String, Object> updates) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));
        updates.forEach((key, value) -> {
            switch (key) {
                case "type":
                    room.setType((String) value);
                    break;
                case "club"://FK
                    Integer clubId = (Integer) value;
                    Club club = clubRepository.findById(clubId)
                            .orElseThrow(() -> new ResourceNotFoundException("Club not found with ID: " + clubId));
                    room.setClub(club);
                    break;
                default:
                    break;
            }
        });

        return roomRepository.save(room);
    }
}
