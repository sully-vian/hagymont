package fr.n7.hagymont.jpa;

import fr.n7.hagymont.model.PurchaseOrder;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByUserId(Long userId);

    List<PurchaseOrder> findByProductId(Long productId);
}
