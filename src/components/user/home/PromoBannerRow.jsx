'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function PromoBannerRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      {/* Promo Card 1: Cameras */}
      <div className="bg-[#EDEDED] rounded-2xl p-6 flex items-center justify-between gap-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow group">
        <div className="w-28 h-24 shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80"
            alt="Camera Deals"
            className="max-h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug uppercase">
            CATCH BIG <span className="text-slate-900 block font-black">DEALS ON THE</span> CAMERAS
          </h3>
          <Link
            href="/user/products"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 hover:text-amber-600 transition-colors"
          >
            <span>Shop now</span>
            <div className="w-5 h-5 rounded-full bg-[#FED700] flex items-center justify-center text-slate-900">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Promo Card 2: Tablets & Smartphones */}
      <div className="bg-[#EDEDED] rounded-2xl p-6 flex items-center justify-between gap-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow group">
        <div className="w-28 h-24 shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80"
            alt="Tablets & Phones"
            className="max-h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug uppercase">
            TABLETS, SMARTPHONES <span className="block font-black text-slate-900">AND MORE</span> <span className="text-xs font-bold text-slate-600">UP TO <strong className="text-slate-900 font-black text-base">70 %</strong></span>
          </h3>
          <Link
            href="/user/products"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 hover:text-amber-600 transition-colors"
          >
            <span>Shop now</span>
            <div className="w-5 h-5 rounded-full bg-[#FED700] flex items-center justify-center text-slate-900">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Promo Card 3: Hottest Products */}
      <div className="bg-[#EDEDED] rounded-2xl p-6 flex items-center justify-between gap-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow group">
        <div className="w-28 h-24 shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300&auto=format&fit=crop&q=80"
            alt="Hottest Products"
            className="max-h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug uppercase">
            SHOP THE <span className="block font-black text-slate-900">HOTTEST</span> PRODUCTS
          </h3>
          <Link
            href="/user/products"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 hover:text-amber-600 transition-colors"
          >
            <span>Shop now</span>
            <div className="w-5 h-5 rounded-full bg-[#FED700] flex items-center justify-center text-slate-900">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
