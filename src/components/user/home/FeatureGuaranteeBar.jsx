'use client';

import React from 'react';
import { Truck, Headset, RotateCcw, ShieldCheck } from 'lucide-react';

export function FeatureGuaranteeBar() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0 font-bold border border-amber-300">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
            Free Delivery
          </h4>
          <p className="text-[11px] text-slate-500">
            For all orders over $50 worldwide
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0 font-bold border border-emerald-300">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
            100% Safe Payments
          </h4>
          <p className="text-[11px] text-slate-500">
            Encrypted SSL checkout security
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-700 flex items-center justify-center shrink-0 font-bold border border-sky-300">
          <RotateCcw className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
            30 Day Returns
          </h4>
          <p className="text-[11px] text-slate-500">
            If goods have problems or defects
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-700 flex items-center justify-center shrink-0 font-bold border border-violet-300">
          <Headset className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
            24/7 Maker Support
          </h4>
          <p className="text-[11px] text-slate-500">
            Dedicated craft & engineering team
          </p>
        </div>
      </div>
    </div>
  );
}
