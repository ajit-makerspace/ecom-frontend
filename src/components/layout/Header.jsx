'use client';

import React, { useState } from 'react';
import {
  Bell,
  Plus,
  ShoppingBag,
  Package,
  CheckCircle,
  ExternalLink,
  LogOut,
  User,
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { api } from '@/lib/api';
import { AddEditProductModal } from '../products/AddEditProductModal';

export function Header({ onOpenMobileSidebar, onOpenLogoutModal }) {
  const { globalSearch, setGlobalSearch } = useAdminData();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'New Category Added',
      desc: 'Fashion category was updated',
      time: '5m ago',
      icon: ShoppingBag,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      desc: 'Sneakers (3 left in inventory)',
      time: '1h ago',
      icon: Package,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: '3',
      title: 'New High Value Order',
      desc: 'Order #ORD-9422 received',
      time: '2h ago',
      icon: ShoppingBag,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: '4',
      title: 'System Update',
      desc: 'Dashboard v2.0 live',
      time: '4h ago',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-end">

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Bell Dropdown with Badge 4 */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {/* Red Badge Counter 4 */}
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white shadow-xs">
                4
              </span>
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900">
                      Notifications
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      4 New
                    </span>
                  </div>

                  <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div
                          key={n.id}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className={`p-1.5 rounded-md shrink-0 ${n.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900">
                              {n.title}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {n.desc}
                            </p>
                            <span className="text-[9px] text-slate-400 mt-0.5 block">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center justify-center gap-1 w-full py-1"
                    >
                      View All Alerts <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar Icon */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                if (onOpenLogoutModal) onOpenLogoutModal();
              }}
              className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:bg-blue-50 transition-all overflow-hidden"
              title="Super Admin Profile"
            >
              <User className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Add Product Modal trigger */}
      <AddEditProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
