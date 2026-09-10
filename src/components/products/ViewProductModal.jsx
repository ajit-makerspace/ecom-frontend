'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import { FileText, Tag, Hash, Box, DollarSign, Layers, Star, Info } from 'lucide-react';

export function ViewProductModal({ isOpen, onClose, product }) {
  if (!product) return null;

  const isPdf = product.image && (product.image.toLowerCase().startsWith('data:application/pdf') || product.image.toLowerCase().endsWith('.pdf'));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details" size="max-w-2xl">
      <div className="space-y-6 text-xs text-slate-700">
        {/* Main Product Header Card */}
        <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 items-start">
          {/* Image / PDF Preview */}
          <div className="w-24 h-24 rounded-lg bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
            {product.image ? (
              isPdf ? (
                <a
                  href={product.image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 text-rose-600 font-bold hover:underline"
                >
                  <FileText className="w-8 h-8" />
                  <span className="text-[10px]">View PDF</span>
                </a>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )
            ) : (
              <span className="text-slate-400 font-semibold text-xs">No Image</span>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-200/80 font-mono text-[11px] font-bold text-slate-700">
                    SKU: {product.sku || 'N/A'}
                  </span>
                  <StatusBadge status={product.status || 'Active'} />
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-slate-900 block">
                  {formatCurrency(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-slate-400 line-through block">
                    {formatCurrency(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Badges for Featured & Variants */}
            <div className="flex items-center gap-2 pt-1">
              {product.isFeatured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[10px]">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                </span>
              )}
              {product.hasVariants && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-700 font-bold text-[10px]">
                  <Layers className="w-3 h-3" /> Has Variants
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Grid Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Category</span>
            <span className="font-bold text-slate-800 text-xs">
              {product.categoryName || 'General'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Subcategory</span>
            <span className="font-bold text-blue-700 text-xs">
              {product.subCategoryName || '—'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Brand</span>
            <span className="font-bold text-slate-800 text-xs">
              {product.brand || '—'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Weight</span>
            <span className="font-bold text-slate-800 text-xs">
              {product.weight ? `${product.weight} kg` : '—'}
            </span>
          </div>
        </div>

        {/* Description Section */}
        {product.description && (
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-500" /> Product Description
            </h4>
            <p className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-600 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        )}

        {/* SEO Meta Information */}
        {(product.metaTitle || product.metaDescription) && (
          <div className="p-3 rounded-lg bg-blue-50/40 border border-blue-100 space-y-2">
            <h4 className="font-bold text-blue-900 text-xs">SEO Metadata</h4>
            {product.metaTitle && (
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Title</span>
                <span className="font-medium text-slate-800">{product.metaTitle}</span>
              </div>
            )}
            {product.metaDescription && (
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Description</span>
                <span className="text-slate-600">{product.metaDescription}</span>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
