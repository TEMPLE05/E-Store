// src/pages/AdminOrders.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (data?.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data?.message || "Failed to fetch orders.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      );
      if (data?.success) {
        toast.success("Order status updated.");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      } else {
        toast.error(data?.message || "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/delete`,
        { orderId },
        { headers: { token } }
      );
      if (data?.success) {
        toast.success("Order deleted.");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      } else {
        toast.error(data?.message || "Failed to delete order.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order._id;
            return (
              <div
                key={order._id}
                className="border rounded-lg shadow-sm bg-white overflow-hidden"
              >
                {/* Summary row */}
                <div
                  className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() =>
                    setExpandedOrder(isExpanded ? null : order._id)
                  }
                >
                  <div className="flex flex-col">
                    <span className="font-medium">Order #{order._id}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.date || order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-green-600">
                      ${order.amount}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="p-4 border-t bg-gray-50 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Address & User Info */}
                      <div>
                        <h4 className="font-semibold mb-1">Customer Info</h4>
                        <p>{order.address}</p>
                        {order.phone && <p>📞 {order.phone}</p>}
                        {order.email && <p>✉️ {order.email}</p>}
                        {order.paymentMethod && (
                          <p>💳 {order.paymentMethod}</p>
                        )}
                      </div>

                      {/* Status & Actions */}
                      <div>
                        <h4 className="font-semibold mb-1">Manage</h4>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                          className="border rounded p-1 text-sm mb-2 w-full"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Items</h4>
                      <ul className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between items-center bg-white p-2 rounded shadow-sm"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 rounded object-cover border"
                              />
                              <div>
                                <p className="font-medium text-base">{item.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                {item.price && (
                                  <p className="text-sm text-gray-800 font-semibold">
                                    ${item.price}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
