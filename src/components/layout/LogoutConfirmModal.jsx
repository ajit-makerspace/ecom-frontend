'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { LogOut, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';

export function LogoutConfirmModal({ isOpen, onClose }) {
  const handleConfirmLogout = () => {
    api.logout();
    window.location.href = '/login';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Logout"
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        {/* Warning Badge & Message */}
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-rose-50/80 border border-rose-100">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              Are you sure you want to log out?
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Logging out will end your current Super Admin session. You will need to sign in again to access the store management dashboard.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Yes, Log Out
          </button>
        </div>
      </div>
    </Modal>
  );
}
