package fr.n7.hagymont.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.model.PurchaseOrder;
import fr.n7.hagymont.repository.OrderBasketRepository;
import fr.n7.hagymont.repository.ProductRepository;
import fr.n7.hagymont.repository.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderBasketRepository orderBasketRepository;

    // Ajouter un produit au panier
    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) throws ResourceNotFoundException {
        // Vérifier l'existence du panier et du produit
        Long basketId = purchaseOrder.getOrderBasket().getId();
        Long productId = purchaseOrder.getProduct().getId();
        OrderBasket basket = orderBasketRepository.findById(basketId)
                .orElseThrow(() -> new ResourceNotFoundException("BasketOrder not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Vérifier le stock
        if (product.getStock() < purchaseOrder.getQuantity()) {
            throw new IllegalStateException("Stock is insufficient");
        }
        //Si le produit est deja dans le panier on change juste la quantité
        PurchaseOrder purchaseExisting = purchaseOrderRepository.findByOrderBasketIdAndProductId(basketId, productId);
        if (purchaseExisting!=null){
            purchaseExisting.setQuantity(purchaseExisting.getQuantity() + purchaseOrder.getQuantity());
            return purchaseOrderRepository.save(purchaseExisting);
        }

        purchaseOrder.setOrderBasket(basket);
        purchaseOrder.setProduct(product);
        return purchaseOrderRepository.save(purchaseOrder);
    }

    // Modifier la quantité
    public PurchaseOrder updateQuantity(Long id, Integer newQuantity) throws ResourceNotFoundException {
        PurchaseOrder order = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PurchaseOrder not found"));

        if (newQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        // Vérifier le stock
        if (order.getProduct().getStock() < newQuantity) {
            throw new IllegalStateException("Stock is insufficient");
        }

        order.setQuantity(newQuantity);
        return purchaseOrderRepository.save(order);
    }

    // Supprimer un produit du panier
    public boolean deletePurchaseOrder(Long id) {
        PurchaseOrder purchase = purchaseOrderRepository.findById(id).orElse(null);
        if (purchase!=null) {
            OrderBasket order = purchase.getOrderBasket();
            purchaseOrderRepository.delete(purchase);
            if (order.getProducts().isEmpty()){
                orderBasketRepository.delete(order);
            }
            return true;
        }
        return false;
    }
}
