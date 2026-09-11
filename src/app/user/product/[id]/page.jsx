'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { ProductCard } from '@/components/user/products/ProductCard';
import { formatCurrency } from '@/lib/utils';
import { Star, ShoppingBag, Plus, Minus, Heart, ArrowLeft, CheckCircle2, Shield, Truck } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;
  const { products, addToCart, toggleWishlist, isInWishlist } = useUserPortal();

  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id) || products[0];
  const inWishlist = isInWishlist(product.id);

  // Related Products in same category
  const relatedProducts = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  return (
    <UserLayout>
      <div className="space-y-8 font-sans">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/user" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href={`/user/category/${product.categorySlug}`} className="hover:text-amber-600">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Showcase Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Large Product Image */}
          <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 p-4 flex items-center justify-center relative overflow-hidden">
            {product.badge && (
              <span className="absolute top-4 left-4 text-xs font-black uppercase px-3 py-1 rounded-md bg-amber-400 text-slate-950 shadow-xs">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Right Product Details */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 inline-block">
                {product.categoryName}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">{product.reviewsCount} customer reviews</span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-slate-400">SKU: {product.sku}</span>
              </div>

              <div className="text-3xl font-black text-slate-900 pt-2">
                {formatCurrency(product.price)}
                {product.oldPrice && (
                  <span className="text-base font-semibold text-slate-400 line-through ml-3">
                    {formatCurrency(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                {product.description}
              </p>
            </div>

            {/* Actions & Perks */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>In Stock & Ready to Ship</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-slate-900">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    inWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-300 text-slate-500 hover:bg-slate-50'
                  }`}
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Security & Shipping Badges */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>Free Shipping on Orders $50+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>2 Year Official Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Related Equipment in {product.categoryName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
