import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    
    Optional<Card> findByUserId(Long userId);
}