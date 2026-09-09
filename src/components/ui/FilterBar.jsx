'use client';

import React from 'react';
import { Search, Filter, X, RotateCcw, ChevronDown } from 'lucide-react';

export function FilterBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  selectFilters = [],
  onReset,
  showReset = false,
}) {
  return (
    <div className="p-4 bg-slate-50/60 border-b border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      {/* Search Input & Select Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto flex-1 max-w-2xl">
        {/* Search Bar */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 focus:border-blue-600 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
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
              className="appearance-none bg-white border border-slate-200 pl-8 pr-8 py-2 rounded-lg text-slate-700 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Reset Action */}
      {showReset && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 font-semibold transition-all shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
