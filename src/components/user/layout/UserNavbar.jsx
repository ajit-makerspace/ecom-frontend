'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { cn } from '@/lib/utils';
import { Menu, ChevronDown, ChevronRight, Flame, Tag, Sparkles } from 'lucide-react';

export function UserNavbar() {
  const pathname = usePathname();
  const { categories } = useUserPortal();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-slate-200/90 font-sans relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Solid Yellow "All Departments" Button with Dropdown */}
        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-64 bg-[#FED700] hover:bg-amber-400 text-slate-900 font-extrabold text-xs tracking-wide uppercase px-5 py-3.5 flex items-center justify-between cursor-pointer rounded-t-lg shrink-0 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4 text-slate-900" />
                <span>All Departments</span>
              </div>
              <ChevronDown className={cn('w-4 h-4 text-slate-900 transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>

            {/* Dropdown Menu Listing All 21 Categories */}
            {isOpen && (
              <div className="absolute top-full left-0 w-64 bg-white text-slate-900 shadow-2xl border border-slate-200 rounded-b-xl z-50 animate-in fade-in slide-in-from-top-1 max-h-[460px] overflow-y-auto divide-y divide-slate-100 text-xs font-semibold">
                <Link
                  href="/user/deals"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
                    <span>Value of the Day</span>
                  </span>
                </Link>

                <Link
                  href="/user/deals"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Top 100 Offers</span>
                  </span>
                </Link>

                <Link
                  href="/user/products"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 font-bold text-slate-900 transition-colors border-b-2 border-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    <span>New Arrivals</span>
                  </span>
                </Link>

                {/* 21 Categories */}
                <div className="divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/user/category/${cat.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 hover:text-amber-600 transition-colors group"
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-500 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Horizontal Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-800">
            <Link href="/user" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              <span>All Pages</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </Link>
            <Link href="/user/products" className="hover:text-amber-500 transition-colors">
              Featured Brands
            </Link>
            <Link href="/user/deals" className="hover:text-amber-500 transition-colors">
              Trending Styles
            </Link>
            <Link href="/user/products" className="hover:text-amber-500 transition-colors">
              Gift Cards
            </Link>
          </div>
        </div>

        {/* Far Right: Free Shipping Tag */}
        <div className="hidden md:block text-xs font-extrabold text-slate-800">
          Free Shipping on Orders $50+
        </div>
      </div>
    </nav>
  );
}
