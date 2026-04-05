import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/api';

function Orders({ refreshTrigger }) {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => { fetchOrders(); }, [refreshTrigger]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      setOrders(res.data);
      setError('');
    } catch (err) {
      const p = err?.response?.data;
      setError((typeof p === 'string' && p) || p?.message || 'ERR: Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="panel">
      <div className="loading-state">
        <div className="loading-bar" />
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading Orders...</span>
      </div>
    </div>
  );

  const grandTotal = orders.reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="panel" style={{ maxWidth: 860 }}>
      <div className="panel-header">
        <div className="section-label">Transaction Log</div>
        <div className="section-title" style={{ fontSize: 22 }}>Orders</div>
        <div className="section-sub">Completed checkout history</div>
      </div>

      <div className="panel-body">
        {error && <div className="status-banner error">{error}</div>}

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◉</div>
            <div className="empty-title">No Orders Yet</div>
            <div>Add items to cart and place an order to see history here.</div>
          </div>
        ) : (
          <>
            <div className="forge-table-wrap">
              <table className="forge-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Total Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={order.id}>
                      <td className="col-id">{i + 1}</td>
                      <td className="col-id">ORD-{String(order.id).padStart(6, '0')}</td>
                      <td className="col-amount">₹{order.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stats-row">
              <div className="stat-block">
                <div className="stat-label">Total Orders</div>
                <div className="stat-value">{orders.length}</div>
              </div>
              <div className="stat-block">
                <div className="stat-label">Grand Total</div>
                <div className="stat-value" style={{ fontSize: 24 }}>₹{grandTotal.toFixed(2)}</div>
              </div>
              <div className="stat-block">
                <div className="stat-label">Avg Order Value</div>
                <div className="stat-value" style={{ fontSize: 24 }}>₹{(grandTotal / orders.length).toFixed(2)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;
