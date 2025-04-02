package fr.n7.hagymont.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.n7.hagymont.model.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByUser_Login(String userLogin);

    List<PurchaseOrder> findByProductId(Long productId);
}
