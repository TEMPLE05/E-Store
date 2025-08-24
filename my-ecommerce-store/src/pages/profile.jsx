// src/pages/Profile.jsx - Fixed to handle auth properly
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
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      console.log("=== Profile Frontend Debug ===");
      console.log("Token:", token ? "Present" : "Missing");
      console.log("Backend URL:", backendUrl);

      try {
        setLoading(true);
        
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });

        console.log("Profile response:", res.data);

        if (res.data.success) {
          setUser(res.data.user);
          console.log("✅ Profile loaded successfully");
        } else {
          console.error("❌ Profile failed:", res.data.message);
          toast.error(res.data.message || "Failed to load profile");
          
          // If unauthorized, redirect to login
          if (res.data.message.includes("Authorized")) {
            setToken("");
            navigate("/login");
          }
        }
      } catch (err) {
        console.error("❌ Profile request error:", err);
        console.error("Error response:", err.response?.data);
        
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

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <p className="text-red-600">Failed to load profile. Please try again.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="space-y-3">
        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        {user.createdAt && (
          <div>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;