package fr.n7.hagymont.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.PurchaseOrder;
import fr.n7.hagymont.service.PurchaseOrderService;

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
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
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
