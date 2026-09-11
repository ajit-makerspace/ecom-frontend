'use client';

import React, { useState } from 'react';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { formatCurrency, getStatusBadgeStyle } from '@/lib/utils';
import { Users, Search, Filter, Mail, Phone, MapPin, Crown, ShoppingBag } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

export default function CustomersPage() {
  const { customers, globalSearch } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const activeSearch = searchQuery || globalSearch;

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      cust.email.toLowerCase().includes(activeSearch.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || cust.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-indigo-600" />
            Customers Roster
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View customer profiles, total lifetime spending, order history, and VIP status.
          </p>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Customer Tier:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none"
            >
              <option value="All">All Tiers</option>
              <option value="VIP">VIP</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Data Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Orders</th>
                <th className="py-3 px-3">Total Spent</th>
                <th className="py-3 px-3">Joined Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No customers found matching search filter.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const badge = getStatusBadgeStyle(cust.status);

                  return (
                    <tr
                      key={cust.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedCustomer(cust)}
                    >
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={cust.avatar}
                            alt={cust.name}
                            className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                              {cust.name}
                              {cust.status === 'VIP' && (
                                <Crown className="w-3 h-3 text-amber-500 fill-amber-400 inline" />
                              )}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {cust.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-slate-500 font-mono">
                        {cust.phone}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {cust.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 font-semibold">
                        {cust.totalOrders} orders
                      </td>

                      <td className="py-3.5 px-3 font-extrabold text-slate-900">
                        {formatCurrency(cust.totalSpent)}
                      </td>

                      <td className="py-3.5 px-3 text-slate-500">
                        {cust.joinedDate}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(cust);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                        >
                          View Profile
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

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer Profile: ${selectedCustomer.name}`}
          subtitle={`ID: ${selectedCustomer.id}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  {selectedCustomer.name}
                  {selectedCustomer.status === 'VIP' && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white flex items-center gap-1">
                      <Crown className="w-3 h-3" /> VIP MEMBER
                    </span>
                  )}
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Member since {selectedCustomer.joinedDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Total Orders Placed
                </span>
                <span className="text-lg font-extrabold text-slate-900 flex items-center gap-1 mt-1">
                  <ShoppingBag className="w-4 h-4 text-indigo-500" />
                  {selectedCustomer.totalOrders} Orders
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Lifetime Value
                </span>
                <span className="text-lg font-extrabold text-indigo-600 mt-1 block">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </span>
              </div>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white border border-slate-200">
              <h4 className="font-bold text-slate-900 border-b pb-2">
                Contact & Shipping Details
              </h4>
              <p className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {selectedCustomer.email}
              </p>
              <p className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {selectedCustomer.phone}
              </p>
              <p className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                {selectedCustomer.address}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
