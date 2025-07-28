import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAppDispatch } from './hooks/redux';
import { checkAuth } from './features/auth/authSlice';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartSidebar } from './components/cart/CartSidebar';

// Feature Components
import { ProductList } from './features/products/ProductList';
import { ProductDetail } from './features/products/ProductDetail';
import { LoginForm } from './features/auth/LoginForm';
import { SignupForm } from './features/auth/SignupForm';
import { CheckoutForm } from './features/checkout/CheckoutForm';
import { OrderConfirmation } from './features/orders/OrderConfirmation';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-confirmation" 
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;