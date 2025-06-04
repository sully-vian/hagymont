package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import fr.n7.hagymont.dto.ClubInfosDTO;
import fr.n7.hagymont.model.Club;
import fr.n7.hagymont.service.ClubService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @Operation(summary = "Get club by ID", description = "Retrieve a club by its ID.")
    @GetMapping("/{id}")
    public ResponseEntity<ClubInfosDTO> getClub(@PathVariable Long id) {
        Club club = clubService.getClubById(id);
        if (club == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ClubInfosDTO(club));
    }

    @Operation(summary = "Get all clubs", description = "Retrieve a list of all clubs. If 'addressFilter' is provided, only clubs whose address contains the given value will be returned.")
    @GetMapping
    public ResponseEntity<List<ClubInfosDTO>> getAllClubs(
            @RequestParam(required = false) String addressFilter) {
        List<Club> clubs = clubService.getAllClubs(addressFilter);
        List<ClubInfosDTO> clubInfos = clubs.stream()
                .map(ClubInfosDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(clubInfos);
    }

    @Operation(summary = "Search clubs", description = "Search for clubs where the name or address contains the query.")
    @GetMapping("/search")
    public ResponseEntity<List<ClubInfosDTO>> searchClubs(@RequestParam(required = false) String query) {
        List<Club> clubs = clubService.searchClubs(query);
        List<ClubInfosDTO> clubInfos = clubs.stream()
                .map(ClubInfosDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(clubInfos);
    }

    @Operation(summary = "Create a new club", description = "Create a new club with the provided details.")
    @PostMapping
    public ResponseEntity<ClubInfosDTO> createClub(@RequestBody ClubInfosDTO club) {
        Club createdClub = clubService.createClub(ClubInfosDTO.fromDTO(club));
        return ResponseEntity.status(HttpStatus.CREATED).body(new ClubInfosDTO(createdClub));
    }

    @Operation(summary = "Delete a club", description = "Delete a club by its ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClub(@PathVariable Long id) {
        if (clubService.deleteClub(id)) {
            return ResponseEntity.ok("Club deleted");
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Update a club", description = "Update a club's details by its ID. Only the fields provided in the request body will be updated.")
    @PatchMapping("/{id}")
    public ResponseEntity<ClubInfosDTO> updateClub(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {
        Club updatedClub = clubService.updateClub(id, updates);
        if (updatedClub == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ClubInfosDTO(updatedClub));
    }
}
