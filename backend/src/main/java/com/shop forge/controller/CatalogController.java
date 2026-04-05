package com.shopforge.controller;

import com.shopforge.model.Item;
import com.shopforge.service.CatalogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CatalogController — REST endpoints for catalog Item management.
 *
 * GET    /products        → list all items
 * POST   /products        → register new item
 * PUT    /products/{id}   → update item
 * DELETE /products/{id}   → remove item
 */
@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @GetMapping
    public List<Item> listItems() {
        return catalogService.listItems();
    }

    @PostMapping
    public Item registerItem(@Valid @RequestBody Item item) {
        return catalogService.registerItem(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> modifyItem(
            @PathVariable Long id,
            @Valid @RequestBody Item updated) {
        return ResponseEntity.ok(catalogService.modifyItem(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id) {
        catalogService.removeItem(id);
        return ResponseEntity.ok("Item removed from catalog.");
    }
}
