package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET /products - récupérer tous les utilisateurs
    @GetMapping
    public List<Product> getAllUsers() {
        return productService.getAllProducts();
    }

    // GET /products/{id} - récupérer un produit par son id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // GET /products/name?contains={chaine} - récupérer tous les produits contenant une certaine chaine dans le name
    @RequestMapping(method = RequestMethod.GET, value = "/name")
    public List<Product> getProductContaining(@RequestParam Map<String, String> customQuery) {
        String chaine = customQuery.get("contains");
        return productService.getProductsContaining(chaine);
    }

    // GET /products?min={val1}&max={val2} - récupérer tous les produits contenant une certaine chaine dans le name
    @RequestMapping(method = RequestMethod.GET, value = "/price")
    public List<Product> getProductsByPrice(@RequestParam Map<String, String> customQuery) {
        int min = Integer.parseInt(customQuery.get("min"));
        int max = Integer.parseInt(customQuery.get("max"));
        return productService.getProductsByPrice(min, max);
    }

    // POST /products - créer un nouveau produit
    @PostMapping
    public ResponseEntity<Product> createUser(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(201).body(createdProduct);
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
    public ResponseEntity<Product> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Product updatedProduct = productService.updateProduct(id, updates);
        return ResponseEntity.status(200).body(updatedProduct);
    }
}