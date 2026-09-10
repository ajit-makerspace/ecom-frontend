'use client';

import React from 'react';
import { Search, Filter, X, RotateCcw, ChevronDown } from 'lucide-react';

export function FilterBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = '',
  selectFilters = [],
  onReset,
  showReset = false,
  actions = null,
}) {
  return (
    <div className="p-3 bg-slate-50/60 border-b border-slate-200/80 flex flex-nowrap items-center justify-between gap-2.5 text-xs overflow-x-auto no-scrollbar">
      {/* Search Input & Select Dropdowns (Single Line) */}
      <div className="flex flex-nowrap items-center gap-2.5 flex-1 min-w-0">
        {/* Search Bar */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[140px] max-w-[240px] shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 focus:border-blue-600 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Select Dropdown Filters */}
        {selectFilters.map((filter, idx) => (
          <div key={filter.id || idx} className="relative shrink-0">
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 pl-7 pr-7 py-1.5 rounded-lg text-slate-700 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer text-xs"
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Filter className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Right Side Actions & Reset */}
      <div className="flex items-center gap-2.5 shrink-0 ml-auto">
        {actions}
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 font-semibold transition-all shrink-0 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
