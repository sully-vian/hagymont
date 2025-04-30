package fr.n7.hagymont.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String name);

    List<Product> findByPriceBetween(double minPrice, double maxPrice);
}
