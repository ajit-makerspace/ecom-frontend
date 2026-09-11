'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { ProductCard } from '../products/ProductCard';
import { Flame, Clock, Zap } from 'lucide-react';

export function DealOfTheDay() {
  const { products } = useUserPortal();
  const dealProducts = products.filter((p) => p.isDealOfDay);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (dealProducts.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6 font-sans relative overflow-hidden">
      {/* Top Flash Sale Header with Timer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shadow-lg shadow-rose-500/30">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-extrabold text-[10px] uppercase tracking-wider border border-rose-500/30">
                LIMITED TIME FLASH SALE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase mt-0.5">
              Deals of the Day
            </h2>
          </div>
        </div>

        {/* Live Countdown Timer Clock */}
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 shadow-inner">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ends In:</span>
          <div className="flex items-center gap-1 font-mono font-black text-amber-400 text-sm">
            <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Flash Deal Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealProducts.map((product) => (
          <div key={product.id} className="space-y-2">
            <ProductCard product={product} />

            {/* Deal Stock Meter Bar */}
            {product.totalDealStock && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Already Sold: <strong className="text-amber-400 font-bold">{product.soldCount}</strong></span>
                  <span>Available: <strong className="text-white font-bold">{product.totalDealStock - product.soldCount}</strong></span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"
                    style={{ width: `${(product.soldCount / product.totalDealStock) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
