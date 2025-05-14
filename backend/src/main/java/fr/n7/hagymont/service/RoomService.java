package fr.n7.hagymont.service;

import fr.n7.hagymont.model.Room;
import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.repository.RoomRepository;
import fr.n7.hagymont.repository.ClubRepository;
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

    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId).orElse(null);
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

    public boolean deleteRoom(Long roomId) {
        if (roomRepository.existsById(roomId)) {
            roomRepository.deleteById(roomId);
            return true;
        }
        return false;
    }

    public Room updateRoom(Long roomId, Map<String, Object> updates) throws ResourceNotFoundException{
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
        
            switch (key) {
                case "type":
                    room.setType((String) value);
                    break;
                case "club": // FK
                    Long clubId = Long.valueOf((Integer) value);
                    Club club = clubRepository.findById(clubId)
                            .orElseThrow(() -> new ResourceNotFoundException("Club not found with ID: " + clubId));
                    room.setClub(club);
                    break;
                default:
                    break;
            }
        }

        return roomRepository.save(room);
    }
}
