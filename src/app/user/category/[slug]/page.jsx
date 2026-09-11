'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { ProductCard } from '@/components/user/products/ProductCard';
import { ArrowLeft, Layers, SlidersHorizontal } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const { categories, products } = useUserPortal();

  const currentCategory = categories.find((c) => c.slug === slug) || {
    name: slug.replace(/-/g, ' '),
    description: 'Specialized maker products and equipment.',
    count: 0,
  };

  const categoryProducts = products.filter((p) => p.categorySlug === slug);

  return (
    <UserLayout>
      <div className="space-y-6 font-sans">
        {/* Breadcrumb & Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Link href="/user" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Category</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {currentCategory.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
                {currentCategory.description}
              </p>
            </div>

            <span className="px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
              {categoryProducts.length} Items Found
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No products found in "{currentCategory.name}"
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Check back soon for new inventory or browse other craft disciplines.
            </p>
            <Link
              href="/user/products"
              className="inline-block px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-500 transition-all"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
