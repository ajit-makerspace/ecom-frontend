'use client';

import React from 'react';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { DealOfTheDay } from '@/components/user/home/DealOfTheDay';
import { ProductCard } from '@/components/user/products/ProductCard';
import { Flame } from 'lucide-react';

export default function HotDealsPage() {
  const { products } = useUserPortal();
  const discounted = products.filter((p) => p.oldPrice || p.isDealOfDay);

  return (
    <UserLayout>
      <div className="space-y-8 font-sans">
        <DealOfTheDay />

        <div className="space-y-4">
          <div className="flex items-center gap-2.5 border-b-2 border-slate-200 pb-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                All Discounted Products
              </h2>
              <p className="text-xs text-slate-500">
                Special maker offers with up to 40% off retail prices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {discounted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
