import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle Category checkbox
  const toggleCategory = (e) => {
    const { value } = e.target;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // Toggle Subcategory checkbox
  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSelectedSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // Filter products based on category, subcategory, and search
  const applyFilters = () => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSubCategories.some((sub) =>
          p.subCategory?.toLowerCase() === sub.toLowerCase()
        )
      );
    }

    setFilteredProducts(filtered);
  };

  // Sort products by price
  const sortProducts = (type) => {
    const sorted = [...filteredProducts];

    switch (type) {
      case 'price_low_to_high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_to_low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilters();
        return;
    }

    setFilteredProducts(sorted);
  };

  // Watch for filter change
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      applyFilters();
    }
  }, [selectedCategories, selectedSubCategories, search, showSearch, products]);

  // Watch for sort change
  useEffect(() => {
    sortProducts(sortType);
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 px-4 sm:px-10 py-10 border-t bg-white min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-full sm:w-64">
        <p
          className="flex items-center justify-between text-lg font-semibold text-gray-800 cursor-pointer mb-4"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="toggle"
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>

        <div className={`${showFilter ? '' : 'hidden'} sm:block transition`}>
          {/* Category Filter */}
          <div className="border border-gray-300 rounded-lg p-4 mb-5 bg-gray-50">
            <p className="mb-3 text-sm font-semibold text-gray-800">CATEGORIES</p>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {['Men', 'Women', 'Kids'].map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={category}
                    onChange={toggleCategory}
                    checked={selectedCategories.includes(category)}
                    className="accent-black"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="mb-3 text-sm font-semibold text-gray-800">TYPES</p>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                    checked={selectedSubCategories.includes(type)}
                    className="accent-black"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Section */}
      <section className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Title text1="OUR" text2="COLLECTIONS" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="price_low_to_high">Sort by: Price | Low to High</option>
            <option value="price_high_to_low">Sort by: Price | High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(filteredProducts) &&
            filteredProducts.map((item, idx) => (
              <ProductItem
                key={idx}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Collection;
