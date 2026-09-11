'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MetricCard({
  title,
  value,
  change,
  isPositive,
  timeframe,
  icon: Icon,
  iconBgColor,
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn('p-2.5 rounded-xl shrink-0', iconBgColor)}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>

        <div
          className={cn(
            'flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full',
            isPositive
              ? 'bg-emerald-500/10 text-emerald-600'
              : 'bg-rose-500/10 text-rose-600'
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{change}</span>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-slate-400 font-medium">
        vs. {timeframe}
      </p>
    </div>
  );
}
