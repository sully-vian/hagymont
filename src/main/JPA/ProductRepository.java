import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String name);
    

    List<Product> findByPriceBetween(double minPrice, double maxPrice);
}