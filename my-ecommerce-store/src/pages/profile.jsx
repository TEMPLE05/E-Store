// src/pages/Profile.jsx - Mobile-first minimalist black & white design
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, setToken, backendUrl, setCartItems, setShowSearch, setSearch } =
    useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });

        if (res.data.success) {
          setUser(res.data.user);
          setEditedUser(res.data.user);
          fetchOrders();
        } else {
          toast.error(res.data.message || "Failed to load profile");
          if (res.data.message.includes("Authorized")) {
            setToken("");
            navigate("/login");
          }
        }
      } catch (err) {
        console.error("Profile request error:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          setToken("");
          navigate("/login");
        } else {
          toast.error("Error fetching profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, backendUrl, navigate, setToken]);

  // Fetch user orders from backend
  const fetchOrders = async () => {
    if (!token) {
      setOrders([]);
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        {},
        { headers: { token } }
      );
      
      if (res.data?.success) {
        // Make sure we have an array
        const ordersData = Array.isArray(res.data.orders) ? res.data.orders : [];
        setOrders(ordersData);
        console.log("✅ Orders loaded successfully:", ordersData.length);
      } else {
        setOrders([]);
        console.error("❌ Orders failed:", res.data?.message);
      }
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      setOrders([]);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`${backendUrl}/api/user/profile`, 
        editedUser,
        { headers: { token } }
      );

      if (res.data.success) {
        setUser(editedUser);
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    setCartItems({});
    setSearch("");
    setShowSearch(false);
    localStorage.removeItem("token");
    localStorage.removeItem("guestCart");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Helper functions
  const computeOrderTotal = (order) => {
    if (order.amount != null) return order.amount;
    if (Array.isArray(order.items)) {
      return order.items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
    }
    return 0;
  };

  const formatOrderDate = (order) => {
    const date = order.date ? new Date(order.date) : order.createdAt ? new Date(order.createdAt) : null;
    return date ? date.toLocaleDateString() : 'N/A';
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-black bg-gray-100';
      case 'shipped': return 'text-white bg-black';
      case 'processing': return 'text-black bg-gray-200';
      case 'cancelled': return 'text-white bg-gray-800';
      default: return 'text-black bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Failed to load profile</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-black">Profile</h1>
            <p className="text-sm text-gray-500">{user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-black border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats - Mobile Optimized */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black text-white p-4 rounded">
            <div className="text-xs uppercase tracking-wide opacity-80">Orders</div>
            <div className="text-2xl font-bold mt-1">{orders.length}</div>
          </div>
          <div className="border border-gray-200 p-4 rounded">
            <div className="text-xs uppercase tracking-wide text-gray-600">Spent</div>
            <div className="text-2xl font-bold mt-1">
              ${orders.reduce((sum, order) => sum + computeOrderTotal(order), 0).toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto pb-2 -mx-1">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'orders', name: 'Orders' },
            { id: 'settings', name: 'Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 mx-1 text-sm rounded transition ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'border border-gray-200 text-gray-700 hover:border-black'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-bold mb-4">Account Info</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-sm">{user.email}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">
                    {user.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No orders yet</p>
                  <button 
                    onClick={() => navigate('/collection')}
                    className="mt-2 text-sm underline"
                  >
                    Start shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map(order => {
                    const total = computeOrderTotal(order);
                    const orderDate = formatOrderDate(order);
                    
                    return (
                      <div key={order._id} className="border border-gray-200 rounded p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium text-sm">#{order._id.slice(-6)}</div>
                            <div className="text-xs text-gray-500">{orderDate}</div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>
                        <div className="text-sm font-medium">${total.toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Order History</h2>
              <button
                onClick={fetchOrders}
                className="text-sm underline"
              >
                Refresh
              </button>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No orders found</p>
                <button
                  onClick={() => navigate('/collection')}
                  className="bg-black text-white px-6 py-2 rounded"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const total = computeOrderTotal(order);
                  const orderDate = formatOrderDate(order);
                  
                  return (
                    <div key={order._id} className="border border-gray-200 rounded p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold">#{order._id.slice(-8)}</div>
                          <div className="text-sm text-gray-500">{orderDate}</div>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status || 'Processing'}
                        </span>
                      </div>
                      
                      {/* Order Items */}
                      <div className="space-y-2 mb-3">
                        {(order.items && order.items.length > 0) ? order.items.slice(0, 2).map((item, index) => {
                          const itemName = item.name || item.title || 'Product';
                          const itemPrice = Number(item.price || item.unitPrice || 0);
                          const itemQty = Number(item.quantity || item.qty || 1);
                          
                          return (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{itemName} × {itemQty}</span>
                              <span>${(itemPrice * itemQty).toFixed(2)}</span>
                            </div>
                          );
                        }) : (
                          <div className="text-sm text-gray-500">No items recorded</div>
                        )}
                        {order.items && order.items.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="font-bold">Total: ${total.toFixed(2)}</span>
                        <button 
                          onClick={() => navigate(`/orders`)}
                          className="text-sm underline"
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Account Settings</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`text-sm px-4 py-2 rounded transition ${
                  editMode 
                    ? 'border border-gray-400 text-gray-600' 
                    : 'bg-black text-white'
                }`}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={editMode ? editedUser.name || '' : user.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  disabled={!editMode}
                  className="w-full px-3 py-3 border border-gray-200 rounded disabled:bg-gray-50 disabled:text-gray-600 focus:border-black focus:outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={editMode ? editedUser.email || '' : user.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  disabled={!editMode}
                  className="w-full px-3 py-3 border border-gray-200 rounded disabled:bg-gray-50 disabled:text-gray-600 focus:border-black focus:outline-none transition"
                />
              </div>

              {editMode && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditedUser(user);
                    }}
                    className="flex-1 border border-gray-200 text-gray-700 py-3 rounded font-medium hover:border-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Change Password */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-medium mb-3">Security</h3>
                <button className="w-full text-left border border-gray-200 p-4 rounded hover:border-gray-400 transition">
                  <div className="font-medium text-sm">Change Password</div>
                  <div className="text-xs text-gray-500 mt-1">Update your password</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;