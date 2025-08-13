// src/pages/Orders.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

/**
 * Orders page:
 * - Fetches user orders from backend with token
 * - Collapsible list, mobile-first, black & white look
 * - "View Product" button for each item -> /product/:id
 */

const statusBadge = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "processing") return { label: "Processing", classes: "bg-gray-100 text-gray-800" };
  if (s === "shipped") return { label: "Shipped", classes: "bg-gray-100 text-gray-800" };
  if (s === "delivered") return { label: "Delivered", classes: "bg-gray-900 text-white" };
  if (s === "cancelled") return { label: "Cancelled", classes: "bg-red-100 text-red-700" };
  return { label: status || "Pending", classes: "bg-gray-100 text-gray-800" };
};

const Orders = () => {
  const { token, backendUrl, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null); // which order is expanded
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!token) {
      setOrders([]);
      setLoading(false);
      setErrorMsg("You must be logged in to view orders.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        {},
        { headers: { token } }
      );
      if (res.data?.success) {
        // Make sure we have an array
        setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      } else {
        setOrders([]);
        setErrorMsg(res.data?.message || "Failed to load orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      setErrorMsg(err?.response?.data?.message || err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // run on mount and when token/backendUrl changes
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, backendUrl]);

  const toggleOrder = (id) => setOpenOrderId((prev) => (prev === id ? null : id));

  const computeOrderTotal = (order) => {
    if (order.amount != null) return order.amount;
    if (Array.isArray(order.items)) {
      return order.items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
    }
    return 0;
  };

  return (
    <div className="px-4 py-12 min-h-[70vh] border-t bg-white">
      <Title text1="YOUR" text2="ORDERS" />

      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="text-sm text-gray-600">Orders associated with your account</div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="text-xs border border-gray-800 px-3 py-1 rounded-md hover:bg-gray-100 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-700">Loading your orders…</div>
      ) : errorMsg ? (
        <div className="text-center text-red-600 py-8">{errorMsg}</div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-16 text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const total = computeOrderTotal(order);
            const createdAt = order.date ? new Date(order.date) : order.createdAt ? new Date(order.createdAt) : null;

            return (
              <div
                key={order._id}
                className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-xs text-gray-500">Order</div>
                    <div className="text-sm font-medium text-gray-900">{order._id}</div>
                    {createdAt && (
                      <div className="text-xs text-gray-500 mt-1">{createdAt.toLocaleString()}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-sm font-bold text-gray-900">{currency}{Number(total).toLocaleString()}</div>
                    </div>

                    <div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(order.status).classes}`}>
                        {statusBadge(order.status).label}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleOrder(order._id)}
                      className="text-xs px-3 py-1 border border-gray-800 rounded-md hover:bg-gray-100 transition"
                    >
                      {openOrderId === order._id ? "Hide items" : `View items (${(order.items || []).length})`}
                    </button>
                  </div>
                </div>

                {/* Collapsible items list */}
                {openOrderId === order._id && (
                  <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
                    {(order.items && order.items.length > 0) ? order.items.map((it, idx) => {
                      // item shape may vary; handle common keys
                      const img = (it.image && it.image[0]) || (it.images && it.images[0]) || "";
                      const name = it.name || it.title || "Product";
                      const price = Number(it.price || it.unitPrice || 0);
                      const qty = Number(it.quantity || it.qty || 1);
                      const size = it.size || "-";

                      // prefer real product id (it._id or it.productId)
                      const productId = it._id || it.productId || it.product?._id;

                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {img ? (
                              <img src={img} alt={name} className="object-cover w-full h-full" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">Size: {size} · Qty: {qty}</div>
                          </div>

                          <div className="text-sm font-semibold text-gray-900">
                            {currency}{(price * qty).toLocaleString()}
                          </div>

                          <div>
                            {productId ? (
                              <button
                                onClick={(e) => { e.stopPropagation(); navigate(`/product/${productId}`); }}
                                className="text-xs px-3 py-1 border border-gray-800 rounded-md hover:bg-gray-100 transition"
                              >
                                View Product
                              </button>
                            ) : null}
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-sm text-gray-500">No items recorded in this order.</div>
                    )}
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

export default Orders;
// Note: This code assumes that the backend API returns orders in a consistent format.
// Adjust the item properties and order structure as needed based on your actual API response.