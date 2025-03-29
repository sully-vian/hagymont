import java.util.List;

public interface ParkingRepository extends JpaRepository<Parking, Long> {
    
    List<Parking> findByClubId(Long clubId);
}