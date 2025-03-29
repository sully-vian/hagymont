import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByClubId(Long clubId);
    

    List<Room> findByType(String type);
}