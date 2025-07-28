import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../cartSlice';
import type { Product } from '../../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  category: 'Electronics',
  stock: 10,
  rating: 4.5,
  reviews: 100,
};

describe('cartSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it('should handle adding a product to cart', () => {
    store.dispatch(addToCart(mockProduct));
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('1');
    expect(state.items[0].quantity).toBe(1);
    expect(state.total).toBe(99.99);
  });

  it('should handle adding the same product multiple times', () => {
    store.dispatch(addToCart(mockProduct));
    store.dispatch(addToCart(mockProduct));
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.total).toBe(199.98);
  });

  it('should handle removing a product from cart', () => {
    store.dispatch(addToCart(mockProduct));
    store.dispatch(removeFromCart('1'));
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });

  it('should handle updating quantity', () => {
    store.dispatch(addToCart(mockProduct));
    store.dispatch(updateQuantity({ id: '1', quantity: 3 }));
    
    const state = store.getState().cart;
    expect(state.items[0].quantity).toBe(3);
    expect(state.total).toBe(299.97);
  });

  it('should handle clearing cart', () => {
    store.dispatch(addToCart(mockProduct));
    store.dispatch(clearCart());
    
    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });
});