package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.PurchaseOrder;
import fr.n7.hagymont.service.PurchaseOrderService;
import fr.n7.hagymont.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.n7.hagymont.repository.OrderBasketRepository;

@RestController
@RequestMapping("/purchase_order")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    // POST /purchase-orders - Ajouter un produit au panier
    @PostMapping
    public ResponseEntity<?> addProductToBasket(@RequestBody PurchaseOrder purchaseOrder) {

        try {
            PurchaseOrder createdOrder = purchaseOrderService.createPurchaseOrder(purchaseOrder);
            return ResponseEntity.status(201).body(createdOrder);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    // Modifier la quantité d'un produit dans le panier
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long id,
            @RequestBody Integer newQuantity) {
        
        try {
            PurchaseOrder updatedOrder = purchaseOrderService.updateQuantity(id, newQuantity);
            return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    // Retirer un produit du panier
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeProductFromBasket(@PathVariable Long id) {
        boolean deleted = purchaseOrderService.deletePurchaseOrder(id);
        return deleted
                ? ResponseEntity.ok("Product removed from basket")
                : ResponseEntity.notFound().build();
    }
}
