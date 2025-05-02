package fr.n7.hagymont.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.service.ClubService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    // GET /clubs/{id} - voir un club par son id
    @GetMapping("/{id}")
    public ResponseEntity<Club> getClub(@PathVariable Long clubId) {
        Club club = clubService.getClubById(clubId);
        if (club == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(club);
    }

    // GET /clubs - voir tous les clubs existants
    @GetMapping
    public List<Club> getAllClubs(
            @RequestParam(required = false) String addressFilter) {
        return clubService.getAllClubs(addressFilter);
    }

    // POST /clubs - Créer un nouveau club (nécessite des droits administrateur)
    @PostMapping
    public ResponseEntity<Club> createClub(@RequestBody Club club) {
        Club createdClub = clubService.createClub(club);
        return ResponseEntity.status(201).body(createdClub);
    }

    // DELETE /clubs/{id} - Supprimer le club (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClub(@PathVariable Long clubId) {
        boolean deleted = clubService.deleteClub(clubId);
        return deleted ? ResponseEntity.ok("Club deleted")
                : ResponseEntity.notFound().build();
    }

    // PATCH /clubs/{id} - Modifier les informations du club (admin)
    @PatchMapping("/{id}")
    public ResponseEntity<Club> updateClub(
            @PathVariable Long clubId,
            @RequestBody Map<String, Object> updates) {
        Club updatedClub = clubService.updateClub(clubId, updates);
        return updatedClub != null ? ResponseEntity.ok(updatedClub)
                : ResponseEntity.notFound().build();
    }
}
