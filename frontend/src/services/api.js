import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Products
export const getAllProducts  = ()          => axios.get(`${BASE_URL}/products`);
export const addProduct      = (product)   => axios.post(`${BASE_URL}/products`, product);
export const updateProduct   = (id, data)  => axios.put(`${BASE_URL}/products/${id}`, data);
export const deleteProduct   = (id)        => axios.delete(`${BASE_URL}/products/${id}`);

// Cart
export const addToCart       = (item)      => axios.post(`${BASE_URL}/cart/add`, item);
export const getCartItems    = ()          => axios.get(`${BASE_URL}/cart`);
export const removeFromCart  = (id)        => axios.delete(`${BASE_URL}/cart/${id}`);

// Orders
export const placeOrder      = ()          => axios.post(`${BASE_URL}/orders/place`);
export const getAllOrders     = ()          => axios.get(`${BASE_URL}/orders`);
