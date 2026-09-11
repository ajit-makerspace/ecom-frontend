'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { AddModuleModal } from '@/components/admin/categories/AddModuleModal';
import { ImportCsvModal } from '@/components/admin/categories/ImportCsvModal';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';
import { Edit2, Trash2, Upload, Download, FileText } from 'lucide-react';

function ModuleListContent() {
  const { modules, bulkImportModules, deleteModule, addToast } = useAdminData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [deletingModule, setDeletingModule] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleEdit = (mod) => {
    setEditingModule(mod);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = (mod) => {
    setDeletingModule(mod);
  };

  const handleConfirmDelete = () => {
    if (deletingModule) {
      deleteModule(deletingModule.id);
      setDeletingModule(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
  };

  // Export Filtered Modules to CSV
  const handleExportCsv = () => {
    if (filteredModules.length === 0) {
      addToast('error', 'Export Warning', 'No modules available to export.');
      return;
    }

    const headers = ['Module Name', 'Code', 'Slug', 'Categories Count', 'Status', 'Image URL'];
    const rows = filteredModules.map((m, index) => {
      const name = `"${String(m.name || '').replace(/"/g, '""')}"`;
      const rawCode = String(m.code || '').replace(/\D/g, '');
      const code = `"${rawCode.length === 4 ? rawCode : String(1000 + index).padStart(4, '0')}"`;
      const slug = `"${String(m.slug || '').replace(/"/g, '""')}"`;
      const count = m.categoryCount || 0;
      const status = m.status || 'Active';
      const image = `"${String(m.image || '').replace(/"/g, '""')}"`;
      return `${name},${code},${slug},${count},${status},${image}`;
    });

    const csvString = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `modules_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('success', 'Export Successful', `Exported ${filteredModules.length} modules to CSV.`);
  };

  const filteredModules = useMemo(() => {
    return modules.filter((mod) => {
      const nameMatch = (mod.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const slugMatch = (mod.slug || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const codeMatch = (mod.code || '').toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesSearch = searchTerm.trim() === '' || nameMatch || slugMatch || codeMatch;

      const modStatus = mod.status || 'Active';
      const matchesStatus =
        statusFilter === 'ALL' || modStatus.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [modules, searchTerm, statusFilter]);

  const columns = [
    {
      key: 'image',
      header: 'IMAGE',
      width: '80px',
      render: (mod) => {
        if (!mod.image || !mod.image.trim()) {
          return <span className="text-slate-400 text-xs font-semibold px-2">—</span>;
        }
        const imgStr = mod.image.trim();
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
              alt={mod.name}
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
      header: 'MODULE NAME',
      className: 'font-medium text-slate-800',
    },
    {
      key: 'code',
      header: 'CODE',
      render: (mod, index) => {
        const rawCode = String(mod.code || '').replace(/\D/g, '');
        const formattedCode = rawCode.length === 4
          ? rawCode
          : String(1000 + index).padStart(4, '0');

        return (
          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-mono text-xs font-bold text-slate-700 tracking-wider">
            {formattedCode}
          </span>
        );
      },
    },
    {
      key: 'categoryCount',
      header: 'CATEGORIES',
      render: (mod) => (
        <span className="text-slate-600 font-semibold text-xs">
          {mod.categoryCount || 0} categories
        </span>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (mod) => <StatusBadge status={mod.status || 'Active'} />,
    },
    {
      key: 'action',
      header: 'ACTION',
      align: 'right',
      width: '100px',
      render: (mod) => (
        <div className="flex items-center justify-end gap-3 text-slate-500">
          <button
            onClick={() => handleEdit(mod)}
            className="p-1 hover:text-blue-600 transition-colors"
            title="Edit Module"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteClick(mod)}
            className="p-1 hover:text-rose-600 transition-colors"
            title="Delete Module"
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
          Module List
        </h1>

        <div className="flex items-center gap-3">
          {/* IMPORT CSV Button */}
          <button
            type="button"
            onClick={() => setIsCsvModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-white border border-slate-200/90 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
            title="Import Modules from CSV File"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>IMPORT CSV</span>
          </button>

          {/* ADD MODULE Button */}
          <button
            onClick={() => {
              setEditingModule(null);
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            ADD MODULE
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
              title="Export filtered modules to CSV file"
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
          data={filteredModules}
          keyExtractor={(mod) => mod.id}
          emptyMessage={
            searchTerm || statusFilter !== 'ALL'
              ? 'No modules match your search or filter criteria.'
              : 'No modules found. Click "ADD MODULE" or "IMPORT CSV" to add modules.'
          }
        />
      </div>

      {/* Add / Edit Module Modal */}
      <AddModuleModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingModule(null);
        }}
        editModule={editingModule}
      />

      {/* Bulk Import CSV Modal */}
      <ImportCsvModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        type="module"
        onImport={bulkImportModules}
      />

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingModule)}
        onClose={() => setDeletingModule(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Module"
        itemName={deletingModule?.name || ''}
        description="Deleting this module will remove it from your store hierarchy. Categories under this module may be affected."
      />
    </div>
  );
}

export default function ModuleListPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-400">Loading module list...</div>}>
      <ModuleListContent />
    </Suspense>
  );
}
