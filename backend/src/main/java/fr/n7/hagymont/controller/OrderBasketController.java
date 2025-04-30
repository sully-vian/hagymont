package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.service.OrderBasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order_baskets")
public class OrderBasketController {

    @Autowired
    private OrderBasketService orderBasketService;

    // POST /order-baskets - Créer un nouveau panier
    @PostMapping
    public ResponseEntity<OrderBasket> createOrderBasket(@RequestBody OrderBasket orderBasket) {
        OrderBasket createdBasket = orderBasketService.createOrderBasket(orderBasket);
        return ResponseEntity.status(201).body(createdBasket);
    }

    // GET /order-baskets - récupérer tous les paniers
    @GetMapping("/user/{username}")
    public List<OrderBasket> getOrderBasketsByUser(@PathVariable String username) {
        return orderBasketService.getOrderBasketsByUser(username);
    }

    //mise à jour d'un panier
    @PatchMapping("/{id}")
    public ResponseEntity<OrderBasket> updateOrderBasket(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {
        OrderBasket updatedBasket = orderBasketService.updateOrderBasket(id, updates);
        return updatedBasket != null
                ? ResponseEntity.ok(updatedBasket)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderBasket(@PathVariable Long id) {
        boolean deleted = orderBasketService.deleteOrderBasket(id);
        return deleted
                ? ResponseEntity.ok("OrderBasket is deleted")
                : ResponseEntity.notFound().build();
    }
}
