package fr.n7.hagymont.dto;

import fr.n7.hagymont.model.Product;

public class ProductDTO {

    /*
     * Json format :
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

    public ProductDTO(Product product) {
        if (product == null) {
            return;
        }
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.stock = product.getStock();
        this.description = product.getDescription();
        this.sizes = product.getSizes();
        this.colors = product.getColors();
        this.category = product.getCategory().toString();
    }

    public static Product fromDTO(ProductDTO DTO) {
        Product product = new Product();
        product.setName(DTO.name);
        product.setPrice(DTO.price);
        product.setStock(DTO.stock);
        product.setCategory(DTO.category);
        product.setSizes(DTO.sizes);
        product.setColors(DTO.colors);
        product.setDescription(DTO.description);
        return product;
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

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSizes() {
        return sizes;
    }

    public void setSizes(String sizes) {
        this.sizes = sizes;
    }

    public String getColors() {
        return colors;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
