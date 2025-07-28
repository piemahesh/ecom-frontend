// import React, { useEffect } from 'react';
// import { Package, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';
// import { useAppSelector, useAppDispatch } from '../../hooks/redux';
// import { fetchProducts } from '../products/productsSlice';
// import { fetchOrders, updateOrderStatus } from '../orders/ordersSlice';
// import { Card } from '../../components/ui/Card';

// export const AdminDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { items: products } = useAppSelector(state => state.products);
//   const { orders } = useAppSelector(state => state.orders);

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
//   const totalOrders = orders.length;
//   const totalProducts = products.length;
//   const pendingOrders = orders.filter(order => order.status === 'pending').length;

//   const handleStatusUpdate = (orderId: string, newStatus: string) => {
//     dispatch(updateOrderStatus({
//       id: orderId,
//       status: newStatus as any
//     }));
//   };

//   const stats = [
//     {
//       name: 'Total Revenue',
//       value: `$${totalRevenue.toFixed(2)}`,
//       icon: DollarSign,
//       color: 'bg-green-500',
//     },
//     {
//       name: 'Total Orders',
//       value: totalOrders.toString(),
//       icon: ShoppingCart,
//       color: 'bg-blue-500',
//     },
//     {
//       name: 'Total Products',
//       value: totalProducts.toString(),
//       icon: Package,
//       color: 'bg-purple-500',
//     },
//     {
//       name: 'Pending Orders',
//       value: pendingOrders.toString(),
//       icon: TrendingUp,
//       color: 'bg-orange-500',
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
//         Admin Dashboard
//       </h1>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat) => (
//           <Card key={stat.name} className="p-6">
//             <div className="flex items-center">
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <stat.icon className="w-6 h-6 text-white" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                   {stat.name}
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {stat.value}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Recent Orders */}
//         <Card className="p-6">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//             Recent Orders
//           </h2>
//           <div className="space-y-4">
//             {orders.slice(0, 5).map((order) => (
//               <div key={order.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-medium text-gray-900 dark:text-white">
//                       Order #{order.id}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium text-gray-900 dark:text-white">
//                       ${order.total.toFixed(2)}
//                     </p>
//                     <select
//                       value={order.status}
//                       onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
//                       className="text-xs mt-1 px-2 py-1 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {order.items.length} item(s) • {order.shippingAddress.fullName}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Product Inventory */}
//         <Card className="p-6">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//             Product Inventory
//           </h2>
//           <div className="space-y-4">
//             {products.slice(0, 5).map((product) => (
//               <div key={product.id} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="w-10 h-10 object-cover rounded-lg"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900 dark:text-white">
//                       {product.title}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       ${product.price}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-sm font-medium ${
//                     product.stock < 10
//                       ? 'text-red-600 dark:text-red-400'
//                       : 'text-green-600 dark:text-green-400'
//                   }`}>
//                     {product.stock} in stock
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {product.category.name}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// src/pages/admin/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import {
  fetchAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../../features/admin/adminProductsSlice";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../features/orders/ordersSlice";

import { AdminProductForm, ProductFormValues } from "./AdminProductForm";
import { AdminProductCard } from "../../features/admin/AdminProductCard";
import { Card } from "../../components/ui/Card";

export const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items: adminProducts, isLoading: loadingProducts } = useAppSelector(
    (state) => state.adminproducts
  );
  const { orders } = useAppSelector((state) => state.orders);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<ProductFormValues | null>(null);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSubmit = async (data: ProductFormValues) => {
    if (editData) {
      await dispatch(
        updateAdminProduct({
          id: editData.id!,
          data: {
            ...data,
            price: data.price.toString(),
            stock: data.stock.toString(),
          },
        })
      );
    } else {
      await dispatch(addAdminProduct(data));
    }
    setShowForm(false);
    setEditData(null);
    dispatch(fetchAdminProducts());
  };

  const handleEdit = (product: any) => {
    setEditData({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category.id,
      image: undefined,
    });
    setShowForm(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus as any }));
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const totalProducts = adminProducts.length;

  const stats = [
    {
      name: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      name: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      name: "Total Products",
      value: totalProducts.toString(),
      icon: Package,
      color: "bg-purple-500",
    },
    {
      name: "Pending Orders",
      value: pendingOrders.toString(),
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Dashboard
      </h1>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ORDERS & PRODUCT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT ORDERS */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className="text-xs mt-1 px-2 py-1 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {order.items.length} item(s) •{" "}
                  {order.shippingAddress.fullName}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* ADD/EDIT PRODUCT FORM */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Manage Products
            </h2>
            <button
              className="text-red-500 text-xs hover:underline"
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
            >
              + Add Product
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <AdminProductForm
                initialData={editData ?? undefined}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setEditData(null);
                  setShowForm(false);
                }}
              />
            </div>
          )}

          {loadingProducts ? (
            <p>Loading...</p>
          ) : adminProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No products found.</p>
          ) : (
            <div className="space-y-4">
              {adminProducts.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => handleEdit(product)}
                  onDelete={() => dispatch(deleteAdminProduct(product.id))}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
