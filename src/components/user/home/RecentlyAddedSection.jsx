'use client';

import React, { useState } from 'react';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { ProductCard } from '../products/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function RecentlyAddedSection() {
  const { products } = useUserPortal();
  const [activeDot, setActiveDot] = useState(0);

  // Take 6 products
  const recentProducts = products.slice(6, 12).length >= 6 ? products.slice(6, 12) : products.slice(0, 6);

  return (
    <div className="space-y-6 font-sans">
      {/* Header with Nav Arrows */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="relative">
          <h2 className="text-xl font-extrabold text-slate-900 pb-2">Recently Added</h2>
          {/* Admin Sidebar Blue underline accent */}
          <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#002740] rounded-full" />
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            onClick={() => setActiveDot((prev) => (prev > 0 ? prev - 1 : 2))}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveDot((prev) => (prev < 2 ? prev + 1 : 0))}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Vertical Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentProducts.map((product) => (
          <ProductCard key={`recent-${product.id}`} product={product} showActionsOnHover={true} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveDot(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              activeDot === idx ? 'w-8 bg-[#002740]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
