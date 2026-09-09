'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function StatusBadge({ status = 'Active', onClick, className }) {
  const normalized = String(status || 'Active').toLowerCase();

  const colorStyles = {
    active: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 hover:bg-emerald-100',
    inactive: 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200',
    pending: 'bg-amber-50 text-amber-600 border-amber-200/80 hover:bg-amber-100',
    completed: 'bg-blue-50 text-blue-600 border-blue-200/80 hover:bg-blue-100',
    cancelled: 'bg-rose-50 text-rose-600 border-rose-200/80 hover:bg-rose-100',
  };

  const dotStyles = {
    active: 'bg-emerald-500',
    inactive: 'bg-slate-400',
    pending: 'bg-amber-500',
    completed: 'bg-blue-500',
    cancelled: 'bg-rose-500',
  };

  const currentStyle = colorStyles[normalized] || colorStyles.inactive;
  const currentDot = dotStyles[normalized] || dotStyles.inactive;
  const formattedText = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all',
        onClick ? 'cursor-pointer' : 'cursor-default',
        currentStyle,
        className
      )}
      title={onClick ? 'Click to toggle status' : undefined}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', currentDot)} />
      <span>{formattedText}</span>
    </Tag>
  );
}
