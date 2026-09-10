'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileText } from 'lucide-react';

export function ViewSubCategoryModal({ isOpen, onClose, subCategory }) {
  if (!subCategory) return null;

  const isPdf = subCategory.image && (subCategory.image.toLowerCase().startsWith('data:application/pdf') || subCategory.image.toLowerCase().endsWith('.pdf'));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sub-Category Details" size="max-w-md">
      <div className="space-y-4 text-xs text-slate-700">
        <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
            {subCategory.image ? (
              isPdf ? (
                <a href={subCategory.image} target="_blank" rel="noreferrer" className="flex flex-col items-center text-rose-600 font-bold text-[10px]">
                  <FileText className="w-6 h-6" /> PDF
                </a>
              ) : (
                <img src={subCategory.image} alt={subCategory.name} className="w-full h-full object-contain" />
              )
            ) : (
              <span className="text-slate-400 font-semibold text-[10px]">No Image</span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{subCategory.name}</h3>
            <span className="px-2 py-0.5 rounded bg-slate-200/80 font-mono text-[10px] font-bold text-slate-700 inline-block mt-1">
              Code: {subCategory.code || 'N/A'}
            </span>
            <div className="mt-1">
              <StatusBadge status={subCategory.status || 'Active'} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">Parent Category</span>
            <span className="font-bold text-slate-800">{subCategory.categoryName || 'General'}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">Slug</span>
            <span className="font-mono text-slate-800 font-bold">{subCategory.slug || '—'}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button type="button" onClick={onClose} className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all text-xs">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
