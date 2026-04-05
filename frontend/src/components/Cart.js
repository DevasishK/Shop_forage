import React, { useCallback, useEffect, useState } from 'react';
import { getCartItems, removeFromCart, placeOrder } from '../services/api';

const getError = (err, fallback) => {
  const p = err?.response?.data;
  if (typeof p === 'string' && p) return p;
  return p?.message || fallback;
};

function Cart({ onOrderPlaced }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [status, setStatus]       = useState({ type: '', text: '' });

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCartItems();
      setCartItems(res.data);
      setStatus({ type: '', text: '' });
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Cannot load cart.') });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      setStatus({ type: 'success', text: `OK: Item #${id} removed from cart.` });
      fetchCart();
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Remove failed.') });
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setStatus({ type: 'error', text: 'ERR: Cart is empty.' });
      return;
    }
    try {
      const res = await placeOrder();
      setStatus({
        type: 'success',
        text: `OK: Order #${res.data.id} confirmed — ₹${res.data.totalAmount.toFixed(2)}.`,
      });
      setCartItems([]);
      if (onOrderPlaced) onOrderPlaced();
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Order placement failed.') });
    }
  };

  if (loading) return (
    <div className="panel">
      <div className="loading-state">
        <div className="loading-bar" />
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading Cart...</span>
      </div>
    </div>
  );

  const totalUnits = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="panel" style={{ maxWidth: 860 }}>
      <div className="panel-header">
        <div className="section-label">Staging Area</div>
        <div className="section-title" style={{ fontSize: 22 }}>Cart</div>
        <div className="section-sub">{cartItems.length} line items staged for checkout</div>
      </div>

      <div className="panel-body">
        {status.text && (
          <div className={`status-banner ${status.type}`}>{status.text}</div>
        )}

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◈</div>
            <div className="empty-title">Cart Empty</div>
            <div>Add products from the Inventory tab.</div>
          </div>
        ) : (
          <>
            <div className="forge-table-wrap">
              <table className="forge-table">
                <thead>
                  <tr>
                    <th>Cart ID</th>
                    <th>Product ID</th>
                    <th>Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td className="col-id">#{String(item.id).padStart(4, '0')}</td>
                      <td className="col-id">SKU-{String(item.productId).padStart(4, '0')}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemove(item.id)}
                        >
                          ✕ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-footer">
              <div>
                <div className="cart-total-label">Total Units</div>
                <div className="cart-total-units">{totalUnits}</div>
              </div>
              <button
                className="btn btn-primary"
                onClick={handlePlaceOrder}
                style={{ fontSize: 15, padding: '14px 32px' }}
              >
                ◉ PLACE ORDER
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
