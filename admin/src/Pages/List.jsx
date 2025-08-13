import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [removingId, setRemovingId] = useState(null); // for animation

  // Fetch product list
  const fetchList = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/products/list`);
      if (data?.success) {
        setProducts(data.products || []);
      } else {
        toast.error(data?.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong.");
    }
  }, []);

  // Remove product by ID
  const removeProduct = async (id) => {
    if (!token) return toast.error("Unauthorized");

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    // Start animation
    setRemovingId(id);

    // Remove visually after short delay (for fade-out effect)
    setTimeout(() => {
      setProducts((prev) => prev.filter((product) => product._id !== id));
    }, 300);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/products/remove`,
        { id },
        { headers: { token } }
      );

      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data?.message || "Could not delete product.");
        fetchList(); // restore list if deletion failed
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong.");
      fetchList(); // restore list if request failed
    } finally {
      setRemovingId(null);
    }
  };

  // Load products on mount
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div>
      <p className="mb-2 font-medium">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Items */}
        {products.map((item) => (
          <div
            key={item._id}
            className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm transition-all duration-300 ${
              removingId === item._id ? "opacity-0 scale-95" : "opacity-100"
            }`}
          >
            <img
              src={item?.image?.[0]}
              alt={item?.name || "product image"}
              className="w-12 h-12 object-cover rounded-sm"
            />
            <p>{item?.name}</p>
            <p>{item?.category}</p>
            <p>
              {currency}
              {item?.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 text-right md:text-center font-bold"
              title="Remove Product"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
