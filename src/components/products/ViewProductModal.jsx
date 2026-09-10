'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/utils';
import { Folder, Grid, MessageSquare, CheckCircle2, FileText } from 'lucide-react';

export function ViewProductModal({ isOpen, onClose, product }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  if (!product) return null;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const isPdf = product.image && (product.image.toLowerCase().startsWith('data:application/pdf') || product.image.toLowerCase().endsWith('.pdf'));

  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toISOString().split('T')[0]
    : '2026-08-30';

  const defaultDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details" size="max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 p-2 text-slate-800">
        {/* Left Side: Product Image Preview Box */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative bg-slate-50 border border-slate-200/80 rounded-xl h-[360px] overflow-hidden">
          {/* Top-Left Thumbnail */}
          {product.image && !isPdf && (
            <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-white border border-slate-200 p-1 overflow-hidden shadow-2xs z-10 pointer-events-none">
              <img
                src={product.image}
                alt="Thumbnail"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Full Image Container */}
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden cursor-crosshair select-none p-4"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {product.image ? (
              isPdf ? (
                <a
                  href={product.image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 text-rose-600 font-bold hover:underline p-6 bg-white rounded-xl border border-slate-200 z-10"
                >
                  <FileText className="w-12 h-12" />
                  <span className="text-xs">View Attached PDF Document</span>
                </a>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-75 ease-out"
                  style={{
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                    transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center center',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )
            ) : (
              <div className="text-slate-400 font-semibold text-sm">No Image Available</div>
            )}
          </div>
        </div>

        {/* Right Side: Product Info & Description */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Product Name Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug tracking-tight">
              {product.name}
            </h2>

            {/* Key-Value Details List */}
            <div className="space-y-2.5 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-800 min-w-[90px]">Brand :</span>
                <span className="text-slate-700 font-medium">{product.brand || 'GameSir'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-800 min-w-[90px]">Category :</span>
                <span className="text-slate-700 font-medium">{product.categoryName || 'Electronics'}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-800 min-w-[90px]">Review :</span>
                <span className="text-slate-700 font-medium">(0) Review</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-800 min-w-[90px]">Published :</span>
                <span className="text-slate-700 font-medium">{formattedDate}</span>
              </div>

              {product.price && (
                <div className="pt-1 flex items-baseline gap-2">
                  <span className="font-bold text-slate-800 min-w-[90px]">Price :</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(product.oldPrice)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Product Description
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {product.description && product.description.trim() ? product.description : defaultDescription}
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
