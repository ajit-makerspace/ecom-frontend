'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart, Eye, Heart, RefreshCw } from 'lucide-react';

export function ProductCard({ product, horizontal = false, showActionsOnHover = true }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useUserPortal();
  const inWishlist = isInWishlist(product.id);

  if (horizontal) {
    return (
      <div className="group bg-white rounded-xl border border-slate-200/80 p-3 hover:border-slate-400 hover:shadow-md transition-all duration-200 flex items-center gap-3 font-sans relative">
        {/* Horizontal Image */}
        <div className="w-24 h-24 shrink-0 bg-slate-50 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-normal text-slate-400 truncate block">
              {product.categoryName}
            </span>
            <Link
              href={`/user/product/${product.id}`}
              className="text-[13px] font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 leading-snug cursor-pointer block mt-0.5"
            >
              {product.name}
            </Link>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className={`text-sm font-bold ${product.oldPrice ? 'text-[#e41e31]' : 'text-slate-900'}`}>
                {formatCurrency(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-[11px] text-slate-400 line-through">
                  {formatCurrency(product.oldPrice)}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#002740] text-slate-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col relative font-sans overflow-hidden p-3.5">
      {/* Product Image Box */}
      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-3 mb-2">
        {/* Discount Badge */}
        {product.badge && (
          <span className="absolute top-1 left-1 z-10 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#002740] text-white">
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute inset-x-4 bottom-2 py-1.5 rounded bg-slate-900/80 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          Quick View
        </button>
      </div>

      {/* Info Container */}
      <div className="flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <span className="text-[11px] font-normal text-slate-400 truncate block">
            {product.categoryName}
          </span>
          <Link
            href={`/user/product/${product.id}`}
            className="text-[13px] font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 leading-snug cursor-pointer block mt-0.5"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-base font-bold ${product.oldPrice ? 'text-[#e41e31]' : 'text-slate-900'}`}>
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#002740] text-slate-700 group-hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Wishlist & Compare Bar */}
        {showActionsOnHover && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-500 transition-opacity">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-1 hover:text-rose-600 transition-colors ${
                inWishlist ? 'text-rose-600 font-bold' : ''
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
              <span>Wishlist</span>
            </button>

            <span className="text-slate-300">|</span>

            <button
              onClick={() => alert(`Added ${product.name} to comparison!`)}
              className="flex items-center gap-1 hover:text-[#0066c0] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Compare</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
