# ShopForge

A full-stack commerce engine built with **React** (frontend) and **Spring Boot** (backend).

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 19, Axios, Space Mono + Barlow Condensed fonts |
| Backend  | Spring Boot 3.2, Spring Data JPA, Bean Validation |
| Database | H2 in-memory (auto-configured, no setup) |

---

## Project Structure

```
ShopForge/
├── frontend/          # React app (port 3000)
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── components/
│       │   ├── AddProduct.js
│       │   ├── ProductList.js
│       │   ├── Cart.js
│       │   └── Orders.js
│       └── services/
│           └── api.js
└── backend/           # Spring Boot API (port 8080)
    └── src/main/java/com/shopforge/
        ├── ShopForgeApplication.java
        ├── model/        (Item, CartEntry, Transaction)
        ├── repository/   (ItemRepository, CartEntryRepository, TransactionRepository)
        ├── service/      (CatalogService, StagingService, CheckoutService)
        ├── controller/   (CatalogController, StagingController, CheckoutController)
        ├── exception/    (NotFoundException, ValidationException, GlobalExceptionHandler)
        └── config/       (DataSeeder)
```

---

## Running the App

### 1. Backend (Spring Boot)

**Prerequisites:** Java 17+, Maven 3.6+

```bash
cd backend
mvn spring-boot:run
```

API will be live at `http://localhost:8080`  
H2 Console: `http://localhost:8080/h2-console`  
  - JDBC URL: `jdbc:h2:mem:shopforgedb`  
  - Username: `forge`  
  - Password: *(leave blank)*

### 2. Frontend (React)

**Prerequisites:** Node.js 18+

```bash
cd frontend
npm install
npm start
```

App will open at `http://localhost:3000`

---

## API Reference

### Catalog (Products)

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/products`        | List all items       |
| POST   | `/products`        | Register new item    |
| PUT    | `/products/{id}`   | Update item          |
| DELETE | `/products/{id}`   | Remove item          |

### Cart (Staging)

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/cart/add`    | Stage an item            |
| GET    | `/cart`        | List staged items        |
| DELETE | `/cart/{id}`   | Remove a staged entry    |

### Orders (Checkout)

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| POST   | `/orders/place` | Confirm checkout → Transaction |
| GET    | `/orders`       | List all Transactions        |

---

## Features

- **Catalog Management** — Add, edit, delete products with image URL support
- **Cart Staging** — Add items to cart, remove individually
- **Checkout** — Place order from cart; total auto-calculated; cart cleared after
- **Order History** — View all past transactions with grand total and average order value
- **Sample Data** — 5 items pre-loaded on first startup via `DataSeeder`
- **Error Handling** — Global exception handler with structured JSON error responses
- **Dark UI** — Industrial brutalist design with neon-yellow accent, monospace typography

---

## .gitignore

See `.gitignore` in each subdirectory for excluded files.
