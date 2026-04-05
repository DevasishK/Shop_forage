package com.shopforge.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * CartEntry — a staged item in the user's shopping cart.
 * Maps to the 'cart_entries' table.
 */
@Entity
@Table(name = "cart_entries")
public class CartEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull(message = "Product ID is required.")
    @Positive(message = "Product ID must be a positive number.")
    private Long productId;

    @Column(nullable = false)
    @Min(value = 1, message = "Quantity must be at least 1.")
    private int quantity;

    public CartEntry() {}

    public CartEntry(Long id, Long productId, int quantity) {
        this.id        = id;
        this.productId = productId;
        this.quantity  = quantity;
    }

    public Long getId()               { return id; }
    public void setId(Long id)        { this.id = id; }

    public Long getProductId()                { return productId; }
    public void setProductId(Long productId)  { this.productId = productId; }

    public int  getQuantity()              { return quantity; }
    public void setQuantity(int quantity)  { this.quantity = quantity; }
}
