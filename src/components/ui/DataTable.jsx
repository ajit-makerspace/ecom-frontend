'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export function DataTable({
  columns = [],
  data = [],
  keyExtractor = (item, index) => item.id || index,
  emptyMessage = 'No data available.',
  initialRowsPerPage = 10,
  rowsPerPageOptions = [10, 20, 50],
}) {
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = data.slice(startIndex, startIndex + rowsPerPage);

  const handleRowsPerPageChange = (newRows) => {
    setRowsPerPage(newRows);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase">
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`py-3.5 px-6 ${col.headerClassName || ''} ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
                <tr
                  key={keyExtractor(item, startIndex + index)}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.key || colIdx}
                      className={`py-3.5 px-6 ${col.className || ''} ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      }`}
                    >
                      {col.render
                        ? col.render(item, startIndex + index)
                        : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="py-12 text-center text-slate-400 text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="py-3.5 px-6 bg-white border-t border-slate-100 flex items-center justify-end gap-6 text-xs text-slate-600 font-medium">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <div className="relative inline-block">
            <select
              value={rowsPerPage}
              onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
              className="appearance-none bg-transparent pl-2 pr-6 py-1 font-semibold text-slate-800 cursor-pointer focus:outline-none"
            >
              {rowsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Page Range */}
        <div>
          {totalRows > 0
            ? `${startIndex + 1}-${Math.min(
                startIndex + rowsPerPage,
                totalRows
              )} of ${totalRows}`
            : '0 of 0'}
        </div>

        {/* Next / Previous Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
