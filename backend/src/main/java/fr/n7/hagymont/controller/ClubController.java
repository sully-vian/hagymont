package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.ClubInfosDto;
import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.service.ClubService;

@RestController
@RequestMapping("/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping("/{id}")
    public ResponseEntity<ClubInfosDto> getClub(@PathVariable("id") Long clubId) {
        Club club = clubService.getClubById(clubId);
        return club != null ? ResponseEntity.ok(ClubInfosDto.toDto(club)) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<ClubInfosDto> getAllClubs(
            @RequestParam(required = false) String addressFilter) {
        return clubService.getAllClubs(addressFilter).stream().map(c -> ClubInfosDto.toDto(c)).collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<ClubInfosDto> searchClubs(@RequestParam(required = false) String query) {
        return clubService.searchClubs(query).stream().map(c -> ClubInfosDto.toDto(c)).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ClubInfosDto> createClub(@RequestBody ClubInfosDto club) {
        Club createdClub = clubService.createClub(ClubInfosDto.fromDto(club));
        return ResponseEntity.status(201).body(ClubInfosDto.toDto(createdClub));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClub(@PathVariable("id") Long clubId) {
        return clubService.deleteClub(clubId)
                ? ResponseEntity.ok("Club deleted")
                : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClubInfosDto> updateClub(
            @PathVariable("id") Long clubId,
            @RequestBody Map<String, Object> updates) {
        Club updatedClub = clubService.updateClub(clubId, updates);
        return updatedClub != null
                ? ResponseEntity.ok(ClubInfosDto.toDto(updatedClub))
                : ResponseEntity.notFound().build();
    }
}
