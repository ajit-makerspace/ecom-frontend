'use client';

import React, { useState } from 'react';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { ProductCard } from '../products/ProductCard';

export function BestSellersSection() {
  const { products } = useUserPortal();
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Take 6 products for the 2x3 grid
  const bestSellers = products.slice(0, 6);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="relative">
          <h2 className="text-xl font-extrabold text-slate-900 pb-2">Best Sellers</h2>
          {/* Yellow underline accent */}
          <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#FED700] rounded-full" />
        </div>

        {/* Top 20 Pill Badge */}
        <button className="px-4 py-1 rounded-full border-2 border-[#FED700] text-slate-900 font-extrabold text-xs hover:bg-[#FED700] transition-colors cursor-pointer shadow-2xs">
          Top 20
        </button>
      </div>

      {/* 2 Rows x 3 Columns Horizontal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bestSellers.map((product) => (
          <ProductCard key={`bestseller-${product.id}`} product={product} horizontal={true} />
        ))}
      </div>

      {/* Pagination Slider Dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          onClick={() => setActivePageIndex(0)}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            activePageIndex === 0 ? 'w-8 bg-[#FED700]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
        />
        <button
          onClick={() => setActivePageIndex(1)}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            activePageIndex === 1 ? 'w-8 bg-[#FED700]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
        />
        <button
          onClick={() => setActivePageIndex(2)}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            activePageIndex === 2 ? 'w-8 bg-[#FED700]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
        />
      </div>
    </div>
  );
}
