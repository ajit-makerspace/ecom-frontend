'use client';

import React from 'react';
import Link from 'next/link';

export function FullWidthMiddleBanner() {
  return (
    <Link
      href="/user/products"
      className="block bg-[#EDEDED] hover:bg-[#E5E5E5] rounded-2xl p-6 sm:p-8 transition-all duration-300 border border-slate-200/80 shadow-2xs group font-sans"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Text Details */}
        <div className="space-y-3 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight uppercase leading-snug">
            SHOP AND <span className="font-black text-slate-900">SAVE BIG</span> ON HOTTEST TABLETS
          </h2>

          <div className="inline-flex items-center gap-2 bg-[#FED700] text-slate-950 px-5 py-2.5 rounded-xl font-black text-sm sm:text-base shadow-xs group-hover:scale-105 transition-transform">
            <span className="uppercase text-xs font-extrabold opacity-90">STARTING AT</span>
            <span className="text-lg sm:text-xl font-black">$79.99</span>
          </div>
        </div>

        {/* Tablet Tech Image */}
        <div className="w-64 sm:w-80 h-36 sm:h-44 shrink-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80"
            alt="Hottest Tablets Sale"
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </Link>
  );
}
