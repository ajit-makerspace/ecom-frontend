'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { ProductCard } from '../products/ProductCard';

export function FeaturedDealShowcase() {
  const { products } = useUserPortal();

  const leftProducts = products.slice(0, 2);
  const centerProduct = products.find((p) => p.name.includes('Controller')) || products[0];
  const rightProduct = products.find((p) => p.name.includes('Case') || p.name.includes('Cube')) || products[2] || products[0];

  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Sub-column (~3/12): Stacked Mini Cards */}
        <div className="lg:col-span-3 space-y-4">
          {leftProducts.map((product) => (
            <ProductCard key={product.id} product={product} horizontal={true} />
          ))}
        </div>

        {/* Center Sub-column (~6/12): Big Featured Hero Showcase */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col items-center justify-between text-center min-h-[360px] shadow-2xs">
          <div>
            <span className="text-xs font-medium text-slate-400 block mb-1">
              {centerProduct.categoryName || 'Game Consoles, Video Games & Consoles'}
            </span>
            <Link
              href={`/user/product/${centerProduct.id}`}
              className="text-base sm:text-lg font-extrabold text-[#0066c0] hover:text-[#004b8d] transition-colors cursor-pointer"
            >
              {centerProduct.name}
            </Link>
          </div>

          <div className="w-full h-56 flex items-center justify-center p-4 my-4 overflow-hidden">
            <img
              src={centerProduct.image}
              alt={centerProduct.name}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Sub-column (~3/12): Elevated Shadow Product Card */}
        <div className="lg:col-span-3">
          <div className="shadow-xl border border-amber-300/80 rounded-xl overflow-hidden">
            <ProductCard product={rightProduct} showActionsOnHover={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
