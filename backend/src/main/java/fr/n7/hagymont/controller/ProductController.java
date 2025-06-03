package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.n7.hagymont.dto.ProductDTO;
import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET /products - récupérer tous les utilisateurs
    @GetMapping
    public List<ProductDTO> getAllUsers() {
        return productService.getAllProducts().stream().map(p -> new ProductDTO(p)).collect(Collectors.toList());
    }

    // GET /products/{id} - récupérer un produit par son id
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ProductDTO(product));
    }

    // GET /products/name?contains={chaine} - récupérer tous les produits contenant
    // une certaine chaine dans le name
    @GetMapping("/name")
    public ResponseEntity<List<ProductDTO>> getProductContaining(@RequestParam Map<String, String> customQuery) {
        String chaine = customQuery.get("contains");
        List<ProductDTO> products = productService.getProductsContaining(chaine)
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(products);
    }

    // POST /products - créer un nouveau produit
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> createProduct(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart("image") MultipartFile imageFile) {
        Product createdProduct = productService.createProduct(ProductDTO.fromDTO(productDTO));

        if (imageFile != null && !imageFile.isEmpty()) {
            productService.storeProductImage(createdProduct.getId(), imageFile);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new ProductDTO(createdProduct));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean delete = productService.deleteProductById(id);
        if (delete) {
            return ResponseEntity.ok(id + " has been deleted");
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") Map<String, Object> updates,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        Product updatedProduct = productService.updateProduct(id, updates);
        if (imageFile != null && !imageFile.isEmpty()) {
            productService.storeProductImage(updatedProduct.getId(), imageFile);
        }
        return ResponseEntity.ok(new ProductDTO(updatedProduct));
    }
}
