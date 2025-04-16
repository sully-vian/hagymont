package fr.n7.hagymont.api.model;

import java.util.List;
import jakarta.persistence.*;
import java.util.ArrayList;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private int stock;

    @OneToMany(mappedBy = "product")
    private List<PurchaseOrder> orders = new ArrayList<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public List<PurchaseOrder> getOrders() {
        return orders;
    }

    public void addOrder(PurchaseOrder order) {
        orders.add(order);
        order.setProduct(this);
    }

    public void removeOrder(PurchaseOrder order) {
        orders.remove(order);
        order.setProduct(null);
    }
}
