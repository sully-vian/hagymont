package fr.n7.hagymont.service;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.repository.OrderBasketRepository;
import fr.n7.hagymont.repository.ProductRepository;
import fr.n7.hagymont.repository.PurchaseOrderRepository;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;

import fr.n7.hagymont.model.OrderBasket.StatusType;
import fr.n7.hagymont.model.Product;
import fr.n7.hagymont.model.PurchaseOrder;

@Service
public class OrderBasketService {

    @Autowired
    private OrderBasketRepository orderBasketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    // Créer un panier pour un user
    public OrderBasket createOrderBasket(String username) {
        // Vérifier l'existence de l'utilisateur
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }

        OrderBasket newBasket = new OrderBasket();
        newBasket.setCreatedAt(LocalDateTime.now());
        newBasket.setStatus(StatusType.pending);
        newBasket.setUser(user);
        return orderBasketRepository.save(newBasket);
    }

    // Récupérer toutes les commandes d'un User
    public List<OrderBasket> getOrderBasketByUser(String username) {
        List<OrderBasket> order = Optional.of(orderBasketRepository.findByUser_Username(username)).orElse(null);
        return order;
    }

    // Trouver le panier (commande non validée) d'un user
    public OrderBasket findCurrentByUsername(String username) throws ResourceNotFoundException {
        List<OrderBasket> orders = orderBasketRepository.findByUserUsernameAndStatus(username, StatusType.pending);
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("User doesn't exist");
        }
        if (orders.isEmpty()) {
            return null;
        } else {
            // Normalement on ne devrait jamais avoir plusieurs orders pending
            return orders.get(0);
        }
    }

    // Ajouter un produit au panier en cours d'un user
    public OrderBasket addProductBasket(String username, Long productId, int quantity)
            throws ResourceNotFoundException {
        // Vérifier l'existence du panier et du produit
        OrderBasket basket = findCurrentByUsername(username);
        if (basket == null) {
            basket = createOrderBasket(username);
        }
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            throw new ResourceNotFoundException("product " + product + "wasn't found");
        }
        // Vérifier le stock
        if (product.getStock() < quantity) {
            throw new IllegalStateException("Stock is insufficient");
        }
        PurchaseOrder purchase;
        // Si le produit est deja dans le panier on change juste la quantité
        PurchaseOrder purchaseExisting = purchaseOrderRepository.findByOrderBasketIdAndProductId(basket.getId(),
                productId);
        if (purchaseExisting != null) {
            purchase = purchaseExisting;
            quantity += purchaseExisting.getQuantity();
        } else {
            purchase = new PurchaseOrder();
        }
        purchase.setOrderBasket(basket);
        purchase.setProduct(product);
        purchase.setQuantity(quantity);
        purchaseOrderRepository.save(purchase);
        return basket;
    }

    // Modifier la quantité d'un produit dans une commande
    public OrderBasket updateQuantity(Long basketId, Long productId, Integer newQuantity)
            throws ResourceNotFoundException {
        OrderBasket basket = orderBasketRepository.findById(basketId)
                .orElseThrow(() -> new ResourceNotFoundException("basket " + basketId + "wasn't found"));
        productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("product " + productId + "wasn't found"));

        PurchaseOrder purchase = purchaseOrderRepository.findByOrderBasketIdAndProductId(basketId, productId);

        if (newQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        // Vérifier le stock
        if (purchase.getProduct().getStock() < newQuantity) {
            throw new IllegalStateException("Stock is insufficient");
        }

        purchase.setQuantity(newQuantity);
        purchaseOrderRepository.save(purchase);
        return basket;
    }

    // Supprimer un produit dans une commande
    public boolean deleteProduct(Long basketId, Long productId) throws ResourceNotFoundException {
        OrderBasket basket = orderBasketRepository.findById(basketId)
                .orElseThrow(() -> new ResourceNotFoundException("basket " + basketId + "wasn't found"));
        productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("product " + productId + "wasn't found"));

        PurchaseOrder purchase = purchaseOrderRepository.findByOrderBasketIdAndProductId(basketId, productId);
        if (purchase != null) {
            purchaseOrderRepository.delete(purchase);
            if (basket.getProducts().isEmpty()) {
                orderBasketRepository.delete(basket);
            }
            return true;
        }
        return false;
    }

    private void updateQuantiteProduct(PurchaseOrder purchase, BinaryOperator<Integer> op) {
        Product product = productRepository.findById(purchase.getProduct().getId()).orElse(null);
        if (product == null) {
            // ne drvrait pas arriver
            return;
        }
        product.setStock((int) op.apply(product.getStock(), purchase.getQuantity()));
        productRepository.save(product);

    }

    // Mettre à jour une commande
    public OrderBasket updateOrderBasket(Long id, Map<String, Object> updates) {
        OrderBasket basket = orderBasketRepository.findById(id).orElse(null);
        if (basket == null) {
            return null;
        }

        updates.forEach(new BiConsumer<String, Object>() {
            @Override
            public void accept(String key, Object value) {
                switch (key) {
                    case "address":
                        basket.setAddress((String) value);
                        break;
                    case "status":
                        basket.setStatus(StatusType.valueOf((String) value));
                        if (value == "confirmed") {
                            // on retire des stocks quand on confirme une commande
                            basket.getProducts().stream()
                                    .forEach(purchase -> updateQuantiteProduct(purchase, ((a, b) -> a - b)));
                        }
                        break;
                }
            }
        });

        return orderBasketRepository.save(basket);
    }

    // Supprimer une commande
    public boolean deleteOrderBasket(Long id) {
        OrderBasket basket = orderBasketRepository.findById(id).orElse(null);
        if (basket != null) {

            if (basket.getStatus() == StatusType.confirmed) {
                // si une commande est confirmee mais pas envoyé ou sous forme de panier on
                // remet les produits en stock
                basket.getProducts().stream()
                        .forEach(purchase -> updateQuantiteProduct(purchase, ((a, b) -> a + b)));
            }
            orderBasketRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
