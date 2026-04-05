package com.shopforge.service;

import com.shopforge.exception.NotFoundException;
import com.shopforge.exception.ValidationException;
import com.shopforge.model.CartEntry;
import com.shopforge.model.Item;
import com.shopforge.model.Transaction;
import com.shopforge.repository.ItemRepository;
import com.shopforge.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CheckoutService — converts a staged cart into a confirmed Transaction.
 *
 * Steps:
 *  1. Fetch all staged cart entries
 *  2. Resolve each entry to its Item price
 *  3. Compute total (price × quantity)
 *  4. Persist the Transaction
 *  5. Clear the cart
 */
@Service
public class CheckoutService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StagingService stagingService;

    public Transaction checkout() {
        List<CartEntry> staged = stagingService.getStagedItems();

        if (staged.isEmpty()) {
            throw new ValidationException("Cart is empty. Stage at least one item before checkout.");
        }

        double total = 0.0;
        for (CartEntry entry : staged) {
            Item item = itemRepository.findById(entry.getProductId())
                    .orElseThrow(() -> new NotFoundException("Item not found with id: " + entry.getProductId()));
            total += item.getPrice() * entry.getQuantity();
        }

        Transaction tx = new Transaction();
        tx.setTotalAmount(total);
        Transaction saved = transactionRepository.save(tx);

        stagingService.clearStaging();
        return saved;
    }

    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }
}
