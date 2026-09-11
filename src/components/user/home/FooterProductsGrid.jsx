'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { formatCurrency } from '@/lib/utils';
import { Star } from 'lucide-react';

export function FooterProductsGrid() {
  const { products } = useUserPortal();

  const featuredList = products.slice(0, 3);
  const topSellingList = products.slice(3, 6);
  const onSaleList = products.slice(6, 9);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
      {/* Column 1: Featured Products */}
      <div className="space-y-4">
        <div className="relative border-b border-slate-200/80 pb-2">
          <h3 className="text-base font-extrabold text-slate-900">Featured Products</h3>
          <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-[#002740]" />
        </div>

        <div className="space-y-3">
          {featuredList.map((product) => (
            <div key={`foot-feat-${product.id}`} className="flex items-center gap-3 group">
              <div className="w-16 h-16 shrink-0 bg-slate-50 border border-slate-100 rounded-lg p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/user/product/${product.id}`}
                  className="text-xs font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 transition-colors cursor-pointer leading-tight"
                >
                  {product.name}
                </Link>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className={`text-xs font-extrabold ${product.oldPrice ? 'text-[#e41e31]' : 'text-slate-900'}`}>
                    {formatCurrency(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatCurrency(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Top Selling Products */}
      <div className="space-y-4">
        <div className="relative border-b border-slate-200/80 pb-2">
          <h3 className="text-base font-extrabold text-slate-900">Top Selling Products</h3>
          <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-[#002740]" />
        </div>

        <div className="space-y-3">
          {topSellingList.map((product) => (
            <div key={`foot-top-${product.id}`} className="flex items-center gap-3 group">
              <div className="w-16 h-16 shrink-0 bg-slate-50 border border-slate-100 rounded-lg p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/user/product/${product.id}`}
                  className="text-xs font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 transition-colors cursor-pointer leading-tight"
                >
                  {product.name}
                </Link>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className={`text-xs font-extrabold ${product.oldPrice ? 'text-[#e41e31]' : 'text-slate-900'}`}>
                    {formatCurrency(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatCurrency(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 3: On-sale Products */}
      <div className="space-y-4">
        <div className="relative border-b border-slate-200/80 pb-2">
          <h3 className="text-base font-extrabold text-slate-900">On-sale Products</h3>
          <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-[#002740]" />
        </div>

        <div className="space-y-3">
          {onSaleList.map((product) => (
            <div key={`foot-sale-${product.id}`} className="flex items-center gap-3 group">
              <div className="w-16 h-16 shrink-0 bg-slate-50 border border-slate-100 rounded-lg p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1">
                {/* Star Ratings */}
                <div className="flex items-center text-amber-400 gap-0.5 text-[10px] mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current text-amber-400' : 'text-[#002740]'}`} />
                  ))}
                </div>

                <Link
                  href={`/user/product/${product.id}`}
                  className="text-xs font-bold text-[#0066c0] hover:text-[#004b8d] line-clamp-2 transition-colors cursor-pointer leading-tight"
                >
                  {product.name}
                </Link>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-xs font-extrabold text-[#e41e31]">
                    {formatCurrency(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatCurrency(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 4: SmartG3 Side Promo Card */}
      <div className="bg-[#EDEDED] rounded-2xl p-5 flex flex-col justify-between items-center text-center border border-slate-200/80 shadow-2xs relative overflow-hidden group">
        <div>
          <span className="text-xl font-black text-slate-900 tracking-tight block uppercase">
            smart<span className="text-[#002740]">G3</span>
          </span>
          <span className="text-xs font-bold text-slate-500 block mb-2">Now with 4G</span>

          <div className="inline-block bg-[#002740] text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-2xs">
            STARTING AT <span className="text-sm font-black">$129.99</span>
          </div>
        </div>

        <div className="w-full h-44 flex items-center justify-center p-2 my-2">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80"
            alt="SmartG3 4G"
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
