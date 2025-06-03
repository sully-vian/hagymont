package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.service.OrderBasketService;
import fr.n7.hagymont.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import fr.n7.hagymont.dto.BasketDTO;

@RestController
@RequestMapping("/baskets")
public class OrderBasketController {

    @Autowired
    private OrderBasketService orderBasketService;

    // POST /baskets - Créer un nouveau panier
    @PostMapping("/add/{username}")
    public ResponseEntity<BasketDTO> createOrderBasket(@RequestBody String username) {
        OrderBasket createdBasket = orderBasketService.createOrderBasket(username);
        return createdBasket != null
                ? ResponseEntity.ok(new BasketDTO(createdBasket))
                : ResponseEntity.notFound().build();
    }

    // GET /baskets/all/{username} - récupérer toutes les commandes d'un user
    @GetMapping("/all/{username}")
    public ResponseEntity<List<BasketDTO>> getOrderBasketByUser(@PathVariable String username) {
        List<OrderBasket> orders = orderBasketService.getOrderBasketByUser(username);
        return orders != null
                ? ResponseEntity.ok(orders.stream().map(b -> new BasketDTO(b)).collect(Collectors.toList()))
                : ResponseEntity.notFound().build();
    }

    // GET /baskets/current/{username} - récupérer le panier (commande courante) d'un user
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
    @PostMapping("/add-product/{username}")
    public ResponseEntity<?> addProductToBasket(@PathVariable String username, @RequestBody Map<String, Integer> purchase) {
        try {
            Long productId = Integer.toUnsignedLong(purchase.get("productId"));
            int quantity = purchase.get("quantity");
            OrderBasket updatedOrder = orderBasketService.addProductBasket(username, productId, quantity);
            return ResponseEntity.status(HttpStatus.CREATED).body(new BasketDTO(updatedOrder));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // PATCH /baskets/change-quantity/{basketId} Modifier la quantité d'un produit a une commande
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

    // DELETE /baskets/delete-product/{basketId}/{productId} Retirer un produit d'une commande
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

    //PATCH /baskets/update/{basketId} mise à jour d'une commande
    @PatchMapping("/update/{basketId}")
    public ResponseEntity<?> updateOrderBasket(@PathVariable Long basketId, @RequestBody Map<String, Object> updates) {
        OrderBasket updatedBasket = orderBasketService.updateOrderBasket(basketId, updates);
        return updatedBasket != null
                ? ResponseEntity.ok(new BasketDTO(updatedBasket))
                : ResponseEntity.notFound().build();
    }

    //DELETE /baskets/delete/{basketId} suppression d'une commande
    @DeleteMapping("/delete/{basketId}")
    public ResponseEntity<String> deleteOrderBasket(@PathVariable Long basketId) {
        boolean deleted = orderBasketService.deleteOrderBasket(basketId);
        return deleted
                ? ResponseEntity.ok("OrderBasket " + basketId + " is deleted")
                : ResponseEntity.notFound().build();
    }
}
