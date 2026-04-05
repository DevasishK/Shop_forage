import React, { useCallback, useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, updateProduct, addToCart } from '../services/api';

const getError = (err, fallback) => {
  const p = err?.response?.data;
  if (typeof p === 'string' && p) return p;
  if (p?.details?.length) return `${p.message} ${p.details[0]}`;
  return p?.message || fallback;
};

const getInitials = (name) => {
  const t = (name || '').trim();
  if (!t) return '??';
  return t.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');
};

function ProductList({ refreshTrigger }) {
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [status, setStatus]           = useState({ type: '', text: '' });
  const [editingId, setEditingId]     = useState(null);
  const [brokenImgs, setBrokenImgs]   = useState({});
  const [editForm, setEditForm]       = useState({ name: '', price: '', description: '', imageUrl: '' });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setStatus({ type: '', text: '' });
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Cannot reach backend.') });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts, refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently remove this product from catalog?')) return;
    try {
      await deleteProduct(id);
      setStatus({ type: 'success', text: `OK: Product #${id} removed.` });
      fetchProducts();
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Delete failed.') });
    }
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setEditForm({ name: p.name, price: p.price, description: p.description || '', imageUrl: p.imageUrl || '' });
    setStatus({ type: '', text: '' });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const parsedPrice = parseFloat(editForm.price);
    if (Number.isNaN(parsedPrice)) {
      setStatus({ type: 'error', text: 'ERR: Price must be a valid number.' });
      return;
    }
    try {
      await updateProduct(id, {
        name: editForm.name.trim(),
        price: parsedPrice,
        description: editForm.description.trim(),
        imageUrl: editForm.imageUrl.trim() || null,
      });
      setStatus({ type: 'success', text: `OK: Product #${id} updated.` });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Update failed.') });
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      setStatus({ type: 'success', text: `OK: "${product.name}" added to cart.` });
    } catch (err) {
      setStatus({ type: 'error', text: getError(err, 'ERR: Could not add to cart.') });
    }
  };

  if (loading) return (
    <div className="panel">
      <div className="loading-state">
        <div className="loading-bar" />
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading Catalog...</span>
      </div>
    </div>
  );

  return (
    <div className="panel">
      <div className="panel-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div className="section-label">Stock Overview</div>
          <div className="section-title" style={{ fontSize: 22 }}>Catalog</div>
        </div>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 32, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
          {products.length}
          <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)', marginLeft: 6, letterSpacing: '0.1em' }}>ITEMS</span>
        </span>
      </div>

      <div className="panel-body">
        {status.text && (
          <div className={`status-banner ${status.type}`}>{status.text}</div>
        )}

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⬛</div>
            <div className="empty-title">Catalog Empty</div>
            <div>Register your first product using the form.</div>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product, i) => (
              <article
                key={product.id}
                className="product-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {editingId !== product.id ? (
                  <>
                    {product.imageUrl && !brokenImgs[product.id] ? (
                      <div className="product-img-wrap">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          loading="lazy"
                          onError={() => setBrokenImgs(p => ({ ...p, [product.id]: true }))}
                        />
                      </div>
                    ) : (
                      <div className="product-fallback">
                        <span>{getInitials(product.name)}</span>
                      </div>
                    )}

                    <div className="product-id-tag">SKU-{String(product.id).padStart(4, '0')}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">₹{product.price.toFixed(2)}</div>
                    <div className="product-desc">
                      {product.description || 'No description available.'}
                    </div>

                    <div className="card-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>
                        + Cart
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleEditClick(product)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                        Del
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={(e) => handleEditSubmit(e, product.id)} className="inline-edit">
                    <div className="inline-edit-title">⟳ Editing SKU-{String(product.id).padStart(4, '0')}</div>
                    <input
                      className="field-input"
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Name"
                      required
                    />
                    <input
                      className="field-input"
                      type="number"
                      value={editForm.price}
                      onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                      placeholder="Price"
                      min="0" step="0.01" required
                    />
                    <textarea
                      className="field-textarea"
                      value={editForm.description}
                      onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Description"
                    />
                    <input
                      className="field-input"
                      type="url"
                      value={editForm.imageUrl}
                      onChange={e => setEditForm({ ...editForm, imageUrl: e.target.value })}
                      placeholder="Image URL"
                    />
                    <div className="card-actions">
                      <button type="submit" className="btn btn-success btn-sm">Save</button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </form>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
