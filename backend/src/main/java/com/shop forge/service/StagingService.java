package com.shopforge.service;

import com.shopforge.exception.NotFoundException;
import com.shopforge.exception.ValidationException;
import com.shopforge.model.CartEntry;
import com.shopforge.repository.CartEntryRepository;
import com.shopforge.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * StagingService — handles cart (staging area) operations.
 */
@Service
public class StagingService {

    @Autowired
    private CartEntryRepository cartEntryRepository;

    @Autowired
    private ItemRepository itemRepository;

    public CartEntry stageItem(CartEntry entry) {
        if (entry.getProductId() == null) {
            throw new ValidationException("Product ID is required.");
        }
        if (entry.getQuantity() < 1) {
            throw new ValidationException("Quantity must be at least 1.");
        }
        if (!itemRepository.existsById(entry.getProductId())) {
            throw new NotFoundException("Item not found with id: " + entry.getProductId());
        }
        return cartEntryRepository.save(entry);
    }

    public List<CartEntry> getStagedItems() {
        return cartEntryRepository.findAll();
    }

    public void unstageItem(Long id) {
        if (!cartEntryRepository.existsById(id)) {
            throw new NotFoundException("Cart entry not found with id: " + id);
        }
        cartEntryRepository.deleteById(id);
    }

    public void clearStaging() {
        cartEntryRepository.deleteAll();
    }
}
