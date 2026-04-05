package com.shopforge.controller;

import com.shopforge.model.Transaction;
import com.shopforge.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CheckoutController — REST endpoints for order checkout and history.
 *
 * POST /orders/place  → confirm checkout, create Transaction
 * GET  /orders        → list all Transactions
 */
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/place")
    public ResponseEntity<Transaction> checkout() {
        return ResponseEntity.ok(checkoutService.checkout());
    }

    @GetMapping
    public List<Transaction> getTransactions() {
        return checkoutService.getTransactions();
    }
}
