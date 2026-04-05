package com.shopforge.config;

import com.shopforge.model.Item;
import com.shopforge.repository.ItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * DataSeeder — seeds the H2 in-memory database with sample catalog Items
 * so the app is usable immediately after startup.
 */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedCatalog(ItemRepository itemRepository) {
        return args -> {
            if (itemRepository.count() > 0) return; // skip if already seeded

            itemRepository.save(new Item(null, "Quantum Headset Pro",    4999.00,
                    "Wireless over-ear headset with active noise cancellation and 40hr battery.",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"));

            itemRepository.save(new Item(null, "Forge Mechanical Keyboard", 8499.00,
                    "TKL layout, hot-swap sockets, RGB per-key lighting, PBT keycaps.",
                    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"));

            itemRepository.save(new Item(null, "UltraWide Monitor 34\"",    32999.00,
                    "3440×1440 IPS panel, 144Hz, 1ms GTG, HDR400 with USB-C 65W PD.",
                    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400"));

            itemRepository.save(new Item(null, "Stealth Laptop Stand",      1299.00,
                    "Aluminium alloy, adjustable height 15°–50°, fits 11–17 inch laptops.",
                    null));

            itemRepository.save(new Item(null, "Precision Trackpad X1",    3599.00,
                    "Large haptic glass surface, Bluetooth 5.2, 60-day battery life.",
                    "https://images.unsplash.com/photo-1553949285-1ebf3fed1f1a?w=400"));
        };
    }
}
