'use client';

import React, { useState } from 'react';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { ProductCard } from '@/components/user/products/ProductCard';
import { Search, Filter, Layers, SlidersHorizontal, Check } from 'lucide-react';

export default function ShopAllProductsPage() {
  const { products, categories, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useUserPortal();
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = products.filter((product) => {
    const matchesCat = selectedCatFilter === 'all' || product.categorySlug === selectedCatFilter;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <UserLayout>
      <div className="space-y-6 font-sans">
        {/* Page Banner Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 font-extrabold text-[10px] uppercase tracking-wider border border-amber-400/30 inline-block mb-2">
              CATALOG SEARCH
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Shop All Products & Kits
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Browse through our complete catalog of equipment across 21 maker disciplines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Catalog Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar Filter Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Filter Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Filter className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Filter by 21 Categories
                </h3>
              </div>

              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCatFilter('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                    selectedCatFilter === 'all'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>All 21 Categories</span>
                  {selectedCatFilter === 'all' && <Check className="w-3.5 h-3.5" />}
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatFilter(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left ${
                      selectedCatFilter === cat.slug
                        ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({cat.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80">
              <span>Showing <strong>{sortedProducts.length}</strong> products</span>
              {selectedCatFilter !== 'all' && (
                <button
                  onClick={() => setSelectedCatFilter('all')}
                  className="text-amber-600 font-bold hover:underline"
                >
                  Clear Category Filter
                </button>
              )}
            </div>

            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
                <p className="font-bold text-slate-800 text-sm">No products match your search or filter</p>
                <button
                  onClick={() => {
                    setSelectedCatFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
