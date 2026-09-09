'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminData } from '@/context/AdminDataContext';
import { AddSubCategoryModal } from '@/components/categories/AddSubCategoryModal';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';
import { Trash2, Upload, FileText } from 'lucide-react';

function SubCategoryListContent() {
  const searchParams = useSearchParams();
  const { subCategories, createSubCategory, deleteSubCategory, addToast } = useAdminData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Delete Confirmation Modal State
  const [deletingSubCategory, setDeletingSubCategory] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  const handleDeleteClick = (sub) => {
    setDeletingSubCategory(sub);
  };

  const handleConfirmDelete = () => {
    if (deletingSubCategory) {
      deleteSubCategory(deletingSubCategory.id);
      setDeletingSubCategory(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
  };

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
          addToast('error', 'CSV Error', 'CSV file is empty.');
          return;
        }

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        const nameIdx = headers.findIndex((h) => h.includes('sub') || h.includes('name'));
        const parentIdx = headers.findIndex((h) => h.includes('parent') || h.includes('category'));
        const codeIdx = headers.findIndex((h) => h.includes('code'));
        const statusIdx = headers.findIndex((h) => h.includes('status'));
        const imageIdx = headers.findIndex((h) => h.includes('image') || h.includes('url'));

        let importedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
          const nameVal = nameIdx !== -1 ? cols[nameIdx] : cols[0];
          if (!nameVal) continue;

          const parentVal = parentIdx !== -1 && cols[parentIdx] ? cols[parentIdx] : 'General';
          const rawCode = codeIdx !== -1 ? cols[codeIdx].replace(/\D/g, '') : '';
          const codeVal = rawCode.length === 4
            ? rawCode
            : Math.floor(2000 + Math.random() * 8000).toString();
          const statusVal = statusIdx !== -1 && cols[statusIdx] ? cols[statusIdx] : 'Active';
          const imageVal = imageIdx !== -1 && cols[imageIdx] ? cols[imageIdx].trim() : '';

          await createSubCategory({
            name: nameVal,
            categoryName: parentVal,
            code: codeVal,
            status: statusVal,
            image: imageVal,
          });

          importedCount++;
        }

        addToast('success', 'CSV Import Successful', `Imported ${importedCount} sub-categories successfully.`);
      } catch (err) {
        console.error('Error parsing CSV:', err);
        addToast('error', 'Import Error', 'Failed to parse CSV file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter((sub, index) => {
      const rawCode = String(sub.code || '').replace(/\D/g, '');
      const formattedCode = rawCode.length === 4
        ? rawCode
        : String(2001 + index).padStart(4, '0');

      const matchesSearch =
        searchTerm.trim() === '' ||
        sub.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (sub.categoryName || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        formattedCode.includes(searchTerm.trim());

      const subStatus = sub.status || 'Active';
      const matchesStatus =
        statusFilter === 'ALL' || subStatus.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [subCategories, searchTerm, statusFilter]);

  const columns = [
    {
      key: 'image',
      header: 'IMAGE',
      width: '80px',
      render: (sub) => {
        if (!sub.image || !sub.image.trim()) {
          return <span className="text-slate-400 text-xs font-semibold px-2">—</span>;
        }
        const imgStr = sub.image.trim();
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
              alt={sub.name}
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
      header: 'SUB CATEGORY NAME',
      className: 'font-medium text-slate-800',
    },
    {
      key: 'categoryName',
      header: 'PARENT CATEGORY',
      render: (sub) => (
        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
          {sub.categoryName || 'General'}
        </span>
      ),
    },
    {
      key: 'code',
      header: 'CODE',
      render: (sub, index) => {
        const rawCode = String(sub.code || '').replace(/\D/g, '');
        const formattedCode = rawCode.length === 4
          ? rawCode
          : String(2001 + index).padStart(4, '0');

        return (
          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-mono text-xs font-bold text-slate-700 tracking-wider">
            {formattedCode}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (sub) => <StatusBadge status={sub.status || 'Active'} />,
    },
    {
      key: 'action',
      header: 'ACTION',
      align: 'right',
      width: '100px',
      render: (sub) => (
        <div className="flex items-center justify-end gap-3 text-slate-500">
          <button
            onClick={() => handleDeleteClick(sub)}
            className="p-1 hover:text-rose-600 transition-colors"
            title="Delete Sub Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Sub Category List
        </h1>

        <div className="flex items-center gap-3">
          <label
            className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-white border border-slate-200/90 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
            title="Import Sub-Categories from CSV File"
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

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            ADD SUB CATEGORY
          </button>
        </div>
      </div>

      {/* Filter Bar & DataTable */}
      <div className="space-y-0">
        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search subcategory name, parent, or code..."
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
          data={filteredSubCategories}
          keyExtractor={(sub) => sub.id}
          emptyMessage={
            searchTerm || statusFilter !== 'ALL'
              ? 'No sub-categories match your search criteria.'
              : 'No sub-categories found. Click "ADD SUB CATEGORY" or "IMPORT CSV" to create one.'
          }
        />
      </div>

      {/* Add Sub Category Modal */}
      <AddSubCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingSubCategory)}
        onClose={() => setDeletingSubCategory(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Sub Category"
        itemName={deletingSubCategory?.name || ''}
        description="Deleting this sub-category will permanently remove it from your store catalog. This action cannot be undone."
      />
    </div>
  );
}

export default function SubCategoryListPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-400">Loading sub-category list...</div>}>
      <SubCategoryListContent />
    </Suspense>
  );
}
