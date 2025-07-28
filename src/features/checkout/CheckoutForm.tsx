import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { createOrder } from '../orders/ordersSlice';
import { clearCart } from '../cart/cartSlice';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CreditCard, Lock } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  cardNumber: z.string().min(16, 'Card number is required'),
  expiryDate: z.string().min(5, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV is required'),
  cardName: z.string().min(2, 'Cardholder name is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);
  const { isLoading } = useAppSelector(state => state.orders);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const shippingAddress = {
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      };

      await dispatch(createOrder({
        items,
        total,
        shippingAddress,
        paymentMethod: `**** **** **** ${data.cardNumber.slice(-4)}`,
      })).unwrap();

      dispatch(clearCart());
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                {...register('fullName')}
                error={errors.fullName?.message}
                placeholder="John Doe"
              />

              <Input
                label="Address"
                {...register('address')}
                error={errors.address?.message}
                placeholder="123 Main St"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  {...register('city')}
                  error={errors.city?.message}
                  placeholder="New York"
                />
                <Input
                  label="State"
                  {...register('state')}
                  error={errors.state?.message}
                  placeholder="NY"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ZIP Code"
                  {...register('zipCode')}
                  error={errors.zipCode?.message}
                  placeholder="10001"
                />
                <Input
                  label="Country"
                  {...register('country')}
                  error={errors.country?.message}
                  placeholder="United States"
                />
              </div>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Card Number"
                {...register('cardNumber')}
                error={errors.cardNumber?.message}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />

              <Input
                label="Cardholder Name"
                {...register('cardName')}
                error={errors.cardName?.message}
                placeholder="John Doe"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  {...register('expiryDate')}
                  error={errors.expiryDate?.message}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                <Input
                  label="CVV"
                  {...register('cvv')}
                  error={errors.cvv?.message}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Lock className="w-4 h-4 mr-2" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </Card>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Place Order - ${total.toFixed(2)}
          </Button>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${(total * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};