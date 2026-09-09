'use client';

import React from 'react';
import { useAdminData } from '@/context/AdminDataContext';
import { X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useAdminData();

  if (!toasts || toasts.length === 0) return null;

  const styleMap = {
    success: 'border-l-emerald-500',
    error: 'border-l-rose-500',
    info: 'border-l-blue-600',
    warning: 'border-l-amber-500',
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const accentClass = styleMap[toast.type] || styleMap.info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200/90 shadow-lg shadow-slate-900/5 border-l-4 ${accentClass} transition-all animate-in fade-in slide-in-from-top-4 duration-300`}
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                {toast.title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5 font-medium leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 -mr-1"
              title="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
