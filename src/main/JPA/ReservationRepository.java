import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    List<Reservation> findByCardId(Long cardId);
    
    
    List<Reservation> findByCourseId(Long courseId);
    
    
    List<Reservation> findByParkingId(Long parkingId);
    
    
    List<Reservation> findByStatus(String status);
}