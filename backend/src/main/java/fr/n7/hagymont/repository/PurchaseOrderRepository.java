package fr.n7.hagymont.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    
    List<PurchaseOrder> findByOrderId(Long orderId);

    List<PurchaseOrder> findByProductId(Long productId);
}
