package com.shopforge.model;

import jakarta.persistence.*;

/**
 * Transaction — a completed purchase order in ShopForge.
 * Maps to the 'transactions' table.
 */
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double totalAmount;

    public Transaction() {}

    public Transaction(Long id, double totalAmount) {
        this.id          = id;
        this.totalAmount = totalAmount;
    }

    public Long   getId()          { return id; }
    public void   setId(Long id)   { this.id = id; }

    public double getTotalAmount()                    { return totalAmount; }
    public void   setTotalAmount(double totalAmount)  { this.totalAmount = totalAmount; }
}
