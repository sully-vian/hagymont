package fr.n7.hagymont.dto;

import fr.n7.hagymont.model.Product;

public class ProductDto {

    /* Json format :
     * 
     * {id,
     * name, 
     * price, 
     * stock, 
     * description, 
     * sizes,
     * colors, 
     * category}
     */
    
    private Long id;
    private String name;
    private Double price;
    private Integer stock;
    private String description;
    private String sizes; 
    private String colors;
    private String category;

    public ProductDto() {}

    public static ProductDto toDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.id = product.getId();
        dto.name = product.getName();
        dto.price = product.getPrice();
        dto.stock = product.getStock();
        dto.description = product.getDescription();
        dto.sizes = product.getSizes();
        dto.colors = product.getColors();
        dto.category = product.getCategory().toString();
        return dto;
    }

    public static Product fromDto(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.name);
        product.setPrice(dto.price);
        product.setStock(dto.stock);
        product.setDescription(dto.description);
        product.setSizes(dto.sizes);
        product.setColors(dto.colors);
        product.setDescription(dto.description);
        return product;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSizes() { return sizes; }
    public void setSizes(String sizes) { this.sizes = sizes; }
    public String getColors() { return colors; }
    public void setColors(String colors) { this.colors = colors; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
