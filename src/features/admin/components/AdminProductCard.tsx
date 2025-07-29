import React, { useState } from "react";
import { Product } from "../../../types";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteAdminProduct } from "../services/dashboardService";
import { ConfirmModal } from "./ConfirmationModal";


interface Props {
  product: Product;
  onEdit: (product: Product) => void;
}

export const AdminProductCard: React.FC<Props> = ({ product, onEdit }) => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteAdminProduct(product.id));
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ${product.price}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {product.category.name}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-sm font-medium ${
              product.stock && product.stock < 10
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {product.stock ?? 0} in stock
          </p>
          <div className="flex gap-2 mt-2 justify-end">
            <button
              className="text-blue-500 text-xs hover:underline"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button
              className="text-red-500 text-xs hover:underline"
              onClick={() => setShowConfirm(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.title}"?`}
      />
    </>
  );
};
