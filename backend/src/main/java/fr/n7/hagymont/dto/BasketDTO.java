package fr.n7.hagymont.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.Product;

public class BasketDTO {

    /*
     * Json format :
     *
     * {id,
     * createdAt,
     * address,
     * status,
     * user,
     * purchases:[{id,
     * product:{id,
     * name,
     * price}
     * }, ...]}
     */
    private Long id;
    private LocalDateTime createdAt;
    private String address;
    private String status;
    private String user;
    private List<PurchaseDTO> purchases;

    public BasketDTO() {
    }

    public BasketDTO(OrderBasket basket) {
        if (basket == null) {
            return;
        }
        this.id = basket.getId();
        this.createdAt = basket.getCreatedAt();
        this.address = basket.getAddress();
        this.status = basket.getStatus().toString();
        this.user = basket.getUser().getUsername();
        this.purchases = basket.getProducts().stream()
                .map(p -> new PurchaseDTO(p.getId(), p.getQuantity(), new ProductInfosDTO(p.getProduct())))
                .collect(Collectors.toList());
    }

    public static OrderBasket fromDTO(BasketDTO DTO) {
        OrderBasket basket = new OrderBasket();
        basket.setId(DTO.id);
        basket.setCreatedAt(DTO.createdAt);
        basket.setAddress(DTO.address);
        basket.setStatus(OrderBasket.StatusType.valueOf(DTO.status));
        return basket;
    }

    public static class ProductInfosDTO {

        private Long id;
        private String name;
        private Double price;

        public ProductInfosDTO(Product product) {
            this.id = product.getId();
            this.name = product.getName();
            this.price = product.getPrice();
        }

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

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }
    }

    public static class PurchaseDTO {

        private Long id;
        private int quantity;
        private ProductInfosDTO product;

        public PurchaseDTO() {
        }

        public PurchaseDTO(Long id, int quantity, ProductInfosDTO product) {
            this.id = id;
            this.quantity = quantity;
            this.product = product;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public ProductInfosDTO getProduct() {
            return product;
        }

        public void setProduct(ProductInfosDTO product) {
            this.product = product;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public List<PurchaseDTO> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<PurchaseDTO> purchases) {
        this.purchases = purchases;
    }
}
