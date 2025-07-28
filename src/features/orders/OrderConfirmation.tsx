import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Calendar, CreditCard } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

export const OrderConfirmation: React.FC = () => {
  const { currentOrder } = useAppSelector(state => state.orders);

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No order found</p>
        <Link to="/">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </motion.div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Order #{currentOrder.id}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            {currentOrder.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Order Status</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {currentOrder.status}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Estimated Delivery</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                3-5 business days
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Payment Method</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentOrder.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Order Items
          </h3>
          <div className="space-y-3">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total Amount
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              ${currentOrder.total.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Shipping Address
        </h3>
        <div className="text-gray-600 dark:text-gray-400">
          <p>{currentOrder.shippingAddress.fullName}</p>
          <p>{currentOrder.shippingAddress.address}</p>
          <p>
            {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
            {currentOrder.shippingAddress.zipCode}
          </p>
          <p>{currentOrder.shippingAddress.country}</p>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/">
          <Button variant="outline" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
        <Link to="/orders">
          <Button variant="primary" className="w-full sm:w-auto">
            View All Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};