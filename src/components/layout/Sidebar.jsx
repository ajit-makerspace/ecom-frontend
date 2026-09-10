'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
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

  // Accordion Expand States (Category and Products open by default)
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

      {/* Sidebar Container matching uploaded color (#002740 / deep navy) */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 bg-[#002740] text-slate-100 border-r border-[#0B3B5E] transition-all duration-300 flex flex-col shadow-lg',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Logo Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-[#0B3B5E]">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden font-bold"
          >
            {/* Speed Shopping Bag Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-950/40 shrink-0">
              <BagIcon className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tight text-white uppercase">
                  CLASSY<span className="text-rose-400">SHOP</span>
                </span>
                <span className="text-[9px] font-extrabold text-[#7E98AF] tracking-wider uppercase mt-0.5">
                  BIG MEGA STORE
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto text-xs font-semibold">
          {/* Dashboard - Commented Out
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-150',
              isDashboardActive
                ? 'bg-[#244869] border border-[#3D668A]/60 text-white font-bold shadow-sm'
                : 'text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white'
            )}
          >
            <LayoutDashboard className={cn('w-4.5 h-4.5 shrink-0', isDashboardActive ? 'text-white' : 'text-[#7E98AF]')} />
            {!isCollapsed && <span className="flex-1">Dashboard</span>}
          </Link>
          */}

          {/* Home Slides Accordion - Commented Out
          <div>
            <button
              onClick={() => toggleAccordion('homeSlides')}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4.5 h-4.5 text-[#7E98AF] shrink-0" />
                {!isCollapsed && <span>Home Slides</span>}
              </div>
              {!isCollapsed && (
                openAccordions.homeSlides ? <ChevronUp className="w-4 h-4 text-[#7E98AF]" /> : <ChevronDown className="w-4 h-4 text-[#7E98AF]" />
              )}
            </button>
            {!isCollapsed && openAccordions.homeSlides && (
              <div className="ml-7 mt-1 space-y-1 pl-2 border-l border-[#0B3B5E]">
                <Link
                  href="/#slides"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-[#8EA5B8] hover:text-white hover:bg-[#0C3554]"
                >
                  • Home Slides List
                </Link>
              </div>
            )}
          </div>
          */}

          {/* Category Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('category')}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all',
                isCategoryActive
                  ? 'bg-[#244869] border border-[#3D668A]/70 text-white font-bold shadow-sm'
                  : 'text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Layers className={cn('w-4.5 h-4.5 shrink-0', isCategoryActive ? 'text-white' : 'text-[#7E98AF]')} />
                {!isCollapsed && (
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm font-bold">Category</span>
                    <span className={cn('text-[10px] font-normal mt-0.5', isCategoryActive ? 'text-[#A0B8CD]' : 'text-[#5E7C97]')}>
                      Assigned Categories
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                openAccordions.category ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-[#7E98AF]" />
              )}
            </button>

            {!isCollapsed && openAccordions.category && (
              <div className="ml-6 mt-1.5 space-y-1 pl-2.5 border-l-2 border-[#0B3B5E]">
                {/* Module List */}
                <Link
                  href="/modules"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl transition-all',
                    pathname === '/modules'
                      ? 'text-white font-bold bg-[#1C3E5E] border border-[#325A7E]/50'
                      : 'text-[#8EA5B8] hover:text-white hover:bg-[#0C3554]'
                  )}
                >
                  <span className="text-[#5E7C97] text-[10px]">•</span>
                  <span>Module List</span>
                </Link>

                {/* Category List */}
                <Link
                  href="/categories"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl transition-all',
                    pathname === '/categories' || pathname === '/category/list'
                      ? 'text-white font-bold bg-[#1C3E5E] border border-[#325A7E]/50'
                      : 'text-[#8EA5B8] hover:text-white hover:bg-[#0C3554]'
                  )}
                >
                  <span className="text-[#5E7C97] text-[10px]">•</span>
                  <span>Category List</span>
                </Link>

                {/* Sub Category List */}
                <Link
                  href="/sub-categories"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl transition-all',
                    pathname === '/sub-categories' || pathname === '/category/sub-list'
                      ? 'text-white font-bold bg-[#1C3E5E] border border-[#325A7E]/50'
                      : 'text-[#8EA5B8] hover:text-white hover:bg-[#0C3554]'
                  )}
                >
                  <span className="text-[#5E7C97] text-[10px]">•</span>
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
                'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all',
                isProductsActive
                  ? 'bg-[#244869] border border-[#3D668A]/70 text-white font-bold shadow-sm'
                  : 'text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Tag className={cn('w-4.5 h-4.5 shrink-0', isProductsActive ? 'text-white' : 'text-[#7E98AF]')} />
                {!isCollapsed && (
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm font-bold">Products</span>
                    <span className={cn('text-[10px] font-normal mt-0.5', isProductsActive ? 'text-[#A0B8CD]' : 'text-[#5E7C97]')}>
                      Product Catalog
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                openAccordions.products ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-[#7E98AF]" />
              )}
            </button>
            {!isCollapsed && openAccordions.products && (
              <div className="ml-6 mt-1.5 space-y-1 pl-2.5 border-l-2 border-[#0B3B5E]">
                <Link
                  href="/products"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl transition-all',
                    pathname === '/products' || pathname.startsWith('/products/')
                      ? 'text-white font-bold bg-[#1C3E5E] border border-[#325A7E]/50'
                      : 'text-[#8EA5B8] hover:text-white hover:bg-[#0C3554]'
                  )}
                >
                  <span className="text-[#5E7C97] text-[10px]">•</span>
                  <span>Product List</span>
                </Link>
              </div>
            )}
          </div>

          {/* Users - Commented Out
          <Link
            href="/customers"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all',
              isCustomersActive
                ? 'bg-[#244869] border border-[#3D668A]/60 text-white font-bold shadow-sm'
                : 'text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white'
            )}
          >
            <Users className={cn('w-4.5 h-4.5 shrink-0', isCustomersActive ? 'text-white' : 'text-[#7E98AF]')} />
            {!isCollapsed && <span className="flex-1">Users</span>}
          </Link>
          */}

          {/* Orders - Commented Out
          <Link
            href="/orders"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all',
              isOrdersActive
                ? 'bg-[#244869] border border-[#3D668A]/60 text-white font-bold shadow-sm'
                : 'text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white'
            )}
          >
            <Package className={cn('w-4.5 h-4.5 shrink-0', isOrdersActive ? 'text-white' : 'text-[#7E98AF]')} />
            {!isCollapsed && <span className="flex-1">Orders</span>}
          </Link>
          */}

          {/* Banners Accordion - Commented Out
          <div>
            <button
              onClick={() => toggleAccordion('banners')}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4.5 h-4.5 text-[#7E98AF] shrink-0" />
                {!isCollapsed && <span>Banners</span>}
              </div>
              {!isCollapsed && (
                openAccordions.banners ? <ChevronUp className="w-4 h-4 text-[#7E98AF]" /> : <ChevronDown className="w-4 h-4 text-[#7E98AF]" />
              )}
            </button>
          </div>
          */}

          {/* Blogs Accordion - Commented Out
          <div>
            <button
              onClick={() => toggleAccordion('blogs')}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4.5 h-4.5 text-[#7E98AF] shrink-0" />
                {!isCollapsed && <span>Blogs</span>}
              </div>
              {!isCollapsed && (
                openAccordions.blogs ? <ChevronUp className="w-4 h-4 text-[#7E98AF]" /> : <ChevronDown className="w-4 h-4 text-[#7E98AF]" />
              )}
            </button>
          </div>
          */}

          {/* Manage Logo - Commented Out
          <Link
            href="/settings"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#8EA5B8] hover:bg-[#0C3554] hover:text-white transition-all"
          >
            <Settings className="w-4.5 h-4.5 text-[#7E98AF] shrink-0" />
            {!isCollapsed && <span className="flex-1">Manage Logo</span>}
          </Link>
          */}

          {/* Logout Button */}
          <div className="pt-4 border-t border-[#0B3B5E]">
            <button
              onClick={() => {
                if (onOpenLogoutModal) {
                  onOpenLogoutModal();
                } else {
                  api.logout();
                  window.location.href = '/login';
                }
              }}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#8EA5B8] hover:bg-rose-500/20 hover:text-rose-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5 text-[#7E98AF] shrink-0" />
              {!isCollapsed && <span className="flex-1 text-left font-bold">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
