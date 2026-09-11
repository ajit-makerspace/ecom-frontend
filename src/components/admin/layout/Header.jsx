'use client';

import React from 'react';
import { Bell, User } from 'lucide-react';

export function Header({ onOpenMobileSidebar, onOpenLogoutModal }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-end">
      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell Button */}
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* User Profile Avatar Icon */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              if (onOpenLogoutModal) onOpenLogoutModal();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:bg-blue-50 transition-all overflow-hidden cursor-pointer"
            title="Super Admin Profile"
          >
            <User className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
