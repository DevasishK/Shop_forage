package com.shopforge.controller;

import com.shopforge.model.CartEntry;
import com.shopforge.service.StagingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * StagingController — REST endpoints for cart (staging area) management.
 *
 * POST   /cart/add   → stage an item
 * GET    /cart       → list staged items
 * DELETE /cart/{id}  → remove a staged entry
 */
@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class StagingController {

    @Autowired
    private StagingService stagingService;

    @PostMapping("/add")
    public CartEntry stageItem(@Valid @RequestBody CartEntry entry) {
        return stagingService.stageItem(entry);
    }

    @GetMapping
    public List<CartEntry> getStagedItems() {
        return stagingService.getStagedItems();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> unstageItem(@PathVariable Long id) {
        stagingService.unstageItem(id);
        return ResponseEntity.ok("Cart entry removed.");
    }
}
