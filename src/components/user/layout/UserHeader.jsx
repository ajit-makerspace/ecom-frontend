'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { formatCurrency } from '@/lib/utils';
import {
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  Truck,
  Store,
  User,
  Repeat,
  Menu,
} from 'lucide-react';

export function UserHeader() {
  const router = useRouter();
  const {
    categories,
    cartCount,
    cartSubtotal,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartDrawerOpen,
  } = useUserPortal();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/user/products?search=${encodeURIComponent(searchQuery)}&cat=${selectedCategory}`);
  };

  return (
    <header className="w-full font-sans bg-white border-b border-slate-200">
      {/* 1. Top Utility Bar (Matching Electro Top Bar) */}
      <div className="bg-white border-b border-slate-200/80 text-slate-500 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Welcome Message */}
          <div className="text-[11px] font-medium text-slate-600">
            Welcome to MakerSpace Shop
          </div>

          {/* Right Utility Links with Icons */}
          <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-600">
            <Link href="/user/products" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Store Locator</span>
            </Link>
            <Link href="/user/products" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              <span>Track Your Order</span>
            </Link>
            <Link href="/user/products" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span>Shop</span>
            </Link>
            <Link href="/admin/login" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (Logo, Hamburger, Search, Action Badges) */}
      <div className="py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Hamburger Menu */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/user" className="flex items-center gap-0.5">
              <span className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 font-sans">
                makerspace<span className="text-amber-500">shop</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FED700] inline-block self-end mb-1.5" />
            </Link>

            <button
              type="button"
              className="p-1.5 text-slate-700 hover:text-slate-950 transition-colors hidden sm:block"
              title="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar with Integrated Category Selector */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl flex items-center rounded-full border-2 border-[#FED700] bg-white overflow-hidden shadow-2xs">
            <input
              type="text"
              placeholder="Search for Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-5 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none"
            />

            {/* Category Dropdown */}
            <div className="relative border-l border-slate-200 bg-white shrink-0 hidden sm:block">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer max-w-[170px] truncate"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Solid Yellow Search Button */}
            <button
              type="submit"
              className="w-11 h-10 bg-[#FED700] hover:bg-amber-400 text-slate-900 font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0 rounded-r-full"
            >
              <Search className="w-4 h-4 text-slate-900" />
            </button>
          </form>

          {/* Right Action Icons (Compare, Wishlist, Profile, Cart) */}
          <div className="flex items-center gap-5 shrink-0 justify-end">
            {/* Compare Action */}
            <Link href="/user/products" className="relative p-1.5 text-slate-700 hover:text-slate-950 transition-colors">
              <Repeat className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FED700] text-slate-950 font-black text-[9px] flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Wishlist Action */}
            <Link href="/user/wishlist" className="relative p-1.5 text-slate-700 hover:text-slate-950 transition-colors">
              <Heart className="w-5 h-5 text-slate-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FED700] text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Profile */}
            <Link href="/admin/login" className="p-1.5 text-slate-700 hover:text-slate-950 transition-colors">
              <User className="w-5 h-5 text-slate-700" />
            </Link>

            {/* Cart Trigger with Price Tag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 text-slate-900 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="relative p-1.5">
                <ShoppingBag className="w-5 h-5 text-slate-900" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FED700] text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900 hidden sm:inline">
                {formatCurrency(cartSubtotal)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
