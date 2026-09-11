'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function FullCartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal } = useUserPortal();

  return (
    <UserLayout>
      <div className="space-y-6 font-sans">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              Shopping Cart Summary
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Review your selected maker tools, materials, and equipment before checkout.
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 hover:underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your shopping cart is empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Browse our 21 categories to add high-performance craft and technology products.
            </p>
            <Link
              href="/user/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs uppercase shadow-md hover:bg-amber-500 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Items Table */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Cart Items ({cart.reduce((a, c) => a + c.quantity, 0)})
              </h2>

              <div className="space-y-4 divide-y divide-slate-100">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        {product.categoryName}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 truncate">
                        {product.name}
                      </h3>
                      <div className="text-xs font-black text-slate-900 mt-1">
                        {formatCurrency(product.price)}
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-white rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-white rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-black text-sm text-slate-900">
                      {formatCurrency(product.price * quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/user/products"
                  className="text-xs font-bold text-slate-600 hover:text-amber-600 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6 h-fit">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="font-bold text-emerald-600 uppercase">Free</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-100 text-sm font-black text-slate-900">
                  <span>Total:</span>
                  <span className="text-base text-amber-600">{formatCurrency(cartSubtotal)}</span>
                </div>
              </div>

              <Link
                href="/user/checkout"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
