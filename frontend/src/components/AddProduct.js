import React, { useState } from 'react';
import { addProduct } from '../services/api';

function AddProduct({ onProductAdded }) {
  const [name, setName]             = useState('');
  const [price, setPrice]           = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl]     = useState('');
  const [status, setStatus]         = useState({ type: '', text: '' });
  const [loading, setLoading]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      setStatus({ type: 'error', text: 'ERR: Name and price are required.' });
      return;
    }
    setLoading(true);
    try {
      await addProduct({
        name: name.trim(),
        price: parseFloat(price),
        description: description.trim(),
        imageUrl: imageUrl.trim() || null,
      });
      setStatus({ type: 'success', text: `OK: "${name.trim()}" registered in catalog.` });
      setName(''); setPrice(''); setDescription(''); setImageUrl('');
      if (onProductAdded) onProductAdded();
    } catch (err) {
      const payload = err?.response?.data;
      const msg =
        (typeof payload === 'string' && payload) ||
        payload?.message ||
        'ERR: Failed to register product.';
      setStatus({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="section-label">New Entry</div>
        <div className="section-title" style={{ fontSize: 22 }}>Add Product</div>
        <div className="section-sub">Register a new item to the catalog</div>
      </div>

      <div className="panel-body">
        {status.text && (
          <div className={`status-banner ${status.type}`}>{status.text}</div>
        )}

        <form onSubmit={handleSubmit} className="forge-form">
          <div className="field-group">
            <label className="field-label" htmlFor="sf-name">Product Name</label>
            <input
              id="sf-name"
              className="field-input"
              type="text"
              placeholder="e.g. Quantum Headset"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="sf-price">Unit Price (INR)</label>
            <input
              id="sf-price"
              className="field-input"
              type="number"
              placeholder="e.g. 24999"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="sf-desc">Description</label>
            <textarea
              id="sf-desc"
              className="field-textarea"
              placeholder="Technical specs, features, notes..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="sf-img">Image URL (optional)</label>
            <input
              id="sf-img"
              className="field-input"
              type="url"
              placeholder="https://example.com/img.jpg"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'PROCESSING...' : '⊕ REGISTER PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
