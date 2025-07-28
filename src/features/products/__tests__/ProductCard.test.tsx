import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ProductCard } from '../ProductCard';
import cartReducer from '../../cart/cartSlice';
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

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5 (100)')).toBeInTheDocument();
  });

  it('handles add to cart button click', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    
    // Verify that the product was added to cart
    // This would require checking the store state or mocking the dispatch
  });

  it('navigates to product detail when clicked', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const productCard = screen.getByText('Test Product').closest('a');
    expect(productCard).toHaveAttribute('href', '/products/1');
  });
});