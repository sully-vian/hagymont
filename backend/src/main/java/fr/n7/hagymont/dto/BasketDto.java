package fr.n7.hagymont.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import fr.n7.hagymont.model.OrderBasket;
import fr.n7.hagymont.model.Product;

public class BasketDto {
    
    /* Json format :
     *
     * {id, 
     * createdAt, 
     * address, 
     * status, 
     * user,
     * purchases:[{id, 
     *   product:{id, 
     *     name, 
     *     price}
     *   }, ...]}
     */

    private Long id;
    private LocalDateTime createdAt;
    private String address;
    private String status;
    private String user;
    private List<PurchaseDto> purchases;

    public BasketDto() {}

    public static BasketDto toDto(OrderBasket basket) {
        BasketDto dto = new BasketDto();
        dto.id = basket.getId();
        dto.createdAt = basket.getCreatedAt();
        dto.address = basket.getAddress();
        dto.status = basket.getStatus().toString();
        dto.user = basket.getUser().getUsername();
        dto.purchases = basket.getProducts().stream()
                .map(p -> new PurchaseDto(p.getId(), p.getQuantity(), new ProductInfosDto(p.getProduct())))
                .collect(Collectors.toList());
        return dto;
    }

    public static OrderBasket fromDto(BasketDto dto) {
        OrderBasket basket = new OrderBasket();
        basket.setId(dto.id);
        basket.setCreatedAt(dto.createdAt);
        basket.setAddress(dto.address);
        basket.setStatus(OrderBasket.StatusType.valueOf(dto.status));
        return basket;
    }

    public static class ProductInfosDto {
        private Long id;
        private String name;
        private Double price;

        public ProductInfosDto(Product product) {
            this.id = product.getId();
            this.name = product.getName();
            this.price = product.getPrice();
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }

    public static class PurchaseDto {
        private Long id;
        private int quantity;
        private ProductInfosDto product;

        public PurchaseDto(Long id, int quantity, ProductInfosDto product) {
            this.id = id;
            this.quantity = quantity;
            this.product = product;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
        public ProductInfosDto getProduct() { return product; }
        public void setProduct(ProductInfosDto product) { this.product = product; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public List<PurchaseDto> getPurchases() { return purchases; }
    public void setPurchases(List<PurchaseDto> purchases) { this.purchases = purchases; }
}
