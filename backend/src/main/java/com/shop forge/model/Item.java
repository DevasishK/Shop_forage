package com.shopforge.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Item — a catalog entry available for purchase in ShopForge.
 * Maps to the 'items' table.
 */
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Item name is required.")
    @Size(max = 255, message = "Item name must be at most 255 characters.")
    private String name;

    @Column(nullable = false)
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be non-negative.")
    private double price;

    @Column(length = 1000)
    @Size(max = 1000, message = "Description must be at most 1000 characters.")
    private String description;

    @Column(length = 2048)
    @Size(max = 2048, message = "Image URL must be at most 2048 characters.")
    private String imageUrl;

    public Item() {}

    public Item(Long id, String name, double price, String description, String imageUrl) {
        this.id          = id;
        this.name        = name;
        this.price       = price;
        this.description = description;
        this.imageUrl    = imageUrl;
    }

    public Long   getId()          { return id; }
    public void   setId(Long id)   { this.id = id; }

    public String getName()              { return name; }
    public void   setName(String name)   { this.name = name; }

    public double getPrice()              { return price; }
    public void   setPrice(double price) { this.price = price; }

    public String getDescription()                   { return description; }
    public void   setDescription(String description) { this.description = description; }

    public String getImageUrl()                { return imageUrl; }
    public void   setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
