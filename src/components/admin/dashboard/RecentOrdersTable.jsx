'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { formatCurrency, getStatusBadgeStyle } from '@/lib/utils';
import { OrderDetailModal } from '@/components/admin/orders/OrderDetailModal';
import { Eye, ArrowUpRight } from 'lucide-react';

export function RecentOrdersTable() {
  const { orders } = useAdminData();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Orders
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest transactions placed across all channels
            </p>
          </div>

          <Link
            href="/orders"
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
          >
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Items</th>
                <th className="py-3 px-2">Total</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentOrders.map((order) => {
                const badge = getStatusBadgeStyle(order.status);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-2 font-bold text-slate-900">
                      {order.id}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={order.customerAvatar}
                          alt={order.customerName}
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="truncate text-slate-800 font-medium">
                            {order.customerName}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">
                            {order.customerEmail}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-slate-600">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </td>

                    <td className="py-3 px-2 font-bold text-slate-900">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {order.status}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}
    </>
  );
}
