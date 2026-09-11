'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { ProductCard } from '@/components/user/products/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { products, wishlist } = useUserPortal();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <UserLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-extrabold text-[10px] uppercase tracking-wider border border-rose-500/30 inline-block mb-2">
              SAVED ITEMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase">
              My Saved Wishlist ({wishlistProducts.length})
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Keep track of equipment and materials you want to purchase later.
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your wishlist is currently empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click the heart icon on any product to save it to your personal wishlist.
            </p>
            <Link
              href="/user/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs uppercase shadow-md hover:bg-amber-500 transition-all"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
