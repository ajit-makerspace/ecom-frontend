'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { useAdminData } from '@/context/AdminDataContext';
import { formatCurrency, getStatusBadgeStyle } from '@/lib/utils';
import {
  CreditCard,
  MapPin,
  Mail,
  User,
  Truck,
} from 'lucide-react';

export function OrderDetailModal({ isOpen, onClose, order }) {
  const { updateOrderStatus } = useAdminData();

  if (!order) return null;

  const badge = getStatusBadgeStyle(order.status);
  const payBadge = getStatusBadgeStyle(order.paymentStatus);

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
  };

  const statuses = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Invoice #${order.id}`}
      subtitle={`Placed on ${order.date}`}
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs">
        {/* Status bar & Updater */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Current Order Lifecycle
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                {order.status}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${payBadge.bg} ${payBadge.text}`}
              >
                Payment: {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Quick status dropdown */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-slate-600">
              Update Status:
            </label>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="w-4 h-4 text-indigo-500" /> Customer Information
            </h4>
            <div className="flex items-center gap-3 pt-1">
              <img
                src={order.customerAvatar}
                alt={order.customerName}
                className="w-10 h-10 rounded-full object-cover shrink-0 border"
              />
              <div>
                <p className="font-semibold text-slate-900">
                  {order.customerName}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3 inline" /> {order.customerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Truck className="w-4 h-4 text-indigo-500" /> Shipping & Payment
            </h4>
            <p className="text-slate-700 flex items-start gap-2 pt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{order.shippingAddress}</span>
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Method: {order.paymentMethod}</span>
            </p>
          </div>
        </div>

        {/* Order Line Items */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900">Ordered Items</h4>
          <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 flex items-center justify-between gap-3 bg-white"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                <div className="font-bold text-slate-900">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Breakdown */}
        <div className="p-4 rounded-xl bg-slate-50 space-y-2 border border-slate-200 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping Fee</span>
            <span className="text-emerald-600 font-semibold">
              FREE
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
            <span>Grand Total</span>
            <span className="text-indigo-600">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
