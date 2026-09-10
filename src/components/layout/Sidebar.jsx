'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  ChevronDown,
  ChevronUp,
  LogOut,
  Image as ImageIcon,
  Sliders,
  BookOpen,
  ShoppingBag as BagIcon,
  Tag,
  Settings,
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  onOpenLogoutModal,
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Accordion Expand States (Collapsed by default, expands only on user click)
  const [openAccordions, setOpenAccordions] = useState({
    homeSlides: false,
    category: false,
    products: false,
    banners: false,
    blogs: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isCategoryActive = pathname === '/modules' || pathname === '/categories' || pathname.includes('categor');
  const isProductsActive = pathname === '/products';
  const isCustomersActive = pathname === '/customers';
  const isOrdersActive = pathname === '/orders';
  const isDashboardActive = pathname === '/';

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 bg-[#1E3A5F] text-slate-100 border-r border-white/10 transition-all duration-300 flex flex-col shadow-md',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Logo Header - Matching CLASSYSHOP Logo */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden font-bold"
          >
            {/* Speed Shopping Bag Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-900/30 shrink-0">
              <BagIcon className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tight text-white uppercase">
                  CLASSY<span className="text-rose-400">SHOP</span>
                </span>
                <span className="text-[9px] font-extrabold text-slate-300 tracking-wider uppercase mt-0.5">
                  BIG MEGA STORE
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto text-xs font-semibold">
          {/* Dashboard */}
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150',
              isDashboardActive
                ? 'bg-white/15 text-white font-bold shadow-xs'
                : 'text-slate-200 hover:bg-white/10 hover:text-white'
            )}
          >
            <LayoutDashboard className={cn('w-4 h-4 shrink-0', isDashboardActive ? 'text-white' : 'text-slate-300')} />
            {!isCollapsed && <span className="flex-1">Dashboard</span>}
          </Link>

          {/* Home Slides Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('homeSlides')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-slate-300 shrink-0" />
                {!isCollapsed && <span>Home Slides</span>}
              </div>
              {!isCollapsed && (
                openAccordions.homeSlides ? <ChevronUp className="w-3.5 h-3.5 text-slate-300" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
            {!isCollapsed && openAccordions.homeSlides && (
              <div className="ml-7 mt-1 space-y-1 pl-2 border-l border-white/15">
                <Link
                  href="/#slides"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                >
                  • Home Slides List
                </Link>
              </div>
            )}
          </div>

          {/* Category Accordion (EXPANDED BY DEFAULT) */}
          <div>
            <button
              onClick={() => toggleAccordion('category')}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all',
                isCategoryActive ? 'text-white font-bold bg-white/15' : 'text-slate-200 hover:bg-white/10 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Layers className={cn('w-4 h-4 shrink-0', isCategoryActive ? 'text-white' : 'text-slate-300')} />
                {!isCollapsed && <span>Category</span>}
              </div>
              {!isCollapsed && (
                openAccordions.category ? <ChevronUp className="w-3.5 h-3.5 text-slate-300" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>

            {!isCollapsed && openAccordions.category && (
              <div className="ml-6 mt-1 space-y-1 pl-2 border-l-2 border-white/15">
                {/* Module List */}
                <Link
                  href="/modules"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                    pathname === '/modules'
                      ? 'text-white font-bold bg-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="text-slate-400 text-[10px]">•</span>
                  <span>Module List</span>
                </Link>

                {/* Category List */}
                <Link
                  href="/categories"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                    pathname === '/categories' || pathname === '/category/list'
                      ? 'text-white font-bold bg-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="text-slate-400 text-[10px]">•</span>
                  <span>Category List</span>
                </Link>

                {/* Sub Category List */}
                <Link
                  href="/sub-categories"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                    pathname === '/sub-categories' || pathname === '/category/sub-list'
                      ? 'text-white font-bold bg-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="text-slate-400 text-[10px]">•</span>
                  <span>Sub Category List</span>
                </Link>
              </div>
            )}
          </div>

          {/* Products Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('products')}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all',
                isProductsActive ? 'text-white font-bold bg-white/15' : 'text-slate-200 hover:bg-white/10 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Tag className={cn('w-4 h-4 shrink-0', isProductsActive ? 'text-white' : 'text-slate-300')} />
                {!isCollapsed && <span>Products</span>}
              </div>
              {!isCollapsed && (
                openAccordions.products ? <ChevronUp className="w-3.5 h-3.5 text-slate-300" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
            {!isCollapsed && openAccordions.products && (
              <div className="ml-6 mt-1 space-y-1 pl-2 border-l-2 border-white/15">
                <Link
                  href="/products"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                    pathname === '/products' ? 'text-white font-bold bg-white/20' : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="text-slate-400 text-[10px]">•</span>
                  <span>Product List</span>
                </Link>
              </div>
            )}
          </div>

          {/* Users */}
          <Link
            href="/customers"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all',
              isCustomersActive ? 'bg-white/15 text-white font-bold' : 'text-slate-200 hover:bg-white/10 hover:text-white'
            )}
          >
            <Users className={cn('w-4 h-4 shrink-0', isCustomersActive ? 'text-white' : 'text-slate-300')} />
            {!isCollapsed && <span className="flex-1">Users</span>}
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all',
              isOrdersActive ? 'bg-white/15 text-white font-bold' : 'text-slate-200 hover:bg-white/10 hover:text-white'
            )}
          >
            <Package className={cn('w-4 h-4 shrink-0', isOrdersActive ? 'text-white' : 'text-slate-300')} />
            {!isCollapsed && <span className="flex-1">Orders</span>}
          </Link>

          {/* Banners Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('banners')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-slate-300 shrink-0" />
                {!isCollapsed && <span>Banners</span>}
              </div>
              {!isCollapsed && (
                openAccordions.banners ? <ChevronUp className="w-3.5 h-3.5 text-slate-300" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
          </div>

          {/* Blogs Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('blogs')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-slate-300 shrink-0" />
                {!isCollapsed && <span>Blogs</span>}
              </div>
              {!isCollapsed && (
                openAccordions.blogs ? <ChevronUp className="w-3.5 h-3.5 text-slate-300" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
          </div>

          {/* Manage Logo */}
          <Link
            href="/settings"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all"
          >
            <Settings className="w-4 h-4 text-slate-300 shrink-0" />
            {!isCollapsed && <span className="flex-1">Manage Logo</span>}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => {
              if (onOpenLogoutModal) {
                onOpenLogoutModal();
              } else {
                api.logout();
                window.location.href = '/login';
              }
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-rose-500/20 hover:text-rose-200 transition-all"
          >
            <LogOut className="w-4 h-4 text-slate-300 shrink-0" />
            {!isCollapsed && <span className="flex-1 text-left">Logout</span>}
          </button>
        </nav>
      </aside>
    </>
  );
}
