import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchProductById, clearSelectedProduct } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct, isLoading } = useAppSelector(state => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Product not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <Card className="p-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {selectedProduct.category}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-gray-600 dark:text-gray-400">
                  {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedProduct.name}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${selectedProduct.price.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedProduct.stock} in stock
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="primary"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center space-x-2"
              disabled={selectedProduct.stock === 0}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </Button>
            <Button variant="secondary" className="px-8">
              Buy Now
            </Button>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="text-gray-900 dark:text-white">{selectedProduct.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                <span className="text-gray-900 dark:text-white">{selectedProduct.stock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                <span className="text-gray-900 dark:text-white">{selectedProduct.rating}/5</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};