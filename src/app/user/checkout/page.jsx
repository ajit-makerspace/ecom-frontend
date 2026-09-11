'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserPortal } from '@/context/user/UserPortalContext';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { formatCurrency } from '@/lib/utils';
import { ShieldCheck, CheckCircle2, CreditCard, Truck, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useUserPortal();
  const [placed, setPlaced] = useState(false);

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Maker',
    email: 'alex.maker@example.com',
    address: '42 Tech Innovation Blvd',
    city: 'San Jose',
    zip: '95110',
    paymentMethod: 'card',
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <UserLayout>
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-lg font-sans">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-black text-slate-900 uppercase">
            Order Placed Successfully!
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed">
            Thank you for shopping at <strong>MakerSpace Shop Megatorium</strong>! Your order <strong className="text-slate-900">#MS-{Math.floor(100000 + Math.random() * 900000)}</strong> has been confirmed and is being packed.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-600 space-y-1 text-left">
            <p><strong>Shipping Address:</strong> {formData.address}, {formData.city}, {formData.zip}</p>
            <p><strong>Payment Method:</strong> {formData.paymentMethod === 'card' ? 'Credit Card (Mock)' : 'Cash on Delivery'}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
            <Link
              href="/user/products"
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs uppercase shadow-md hover:bg-amber-500 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-black uppercase">
            Secure Checkout
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Complete your order details to receive your craft equipment.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                Shipping Information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                Payment Method
              </h2>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  />
                  <span className="font-bold text-slate-800">Credit / Debit Card (Simulated)</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  />
                  <span className="font-bold text-slate-800">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6 h-fit">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Order Review
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs">
                  <span className="truncate max-w-[170px] text-slate-700 font-semibold">{product.name} x{quantity}</span>
                  <span className="font-bold text-slate-900">{formatCurrency(product.price * quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span className="font-bold text-emerald-600 uppercase">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
                <span>Total Due:</span>
                <span className="text-base text-amber-600">{formatCurrency(cartSubtotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wide shadow-md transition-all cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}
