import React, { useEffect, useState } from "react";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import {
  fetchAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  adminProduct,
} from "../../features/admin/adminProductsSlice";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../features/orders/ordersSlice";

import { AdminProductForm, ProductFormValues } from "./AdminProductForm";
import { AdminProductCard } from "../../features/admin/AdminProductCard";
import { Card } from "../../components/ui/Card";
import { Modal } from "./Modal";

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
    const updatedData: adminProduct = {
      ...data,
      id: editData?.id || "",
      category: {
        id: Number(data.category), // convert string to number
        name: "", // placeholder if name is not used in backend
      },
    };

    if (editData) {
      await dispatch(updateAdminProduct(updatedData));
    } else {
      await dispatch(addAdminProduct(updatedData));
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
      category: String(
        typeof product.category === "object"
          ? product.category.id
          : product.category
      ),
      image: product.image as any, //
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

        {/* MANAGE PRODUCTS */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Manage Products
            </h2>
            <button
              className="bg-blue-800  text-white font-bold text-lg hover:bg-white hover:text-blue-700  p-1 rounded-md"
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
            >
              + Add Product
            </button>
          </div>

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

      {/* MODAL FORM */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditData(null);
        }}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {editData ? "Edit Product" : "Add Product"}
        </h2>
        <AdminProductForm
          initialData={editData ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditData(null);
            setShowForm(false);
          }}
        />
      </Modal>
    </div>
  );
};
