package fr.n7.hagymont.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.repository.ClubRepository;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    public Club getClubById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }

    public List<Club> getAllClubs(String addressFilter) {
        if (addressFilter != null) {
            return clubRepository.findByAddressContaining(addressFilter);
        }
        return clubRepository.findAll();
    }

    public List<Club> searchClubs(String query) {
        if (query == null || query.trim().isEmpty()) {
            return clubRepository.findAll();
        }
        String searchTerm = query.toLowerCase().trim();
        return clubRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(searchTerm, searchTerm);
    }

    public Club createClub(Club club) {
        return clubRepository.save(club);
    }

    public boolean deleteClub(Long id) {
        if (clubRepository.existsById(id)) {
            clubRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Club updateClub(Long id, Map<String, Object> updates) {
        Club club = clubRepository.findById(id).orElse(null);
        if (club != null) {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "name" ->
                        club.setName((String) value);
                    case "address" ->
                        club.setAddress((String) value);
                    case "parkingCapacity" ->
                        club.setParkingCapacity((Integer) value);
                }
            });
            return clubRepository.save(club);
        }
        return null;
    }
}
