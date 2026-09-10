'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminData } from '@/context/AdminDataContext';
import { AddCategoryModal } from '@/components/categories/AddCategoryModal';
import { ImportCsvModal } from '@/components/categories/ImportCsvModal';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';
import { Edit2, Trash2, Upload, Download, FileText } from 'lucide-react';

function CategoryListContent() {
  const searchParams = useSearchParams();
  const { categories, createCategory, bulkImportCategories, deleteCategory, updateCategory, addToast } = useAdminData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Delete Confirmation Modal State
  const [deletingCategory, setDeletingCategory] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setDeletingCategory(category);
  };

  const handleConfirmDelete = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id);
      setDeletingCategory(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
  };

  // Export Filtered Categories to CSV
  const handleExportCsv = () => {
    if (filteredCategories.length === 0) {
      addToast('error', 'Export Warning', 'No categories available to export.');
      return;
    }

    const headers = ['Category Name', 'Code', 'Slug', 'Product Count', 'Status', 'Image URL'];
    const rows = filteredCategories.map((c, index) => {
      const name = `"${String(c.name || '').replace(/"/g, '""')}"`;
      const rawCode = String(c.code || '').replace(/\D/g, '');
      const code = `"${rawCode.length === 4 ? rawCode : String(1001 + index).padStart(4, '0')}"`;
      const slug = `"${String(c.slug || '').replace(/"/g, '""')}"`;
      const count = c.productCount || 0;
      const status = c.status || 'Active';
      const image = `"${String(c.image || '').replace(/"/g, '""')}"`;
      return `${name},${code},${slug},${count},${status},${image}`;
    });

    const csvString = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `categories_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('success', 'Export Successful', `Exported ${filteredCategories.length} categories to CSV.`);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const nameMatch = (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const slugMatch = (cat.slug || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const codeMatch = (cat.code || '').toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesSearch = searchTerm.trim() === '' || nameMatch || slugMatch || codeMatch;

      const catStatus = cat.status || 'Active';
      const matchesStatus =
        statusFilter === 'ALL' || catStatus.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const columns = [
    {
      key: 'image',
      header: 'IMAGE',
      width: '80px',
      render: (cat) => {
        if (!cat.image || !cat.image.trim()) {
          return <span className="text-slate-400 text-xs font-semibold px-2">—</span>;
        }
        const imgStr = cat.image.trim();
        const isPdf = imgStr.toLowerCase().startsWith('data:application/pdf') || imgStr.toLowerCase().endsWith('.pdf');
        if (isPdf) {
          return (
            <a
              href={imgStr}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-600 font-bold text-[11px] hover:bg-rose-100 transition-colors"
              title="Click to view PDF document"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>
          );
        }
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-50 p-1 flex items-center justify-center border border-slate-100 overflow-hidden">
            <img
              src={imgStr}
              alt={cat.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        );
      },
    },
    {
      key: 'name',
      header: 'CATEGORY NAME',
      className: 'font-medium text-slate-800',
    },
    {
      key: 'code',
      header: 'CODE',
      render: (cat, index) => {
        const rawCode = String(cat.code || '').replace(/\D/g, '');
        const formattedCode = rawCode.length === 4
          ? rawCode
          : String(1001 + index).padStart(4, '0');

        return (
          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-mono text-xs font-bold text-slate-700 tracking-wider">
            {formattedCode}
          </span>
        );
      },
    },
    {
      key: 'productCount',
      header: 'PRODUCTS',
      render: (cat) => (
        <span className="text-slate-600 font-semibold text-xs">
          {cat.productCount || 0} items
        </span>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (cat) => <StatusBadge status={cat.status || 'Active'} />,
    },
    {
      key: 'action',
      header: 'ACTION',
      align: 'right',
      width: '100px',
      render: (cat) => (
        <div className="flex items-center justify-end gap-3 text-slate-500">
          <button
            onClick={() => handleEdit(cat)}
            className="p-1 hover:text-blue-600 transition-colors"
            title="Edit Category"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteClick(cat)}
            className="p-1 hover:text-rose-600 transition-colors"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Category List
        </h1>

        <div className="flex items-center gap-3">
          {/* IMPORT CSV Button */}
          <button
            type="button"
            onClick={() => setIsCsvModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-white border border-slate-200/90 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
            title="Import Categories from CSV File"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>IMPORT CSV</span>
          </button>

          {/* ADD CATEGORY Button */}
          <button
            onClick={() => {
              setEditingCategory(null);
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            ADD CATEGORY
          </button>
        </div>
      </div>

      {/* Filter Toolbar & DataTable */}
      <div className="space-y-0">
        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          selectFilters={[
            {
              id: 'status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: 'ALL', label: 'All Status' },
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
              ],
            },
          ]}
          actions={
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
              title="Export filtered categories to CSV file"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>EXPORT CSV</span>
            </button>
          }
          showReset={Boolean(searchTerm || statusFilter !== 'ALL')}
          onReset={handleResetFilters}
        />

        <DataTable
          columns={columns}
          data={filteredCategories}
          keyExtractor={(cat) => cat.id}
          emptyMessage={
            searchTerm || statusFilter !== 'ALL'
              ? 'No categories match your search or filter criteria.'
              : 'No categories found. Click "ADD CATEGORY" or "IMPORT CSV" to add categories.'
          }
        />
      </div>

      {/* Add / Edit Category Modal */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCategory(null);
        }}
        editCategory={editingCategory}
      />

      {/* Bulk Import CSV Modal */}
      <ImportCsvModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        type="category"
        onImport={bulkImportCategories}
      />

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        itemName={deletingCategory?.name || ''}
        description="Deleting this category will permanently remove it from your store catalog. This action cannot be undone."
      />
    </div>
  );
}

export default function CategoryListPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-400">Loading category list...</div>}>
      <CategoryListContent />
    </Suspense>
  );
}
