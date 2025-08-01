import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    let cp = products.slice();
    if (showSearch && search) {
      cp = cp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (Category.length) cp = cp.filter((p) => Category.includes(p.category));
    if (SubCategory.length) cp = cp.filter((p) =>
      SubCategory.includes(p.subCategory)
    );
    setFilteredProducts(cp);
  };

  const sortProducts = (type) => {
    const cp = filteredProducts.slice();
    if (type === 'price_low_to_high') {
      cp.sort((a, b) => a.price - b.price);
    } else if (type === 'price_high_to_low') {
      cp.sort((a, b) => b.price - a.price);
    } else {
      applyFilters();
      return;
    }
    setFilteredProducts(cp);
  };

  useEffect(applyFilters, [Category, SubCategory, search, showSearch]);
  useEffect(() => sortProducts(sortType), [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 px-4 sm:px-10 py-10 border-t bg-white min-h-screen">
      {/* ——— Sidebar Filters ——— */}
      <aside className="w-full sm:w-64">
        <p
          className="flex items-center justify-between text-lg font-semibold text-gray-800 cursor-pointer mb-4"
          onClick={() => setShowFilter((f) => !f)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="toggle"
            className={`h-3 sm:hidden transition-transform duration-300 ${
              showFilter ? 'rotate-90' : ''
            }`}
          />
        </p>

        <div className={`${showFilter ? '' : 'hidden'} sm:block transition`}>
          <div className="border border-gray-300 rounded-lg p-4 mb-5 bg-gray-50">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {['Men', 'Women', 'Kids'].map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={c}
                    onChange={toggleCategory}
                    checked={Category.includes(c)}
                    className="accent-black"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="mb-3 text-sm font-semibold text-gray-800">TYPES</p>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((sc) => (
                <label
                  key={sc}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={sc}
                    onChange={toggleSubCategory}
                    checked={SubCategory.includes(sc)}
                    className="accent-black"
                  />
                  {sc}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ——— Products & Sorting ——— */}
      <section className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Title text1="OUR" text2="COLLECTIONS" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="price_low_to_high">
              Sort by: Price | Low to High
            </option>
            <option value="price_high_to_low">
              Sort by: Price | High to Low
            </option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item, idx) => (
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
