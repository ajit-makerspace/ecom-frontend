'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BrandLogosBar() {
  const brands = [
    { name: 'airdnd', logo: 'airdnd' },
    { name: 'coinbuild', logo: 'coinbuild' },
    { name: 'dirrbble', logo: 'dirrbble' },
    { name: 'Instagirom', logo: 'Instagirom' },
    { name: 'NEETFLIX', logo: 'NEETFLIX' },
  ];

  return (
    <div className="border-t border-b border-slate-200/80 py-6 px-4 font-sans bg-white rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity">
          {brands.map((brand, idx) => (
            <div key={idx} className="text-xl sm:text-2xl font-black text-slate-400 hover:text-slate-900 transition-colors tracking-tight font-serif italic cursor-pointer">
              {brand.name}
            </div>
          ))}
        </div>

        <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
