package fr.n7.hagymont.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    public ProductRepository productRepository;

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsContaining(String name) {
        return productRepository.findByNameContaining(name);
    }

    public List<Product> getProductsByPrice(int min, int max) {
        return productRepository.findByPriceBetween(min, max);
    }

    //Pour les admins
    
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public boolean deleteProductById(long id) {
        if (!productRepository.existsById(id)) {
            return false;
        }
        productRepository.deleteById(id);
        return true;
    }

    public Product updateProduct(Long id, Map<String, Object> updates) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return null;
        }
        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    product.setName((String) value);
                    break;
                case "description":
                    product.setDescription((String) value);
                    break;
                case "price":
                    product.setPrice(Double.valueOf((String) value));
                    break;
                case "stock":
                    product.setStock(Integer.valueOf((String) value));
                    break;
                default:
                    break;
            }
        });

        return productRepository.save(product);
    }


}