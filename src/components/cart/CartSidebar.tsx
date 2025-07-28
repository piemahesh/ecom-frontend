import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeCart, removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total, isOpen } = useAppSelector(state => state.cart);

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => dispatch(closeCart())}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shopping Cart
              </h2>
              <button
                onClick={() => dispatch(closeCart())}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.product.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          ${item.product.price}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-1 bg-white dark:bg-gray-900 rounded text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded ml-2"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total: ${total.toFixed(2)}
                  </span>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};