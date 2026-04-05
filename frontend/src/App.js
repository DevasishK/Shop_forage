import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [productRefresh, setProductRefresh] = useState(0);
  const [orderRefresh, setOrderRefresh] = useState(0);

  const handleProductAdded = () => setProductRefresh(p => p + 1);
  const handleOrderPlaced = () => setOrderRefresh(p => p + 1);

  const tabs = [
    { id: 'products', label: 'Inventory', icon: '⬛' },
    { id: 'cart',     label: 'Cart',      icon: '◈' },
    { id: 'orders',   label: 'Orders',    icon: '◉' },
  ];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-mark">SF</div>
          <span className="brand-name">Shop<span>Forge</span></span>
        </div>
        <span className="header-meta">Commerce Engine v2.0</span>
      </header>

      <nav className="app-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === 'products' && (
          <div className="products-layout">
            <AddProduct onProductAdded={handleProductAdded} />
            <ProductList refreshTrigger={productRefresh} />
          </div>
        )}
        {activeTab === 'cart' && <Cart onOrderPlaced={handleOrderPlaced} />}
        {activeTab === 'orders' && <Orders refreshTrigger={orderRefresh} />}
      </main>

      <footer className="app-footer">
        <span><span className="footer-dot" />API: localhost:8080</span>
        <span>ShopForge &mdash; Inventory Management System</span>
        <span>UI: localhost:3000</span>
      </footer>
    </div>
  );
}

export default App;
