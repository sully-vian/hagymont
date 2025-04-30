package fr.n7.hagymont.controller;

import fr.n7.hagymont.model.PurchaseOrder;
import fr.n7.hagymont.service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/purchase_order")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    // POST /purchase-orders - Ajouter un produit au panier
    @PostMapping
    public ResponseEntity<PurchaseOrder> addProductToBasket(@RequestBody PurchaseOrder purchaseOrder) {
        PurchaseOrder createdOrder = purchaseOrderService.createPurchaseOrder(purchaseOrder);
        return ResponseEntity.status(201).body(createdOrder);
    }

    // Modifier la quantité d'un produit dans le panier
    @PatchMapping("/{id}")
    public ResponseEntity<PurchaseOrder> updateQuantity(
            @PathVariable Long id,
            @RequestBody Integer newQuantity) {
        PurchaseOrder updatedOrder = purchaseOrderService.updateQuantity(id, newQuantity);
        return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
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
