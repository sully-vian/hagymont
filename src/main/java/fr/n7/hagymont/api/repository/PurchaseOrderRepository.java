package fr.n7.hagymont.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.api.model.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByUser_Username(String username);

    List<PurchaseOrder> findByProductId(Long productId);
}
