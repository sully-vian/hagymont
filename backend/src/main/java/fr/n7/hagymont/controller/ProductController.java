package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.ProductDto;
import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET /products - récupérer tous les utilisateurs
    @GetMapping
    public List<ProductDto> getAllUsers() {
        return productService.getAllProducts().stream().map(p -> ProductDto.toDto(p)).collect(Collectors.toList());
    }

    // GET /products/{id} - récupérer un produit par son id
    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return product==null ? null : ProductDto.toDto(product);
    }

    // GET /products/name?contains={chaine} - récupérer tous les produits contenant une certaine chaine dans le name
    @GetMapping("/name")
    public List<ProductDto> getProductContaining(@RequestParam Map<String, String> customQuery) {
        String chaine = customQuery.get("contains");
        return productService.getProductsContaining(chaine).stream().map(p -> ProductDto.toDto(p)).collect(Collectors.toList());
    }


    // POST /products - créer un nouveau produit
    @PostMapping
    public ResponseEntity<ProductDto> createUser(@RequestBody ProductDto productDto) {
        Product createdProduct = productService.createProduct(ProductDto.fromDto(productDto));
        return ResponseEntity.status(201).body(ProductDto.toDto(createdProduct));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean delete = productService.deleteProductById(id);
        if (delete) {
            return ResponseEntity.ok(id + " has been deleted");
        }
        return ResponseEntity.status(404).body(id + " has not been found");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductDto> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Product updatedProduct = productService.updateProduct(id, updates);
        return ResponseEntity.status(200).body(ProductDto.toDto(updatedProduct));
    }
}