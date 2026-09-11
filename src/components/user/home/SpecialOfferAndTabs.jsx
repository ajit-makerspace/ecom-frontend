'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

export function SpecialOfferAndTabs() {
  const { products, addToCart } = useUserPortal();
  const [activeTab, setActiveTab] = useState('featured');

  // Countdown timer state (8h 2m 33s)
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 2, seconds: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const specialOfferProduct = products.find((p) => p.isDeal) || products[0] || {
    id: 'special-1',
    name: 'Game Console Controller + USB 3.0 Cable',
    categoryName: 'Game Consoles, Video Games & Consoles',
    price: 90.00,
    oldPrice: 99.00,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=80',
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'onsale') return Boolean(product.oldPrice);
    if (activeTab === 'toprated') return product.rating >= 4.8;
    return product.isFeatured || true;
  }).slice(0, 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans items-stretch">
      {/* Left Column (~3/12 = ~25%): Special Offer Yellow Card matching top and bottom of product grid */}
      <div className="lg:col-span-4 xl:col-span-3 flex flex-col pt-[42px]">
        <div className="border-2 border-[#FED700] rounded-2xl bg-white p-4 flex flex-col justify-between relative shadow-2xs hover:shadow-md transition-shadow h-full">
          {/* Save Badge top-right */}
          <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-[#FED700] flex flex-col items-center justify-center text-center shadow-2xs font-extrabold text-[9px] leading-tight text-slate-950 uppercase p-1">
            <span>Save</span>
            <span className="text-[11px] font-black">
              ${(specialOfferProduct.oldPrice ? specialOfferProduct.oldPrice - specialOfferProduct.price : 9).toFixed(2)}
            </span>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-lg font-bold text-slate-800">Special Offer</h2>
          </div>

          {/* Product Image */}
          <div className="w-full flex-1 h-44 sm:h-48 flex items-center justify-center p-2 my-1 overflow-hidden">
            <img
              src={specialOfferProduct.image}
              alt={specialOfferProduct.name}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Title & Price */}
          <div className="text-center space-y-1.5 mb-2">
            <Link
              href={`/user/product/${specialOfferProduct.id}`}
              className="text-xs font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 transition-colors cursor-pointer block leading-snug"
            >
              {specialOfferProduct.name}
            </Link>

            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-[#e41e31]">
                {formatCurrency(specialOfferProduct.price)}
              </span>
              {specialOfferProduct.oldPrice && (
                <span className="text-xs font-normal text-slate-400 line-through">
                  {formatCurrency(specialOfferProduct.oldPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Countdown Timer matching Electro Screenshot 100% */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-[10px] font-normal text-slate-500 mb-1.5">Hurry Up! Offer ends in:</p>

            <div className="flex items-center justify-center gap-1.5">
              <div className="bg-[#f3f3f3] rounded-md px-2.5 py-1 min-w-[48px] text-center">
                <span className="text-base font-extrabold text-slate-800 leading-none block">
                  {timeLeft.hours}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">HOURS</span>
              </div>

              <span className="text-slate-400 font-bold text-sm mb-2">:</span>

              <div className="bg-[#f3f3f3] rounded-md px-2.5 py-1 min-w-[48px] text-center">
                <span className="text-base font-extrabold text-slate-800 leading-none block">
                  {timeLeft.minutes}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">MINS</span>
              </div>

              <span className="text-slate-400 font-bold text-sm mb-2">:</span>

              <div className="bg-[#f3f3f3] rounded-md px-2.5 py-1 min-w-[48px] text-center">
                <span className="text-base font-extrabold text-slate-800 leading-none block">
                  {timeLeft.seconds}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">SECS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (~9/12 = ~75%): Tabs Header + 3x2 Product Grid */}
      <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
        {/* Center-aligned Tabs Header */}
        <div className="flex items-center justify-center gap-8 border-b border-slate-200 pb-2 mb-4 text-sm font-bold text-slate-500">
          <button
            onClick={() => setActiveTab('featured')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'featured'
                ? 'text-slate-900 font-extrabold border-b-2 border-[#FED700]'
                : 'hover:text-slate-900'
            }`}
          >
            Featured
          </button>

          <button
            onClick={() => setActiveTab('onsale')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'onsale'
                ? 'text-slate-900 font-extrabold border-b-2 border-[#FED700]'
                : 'hover:text-slate-900'
            }`}
          >
            On Sale
          </button>

          <button
            onClick={() => setActiveTab('toprated')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'toprated'
                ? 'text-slate-900 font-extrabold border-b-2 border-[#FED700]'
                : 'hover:text-slate-900'
            }`}
          >
            Top Rated
          </button>
        </div>

        {/* Electro Grid (3 columns x 2 rows with clean dividers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border border-slate-200/90 rounded-xl overflow-hidden divide-x divide-y divide-slate-200/80 bg-white flex-1">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 flex flex-col justify-between bg-white hover:shadow-md transition-shadow group">
              <div>
                <span className="text-[11px] font-normal text-slate-400 block mb-1 truncate">
                  {product.categoryName}
                </span>

                <Link
                  href={`/user/product/${product.id}`}
                  className="text-[13px] font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 leading-snug block mb-3"
                >
                  {product.name}
                </Link>

                <div className="h-44 flex items-center justify-center p-2 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
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
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FED700] text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
