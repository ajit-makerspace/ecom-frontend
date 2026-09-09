'use client';

import React, { useState } from 'react';
import { useAdminData } from '@/context/AdminDataContext';
import { formatCurrency, getStatusBadgeStyle } from '@/lib/utils';
import { OrderDetailModal } from '@/components/orders/OrderDetailModal';
import { ShoppingBag, Search, Filter, Eye, CheckCircle2, Clock, Truck } from 'lucide-react';

export default function OrdersPage() {
  const { orders, globalSearch, updateOrderStatus } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const activeSearch = searchQuery || globalSearch;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(activeSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(activeSearch.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(activeSearch.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || order.status === selectedStatus;

    const matchesPayment =
      selectedPaymentStatus === 'All' || order.paymentStatus === selectedPaymentStatus;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Metrics
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-indigo-600" />
            Orders Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track customer orders, manage shipping status, and process refunds.
          </p>
        </div>
      </div>

      {/* Orders Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending</span>
            <span className="text-base font-extrabold text-slate-900">{pendingCount}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Processing</span>
            <span className="text-base font-extrabold text-slate-900">{processingCount}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Shipped</span>
            <span className="text-base font-extrabold text-slate-900">{shippedCount}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Delivered</span>
            <span className="text-base font-extrabold text-slate-900">{deliveredCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Order ID, Customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Order Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Payment:</span>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Items</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Invoice</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No orders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const badge = getStatusBadgeStyle(order.status);
                  const payBadge = getStatusBadgeStyle(order.paymentStatus);

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Order ID */}
                      <td className="py-3.5 px-3 font-bold text-slate-900">
                        {order.id}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={order.customerAvatar}
                            alt={order.customerName}
                            className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-slate-900 truncate">
                              {order.customerName}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {order.customerEmail}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-slate-500">
                        {order.date}
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-3 text-slate-700">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-3 font-extrabold text-slate-900">
                        {formatCurrency(order.total)}
                      </td>

                      {/* Payment Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${payBadge.bg} ${payBadge.text}`}
                        >
                          {order.paymentStatus} ({order.paymentMethod})
                        </span>
                      </td>

                      {/* Order Status Select */}
                      <td className="py-3.5 px-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text} border-none focus:outline-none cursor-pointer`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
