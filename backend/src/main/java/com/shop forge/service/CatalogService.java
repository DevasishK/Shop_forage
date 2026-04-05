package com.shopforge.service;

import com.shopforge.exception.NotFoundException;
import com.shopforge.model.Item;
import com.shopforge.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CatalogService — business logic for managing catalog Items.
 */
@Service
public class CatalogService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> listItems() {
        return itemRepository.findAll();
    }

    public Item registerItem(Item item) {
        return itemRepository.save(item);
    }

    public Item modifyItem(Long id, Item updated) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Item not found with id: " + id));

        existing.setName(updated.getName());
        existing.setPrice(updated.getPrice());
        existing.setDescription(updated.getDescription());
        existing.setImageUrl(updated.getImageUrl());

        return itemRepository.save(existing);
    }

    public void removeItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new NotFoundException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }
}
