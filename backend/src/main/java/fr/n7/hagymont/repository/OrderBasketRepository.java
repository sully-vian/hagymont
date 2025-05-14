package fr.n7.hagymont.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.OrderBasket;

public interface OrderBasketRepository extends JpaRepository<OrderBasket, Long> {

    List<OrderBasket> findByUser_Username(String username);

    List<OrderBasket> findByStatus(String status);//"pending","confirmed"...

    List<OrderBasket> findByUserUsernameAndStatus(String username, String status);
}
