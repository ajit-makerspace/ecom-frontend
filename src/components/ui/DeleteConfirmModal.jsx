'use client';

import React from 'react';
import { Modal } from './Modal';
import { Trash2, AlertTriangle } from 'lucide-react';

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  itemName = '',
  description = 'This action cannot be undone. Are you sure you want to permanently delete this item?',
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        {/* Warning Icon & Details */}
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-rose-50/80 border border-rose-100">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              Are you sure you want to delete {itemName ? `"${itemName}"` : 'this item'}?
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              {description}
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
            onClick={handleConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
