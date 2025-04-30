package fr.n7.hagymont.service;

import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.repository.OrderBasketRepository;
import fr.n7.hagymont.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;

@Service
public class OrderBasketService {

    @Autowired
    private OrderBasketRepository orderBasketRepository;

    @Autowired
    private UserRepository userRepository;

    // Créer un panier
    public OrderBasket createOrderBasket(OrderBasket orderBasket) {
        // Vérifier l'existence de l'utilisateur
        User user = userRepository.findByUsername(orderBasket.getUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        orderBasket.setUser(user);
        orderBasket.setCreated_at(LocalDate.now());
        orderBasket.setStatus("pending"); // Statut initial
        return orderBasketRepository.save(orderBasket);
    }

    // Récupérer un panier par ID
    public OrderBasket getOrderBasketById(Long id) {
        return orderBasketRepository.findById(id).orElse(null);
    }

    // Mettre à jour le panier
    public OrderBasket updateOrderBasket(Long id, Map<String, Object> updates) {
        OrderBasket basket = orderBasketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("OrderBasket not found"));

        updates.forEach((key, value) -> {
            switch (key) {
                case "address":
                    basket.setAddress((String) value);
                    break;
                case "status":
                    basket.setStatus((String) value);
                    break;
            }
        });

        return orderBasketRepository.save(basket);
    }

    // Valider le panier
    public OrderBasket validateOrderBasket(Long id) {
        OrderBasket basket = orderBasketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Panier not found"));
        basket.setStatus("confirmed");
        return orderBasketRepository.save(basket);
    }
}

// Supprimer un panier
public boolean deleteOrderBasket(Long id) {
        if (orderBasketRepository.existsById(id)) {
            orderBasketRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
