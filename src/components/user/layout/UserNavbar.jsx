'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { Menu, ChevronDown, Sparkles, ChevronRight } from 'lucide-react';

export function UserNavbar() {
  const { categories } = useUserPortal();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#002740] text-white font-sans sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left Side: ALL DEPARTMENTS Dropdown Button using Admin Sidebar Dark Navy (#001728) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            className="w-64 bg-[#001728] hover:bg-[#001F36] text-white font-extrabold text-xs tracking-wide uppercase px-5 py-3.5 flex items-center justify-between cursor-pointer rounded-t-lg shrink-0 transition-colors shadow-2xs border-r border-[#0B3B5E]"
          >
            <div className="flex items-center gap-2.5">
              <Menu className="w-4 h-4 text-white" />
              <span>ALL DEPARTMENTS</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* All 21 Categories Dropdown Menu */}
          {isCategoryOpen && (
            <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 text-slate-800 shadow-2xl rounded-b-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto font-sans">
              <div className="py-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/user/category/${category.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#002740] transition-colors border-b border-slate-100/60 last:border-0 group"
                  >
                    <span className="truncate pr-2">{category.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#002740] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-200">
          <Link href="/user" className="hover:text-white transition-colors py-3.5 border-b-2 border-transparent hover:border-white">
            Home
          </Link>
          <Link href="/user/deals" className="hover:text-white transition-colors py-3.5 border-b-2 border-transparent hover:border-sky-400 flex items-center gap-1.5 text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Super Deals</span>
          </Link>
          <Link href="/user/products" className="hover:text-white transition-colors py-3.5 border-b-2 border-transparent hover:border-white">
            Featured Brands
          </Link>
          <Link href="/user/products" className="hover:text-white transition-colors py-3.5 border-b-2 border-transparent hover:border-white">
            Trending Crafts
          </Link>
          <Link href="/user/products" className="hover:text-white transition-colors py-3.5 border-b-2 border-transparent hover:border-white">
            Tech & Robotics
          </Link>
        </div>

        {/* Right Help Desk Note */}
        <div className="hidden lg:block text-xs text-slate-300 font-medium">
          Free Shipping on Orders Over <span className="font-extrabold text-white">$99</span>
        </div>
      </div>
    </nav>
  );
}
