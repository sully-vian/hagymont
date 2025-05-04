package fr.n7.hagymont.service;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.repository.OrderBasketRepository;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;
import java.util.List;
import java.util.Optional;

@Service
public class OrderBasketService {

    @Autowired
    private OrderBasketRepository orderBasketRepository;

    @Autowired
    private UserRepository userRepository;

    // Créer un panier
    public OrderBasket createOrderBasket(OrderBasket orderBasket) throws ResourceNotFoundException {
        // Vérifier l'existence de l'utilisateur
        Optional<User> userOptional = Optional.of(userRepository.findByUsername(orderBasket.getUser().getUsername()));
        User user = userOptional.orElseThrow(() -> new ResourceNotFoundException("User not found"));

        orderBasket.setUser(user);
        orderBasket.setCreated_at(LocalDate.now().toString());
        orderBasket.setStatus("pending"); // Statut initial
        return orderBasketRepository.save(orderBasket);
    }

    // Récupérer un panier par User
    public List<OrderBasket> getOrderBasketByUser(String username) {
        List<OrderBasket> order = Optional.of(orderBasketRepository.findByUser_Username(username)).orElse(null);
        return order;
    }

    // Mettre à jour le panier
    public OrderBasket updateOrderBasket(Long id, Map<String, Object> updates) throws ResourceNotFoundException {
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
    public OrderBasket validateOrderBasket(Long id) throws ResourceNotFoundException {
        OrderBasket basket = orderBasketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Panier not found"));
        basket.setStatus("confirmed");
        return orderBasketRepository.save(basket);
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
