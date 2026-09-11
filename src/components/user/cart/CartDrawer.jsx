'use client';

import React from 'react';
import Link from 'next/link';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { formatCurrency } from '@/lib/utils';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useUserPortal();

  if (!isCartDrawerOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div className="fixed top-0 bottom-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 animate-in slide-in-from-right font-sans">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base tracking-tight uppercase">
              Your Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-700 text-sm">Your cart is currently empty</p>
              <p className="text-xs text-slate-500 max-w-xs">
                Explore our 21 maker & craft categories to discover amazing tools and kits!
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 group relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">
                    {product.categoryName}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs font-black text-slate-900 mt-1">
                    {formatCurrency(product.price)}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">each</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 rounded-l-lg text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 rounded-r-lg text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right self-start font-bold text-xs text-slate-900">
                  {formatCurrency(product.price * quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Action Buttons */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Estimated Shipping:</span>
                <span className="font-bold text-emerald-600 uppercase text-[11px]">Free</span>
              </div>
              <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total:</span>
                <span className="text-base text-amber-600">{formatCurrency(cartSubtotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/user/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="py-3 px-4 rounded-xl border border-slate-300 text-center text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all"
              >
                View Cart
              </Link>
              <Link
                href="/user/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
