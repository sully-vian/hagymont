import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByType(User.UserType type);
    User findByEmail(String email); 
    User findByLogin(String login);
}


