package fr.n7.hagymont.service;

import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    public Club getClubById(Integer id) {
        return clubRepository.findById(id).orElse(null);
    }

    public List<Club> getAllClubs(String addressFilter) {
        if (addressFilter != null) {
            return clubRepository.findByAddressContaining(addressFilter);
        }
        return clubRepository.findAll();
    }

    public Club createClub(Club club) {
        return clubRepository.save(club);
    }

    public boolean deleteClub(Integer id) {
        if (clubRepository.existsById(id)) {
            clubRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Club updateClub(Integer id, Map<String, Object> updates) {
        Club club = clubRepository.findById(id).orElse(null);
        if (club != null) {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "name":
                        club.setName((String) value);
                        break;
                    case "address":
                        club.setAddress((String) value);
                        break;
                    case "parkingCapacity":
                        club.setParkingCapacity((Integer) value);
                        break;
                }
            });
            return clubRepository.save(club);
        }
        return null;
    }
}
