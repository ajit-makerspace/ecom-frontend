'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import {
  Layers,
  ArrowRight,
  Box,
  Cpu,
  Sparkles,
  Palette,
  Circle,
  Hammer,
  Shield,
  Grid,
  Video,
  Droplets,
  Bot,
  Plane,
  Rocket,
  Search,
  Radio,
  Glasses,
  Disc,
  Printer,
  Flame,
  FileText,
  Theater,
} from 'lucide-react';

const ICON_MAP = {
  Theater,
  FileText,
  Sparkles,
  Palette,
  Circle,
  Hammer,
  Shield,
  Cpu,
  Box,
  Grid,
  Video,
  Droplets,
  Bot,
  Plane,
  Rocket,
  Search,
  Radio,
  Glasses,
  Disc,
  Printer,
  Flame,
};

export function CategoryGrid() {
  const { categories } = useUserPortal();

  return (
    <div className="space-y-4 font-sans">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Explore Our 21 Maker Disciplines
            </h2>
            <p className="text-xs text-slate-500">
              Select a category to view specialized tools, kits, and materials
            </p>
          </div>
        </div>

        <Link
          href="/user/products"
          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline uppercase tracking-wide"
        >
          <span>View All 21 Categories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of 21 Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || Layers;

          return (
            <Link
              key={cat.id}
              href={`/user/category/${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-2 relative overflow-hidden"
            >
              {/* Background Thumbnail Image */}
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-xs">
                <IconComponent className="w-6 h-6" />
              </div>

              {/* Title & Count */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 leading-snug">
                  {cat.name}
                </h3>
                <span className="text-[10px] font-semibold text-slate-400">
                  {cat.count} items
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
