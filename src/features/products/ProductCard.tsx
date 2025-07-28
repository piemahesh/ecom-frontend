import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../cart/cartSlice';
import type { Product } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card hover className="p-4 h-full flex flex-col">
        <div className="relative mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {product.category.name}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.stock} in stock
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                className="flex items-center space-x-1"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </Link>
  );
};