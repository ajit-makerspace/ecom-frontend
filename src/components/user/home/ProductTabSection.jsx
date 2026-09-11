'use client';

import React, { useState } from 'react';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { ProductCard } from '../products/ProductCard';

export function ProductTabSection() {
  const { products } = useUserPortal();
  const [activeTab, setActiveTab] = useState('featured');

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'onsale') return Boolean(product.oldPrice);
    if (activeTab === 'toprated') return product.rating >= 4.8;
    return product.isFeatured || true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Center Aligned Product Header Tabs matching Electro Screenshot */}
      <div className="flex items-center justify-center gap-8 border-b border-slate-200/90 pb-2 text-sm font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('featured')}
          className={`pb-2 relative transition-colors ${
            activeTab === 'featured'
              ? 'text-slate-900 font-extrabold border-b-2 border-[#FED700]'
              : 'hover:text-slate-900'
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => setActiveTab('onsale')}
          className={`pb-2 relative transition-colors ${
            activeTab === 'onsale'
              ? 'text-slate-900 font-extrabold border-b-2 border-[#FED700]'
              : 'hover:text-slate-900'
          }`}
        >
          On Sale
        </button>
        <button
          onClick={() => setActiveTab('toprated')}
          className={`pb-2 relative transition-colors ${
            activeTab === 'toprated'
              ? 'text-slate-900 font-extrabold border-b-2 border-[#FED700]'
              : 'hover:text-slate-900'
          }`}
        >
          Top Rated
        </button>
      </div>

      {/* Product Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
