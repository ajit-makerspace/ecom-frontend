'use client';

import React from 'react';
import { useAdminData } from '@/context/AdminDataContext';
import { AlertTriangle, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function LowStockAlert() {
  const { products, updateProduct, addToast } = useAdminData();

  const lowStockItems = products.filter((p) => p.stock <= 10).slice(0, 4);

  const handleRestock = (id, name, currentStock) => {
    updateProduct(id, { stock: currentStock + 20, status: 'Active' });
    addToast('success', 'Stock Replenished', `+20 units added to ${name}.`);
  };

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/60 via-white to-white border border-amber-200/60 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Inventory Alert
            </h3>
            <p className="text-[11px] text-slate-500">
              Items requiring immediate restock
            </p>
          </div>
        </div>
        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700">
          {lowStockItems.length} Low
        </span>
      </div>

      <div className="space-y-2.5 my-2">
        {lowStockItems.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            All inventory levels are healthy!
          </p>
        ) : (
          lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-100"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-slate-900 truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {formatCurrency(item.price)} • {item.stock} left in stock
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRestock(item.id, item.name, item.stock)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all active:scale-95 shrink-0 ml-2"
              >
                <Plus className="w-3 h-3" /> Restock
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
