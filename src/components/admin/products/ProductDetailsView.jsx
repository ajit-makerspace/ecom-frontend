'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { Folder, Grid, MessageSquare, CheckCircle2, ArrowLeft, FileText } from 'lucide-react';

export function ProductDetailsView({ product, onBack }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  if (!product) {
    return (
      <div className="p-8 text-center text-slate-500 space-y-4">
        <p className="text-sm font-semibold">Product not found.</p>
        {onBack ? (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs"
          >
            Back to Products
          </button>
        ) : (
          <Link href="/admin/products" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs inline-block">
            Back to Products
          </Link>
        )}
      </div>
    );
  }

  const isPdf = product.image && (product.image.toLowerCase().startsWith('data:application/pdf') || product.image.toLowerCase().endsWith('.pdf'));

  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toISOString().split('T')[0]
    : '2026-08-30';

  const defaultDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.";

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Product Details
        </h1>

        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>
        ) : (
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        )}
      </div>

      {/* Main Details Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Product Image View Box */}
          <div className="lg:col-span-5 flex items-center justify-center relative bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden h-[380px] sm:h-[420px]">
            {/* Top-Left Thumbnail */}
            {product.image && !isPdf && (
              <div className="absolute top-4 left-4 w-14 h-14 rounded-lg bg-white border border-slate-200 p-1 overflow-hidden shadow-sm z-10 pointer-events-none">
                <img
                  src={product.image}
                  alt="Thumbnail"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Full Image Display Container with Lens Zoom */}
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
                    <FileText className="w-14 h-14" />
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

          {/* Right Side: Details & Description */}
          <div className="lg:col-span-7 space-y-6">
            {/* Product Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
              {product.name}
            </h2>

            {/* Metadata key-value list */}
            <div className="space-y-3 text-sm text-slate-700 pt-1">
              <div className="flex items-center gap-3">
                <Folder className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-900 min-w-[100px]">Brand :</span>
                <span className="text-slate-700 font-medium">{product.brand || 'GameSir'}</span>
              </div>

              <div className="flex items-center gap-3">
                <Grid className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-900 min-w-[100px]">Category :</span>
                <span className="text-slate-700 font-medium">{product.categoryName || 'Electronics'}</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-900 min-w-[100px]">Review :</span>
                <span className="text-slate-700 font-medium">(0) Review</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                <span className="font-bold text-slate-900 min-w-[100px]">Published :</span>
                <span className="text-slate-700 font-medium">{formattedDate}</span>
              </div>

              {product.price && (
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="font-bold text-slate-900 min-w-[100px]">Price :</span>
                  <span className="text-lg font-extrabold text-slate-900">
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
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Product Description
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {product.description && product.description.trim() ? product.description : defaultDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
