package fr.n7.hagymont.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.model.Product.Category;
import fr.n7.hagymont.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    public ProductRepository productRepository;
    private final String images_path;

    public ProductService() {
        this.images_path = "../frontend/src/assets/images";
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsContaining(String name) {
        return productRepository.findByNameContaining(name);
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
                    product.setPrice((Double) value);
                    break;
                case "stock":
                    product.setStock((Integer) value);
                    break;
                case "sizes":
                    product.setSizes((String) value);
                    break;
                case "colors":
                    product.setColors((String) value);
                    break;
                case "category":
                    product.setCategory((String) value);
                    break;
                default:
                    break;
            }
        });

        return productRepository.save(product);
    }


    public void storeProductImage(Long id, MultipartFile imageFile) {

         try {
            String filename = "product" + id + ".png";
            Path uploadPath = Paths.get(images_path);
            System.out.println(uploadPath.toAbsolutePath());
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store image file", e);
        }
    }


}