package fr.n7.hagymont.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.dto.BasketDTO;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.service.OrderBasketService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/baskets")
public class OrderBasketController {

    @Autowired
    private OrderBasketService orderBasketService;

    // POST /baskets - Créer un nouveau panier
    @Operation(summary = "Create a new order basket", description = "Creates a new order basket for a user.")
    @PostMapping("/add/{username}")
    public ResponseEntity<BasketDTO> createOrderBasket(@RequestBody String username) {
        OrderBasket createdBasket = orderBasketService.createOrderBasket(username);
        return createdBasket != null
                ? ResponseEntity.ok(new BasketDTO(createdBasket))
                : ResponseEntity.notFound().build();
    }

    // GET /baskets/all/{username} - récupérer toutes les commandes d'un user
    @Operation(summary = "Get all order baskets by user", description = "Retrieves all order baskets for a specific user.")
    @GetMapping("/all/{username}")
    public ResponseEntity<List<BasketDTO>> getOrderBasketByUser(@PathVariable String username) {
        List<OrderBasket> orders = orderBasketService.getOrderBasketByUser(username);
        return orders != null
                ? ResponseEntity.ok(orders.stream().map(b -> new BasketDTO(b)).collect(Collectors.toList()))
                : ResponseEntity.notFound().build();
    }

    // GET /baskets/current/{username} - récupérer le panier (commande courante)
    // d'un user
    @Operation(summary = "Get current order basket by user", description = "Retrieves the current order basket for a specific user.")
    @GetMapping("/current/{username}")
    public ResponseEntity<BasketDTO> getCurrentOrderBasketByUser(@PathVariable String username) {
        try {
            OrderBasket order = orderBasketService.findCurrentByUsername(username);
            return ResponseEntity.ok(new BasketDTO(order));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /baskets/add-product/{basketId} - Ajouter un produit a une commande
    @Operation(summary = "Add product to order basket", description = "Adds a product to the specified order basket.")
    @PostMapping("/add-product/{username}")
    public ResponseEntity<?> addProductToBasket(@PathVariable String username,
            @RequestBody Map<String, Integer> purchase) {
        try {
            Long productId = Integer.toUnsignedLong(purchase.get("productId"));
            int quantity = purchase.get("quantity");
            OrderBasket updatedOrder = orderBasketService.addProductBasket(username, productId, quantity);
            return ResponseEntity.status(HttpStatus.CREATED).body(new BasketDTO(updatedOrder));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // PATCH /baskets/change-quantity/{basketId} Modifier la quantité d'un produit a
    // une commande
    @Operation(summary = "Update product quantity in order basket", description = "Updates the quantity of a product in the specified order basket.")
    @PatchMapping("/change-quantity/{basketId}")
    public ResponseEntity<?> updateQuantity(@PathVariable Long basketId, @RequestBody Map<String, Integer> purchase) {
        try {
            Long productId = Integer.toUnsignedLong(purchase.get("productId"));
            int quantity = purchase.get("quantity");

            OrderBasket updated = orderBasketService.updateQuantity(basketId, productId, quantity);
            return updated != null ? ResponseEntity.ok(new BasketDTO(updated)) : ResponseEntity.notFound().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // DELETE /baskets/delete-product/{basketId}/{productId} Retirer un produit
    // d'une commande
    @Operation(summary = "Remove product from order basket", description = "Removes a product from the specified order basket.")
    @DeleteMapping("/delete-product/{basketId}/{productId}")
    public ResponseEntity<String> removeProductFromBasket(@PathVariable Long basketId, @PathVariable Long productId) {
        boolean deleted;
        try {
            deleted = orderBasketService.deleteProduct(basketId, productId);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        return deleted
                ? ResponseEntity.ok("Product " + productId + " removed from basket")
                : ResponseEntity.notFound().build();
    }

    // PATCH /baskets/update/{basketId} mise à jour d'une commande
    @Operation(summary = "Update order basket", description = "Updates the details of an existing order basket.")
    @PatchMapping("/update/{basketId}")
    public ResponseEntity<?> updateOrderBasket(@PathVariable Long basketId, @RequestBody Map<String, Object> updates) {
        OrderBasket updatedBasket = orderBasketService.updateOrderBasket(basketId, updates);
        return updatedBasket != null
                ? ResponseEntity.ok(new BasketDTO(updatedBasket))
                : ResponseEntity.notFound().build();
    }

    // DELETE /baskets/delete/{basketId} suppression d'une commande
    @Operation(summary = "Delete order basket", description = "Deletes an existing order basket by its ID.")
    @DeleteMapping("/delete/{basketId}")
    public ResponseEntity<String> deleteOrderBasket(@PathVariable Long basketId) {
        boolean deleted = orderBasketService.deleteOrderBasket(basketId);
        return deleted
                ? ResponseEntity.ok("OrderBasket " + basketId + " is deleted")
                : ResponseEntity.notFound().build();
    }
}
