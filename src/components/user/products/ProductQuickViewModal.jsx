'use client';

import React, { useState } from 'react';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/utils';
import { Star, ShoppingBag, Plus, Minus, Heart, CheckCircle2 } from 'lucide-react';

export function ProductQuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useUserPortal();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  return (
    <Modal
      isOpen={Boolean(quickViewProduct)}
      onClose={() => {
        setQuickViewProduct(null);
        setQty(1);
      }}
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 font-sans">
        {/* Left Image */}
        <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 p-3 flex items-center justify-center">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right Info Details */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 inline-block">
              {quickViewProduct.categoryName}
            </span>

            <h3 className="text-lg font-black text-slate-900 leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-slate-900 ml-1">
                  {quickViewProduct.rating}
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{quickViewProduct.reviewsCount} verified reviews</span>
            </div>

            <div className="text-2xl font-black text-slate-900 pt-1">
              {formatCurrency(quickViewProduct.price)}
              {quickViewProduct.oldPrice && (
                <span className="text-sm font-semibold text-slate-400 line-through ml-2">
                  {formatCurrency(quickViewProduct.oldPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {quickViewProduct.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            {/* Availability */}
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>In Stock ({quickViewProduct.stock} available)</span>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-1.5 text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-bold text-xs text-slate-900">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-1.5 text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, qty);
                  setQuickViewProduct(null);
                  setQty(1);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-all ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-slate-300 text-slate-500 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
