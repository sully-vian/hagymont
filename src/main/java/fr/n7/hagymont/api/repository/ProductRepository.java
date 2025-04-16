package fr.n7.hagymont.api.repository;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.api.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String name);

    List<Product> findByPriceBetween(double minPrice, double maxPrice);
}
