import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {

    List<Club> findByAdressContaining(String keyword);
}