'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminData } from '@/context/AdminDataContext';
import { AddCategoryModal } from '@/components/categories/AddCategoryModal';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';
import { Edit2, Trash2, Upload, FileText } from 'lucide-react';

function CategoryListContent() {
  const searchParams = useSearchParams();
  const { categories, createCategory, deleteCategory, updateCategory, addToast } = useAdminData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const handleDeleteClick = (cat) => {
    setDeletingCategory(cat);
  };

  const handleConfirmDelete = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id);
      setDeletingCategory(null);
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setIsAddModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
  };

  // CSV Import Handler
  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') return;

        const lines = text.split(/\r\n|\n/).filter((line) => line.trim());
        if (lines.length <= 1) {
          addToast('error', 'CSV Error', 'CSV file is empty or missing data rows.');
          return;
        }

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        const nameIdx = headers.findIndex((h) => h.includes('name') || h.includes('category'));
        const codeIdx = headers.findIndex((h) => h.includes('code'));
        const statusIdx = headers.findIndex((h) => h.includes('status'));
        const imageIdx = headers.findIndex((h) => h.includes('image') || h.includes('url'));

        let importedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
          const nameVal = nameIdx !== -1 ? cols[nameIdx] : cols[0];
          if (!nameVal) continue;

          const rawCode = codeIdx !== -1 ? cols[codeIdx].replace(/\D/g, '') : '';
          const codeVal = rawCode.length === 4
            ? rawCode
            : Math.floor(1000 + Math.random() * 9000).toString();

          const statusVal = statusIdx !== -1 && cols[statusIdx] ? cols[statusIdx] : 'Active';
          const imageVal = imageIdx !== -1 && cols[imageIdx] ? cols[imageIdx].trim() : '';

          await createCategory({
            name: nameVal,
            code: codeVal,
            status: statusVal,
            image: imageVal,
          });

          importedCount++;
        }

        addToast('success', 'CSV Import Successful', `Imported ${importedCount} categories successfully.`);
      } catch (err) {
        console.error('Error parsing CSV:', err);
        addToast('error', 'Import Error', 'Failed to parse CSV file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat, index) => {
      const rawCode = String(cat.code || '').replace(/\D/g, '');
      const formattedCode = rawCode.length === 4
        ? rawCode
        : String(1001 + index).padStart(4, '0');

      const matchesSearch =
        searchTerm.trim() === '' ||
        cat.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        formattedCode.includes(searchTerm.trim());

      const catStatus = cat.status || 'Active';
      const matchesStatus =
        statusFilter === 'ALL' || catStatus.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  // Column definitions for DataTable
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
          <div className="w-12 h-12 rounded-lg bg-slate-50 p-1 flex items-center justify-center border border-slate-100 overflow-hidden">
            <img
              src={imgStr}
              alt={cat.name}
              className="w-10 h-10 object-contain"
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
      className: 'font-medium text-slate-900',
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
          <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200/60 font-mono text-xs font-bold text-slate-700 tracking-wider">
            {formattedCode}
          </span>
        );
      },
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
          <label
            className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-white border border-slate-200/90 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
            title="Import Categories from CSV File"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>IMPORT CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>

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
          searchPlaceholder="Search category name or 4-digit code (e.g. Fashion, 1001)..."
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
