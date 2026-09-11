'use client';

import React, { useState, useMemo } from 'react';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { formatCurrency } from '@/lib/utils';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';
import { AddEditProductModal } from '@/components/admin/products/AddEditProductModal';
import { ViewProductModal } from '@/components/admin/products/ViewProductModal';
import { ProductDetailsView } from '@/components/admin/products/ProductDetailsView';
import { ImportCsvModal } from '@/components/admin/categories/ImportCsvModal';
import { Edit2, Trash2, Eye, Upload, Download, FileText } from 'lucide-react';

export default function ProductsPage() {
  const { products, categories, subCategories, bulkImportProducts, deleteProduct, addToast } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [subCategoryFilter, setSubCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddEditModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('ALL');
    setSubCategoryFilter('ALL');
    setStatusFilter('ALL');
  };

  // Export Filtered Products to CSV
  const handleExportCsv = () => {
    if (filteredProducts.length === 0) {
      addToast('error', 'Export Warning', 'No products available to export.');
      return;
    }

    const headers = ['Product Name', 'SKU', 'Category', 'Sub Category', 'Brand', 'Price', 'Old Price', 'Weight', 'Status', 'Image URL'];
    const rows = filteredProducts.map((p) => {
      const name = `"${String(p.name || '').replace(/"/g, '""')}"`;
      const sku = `"${String(p.sku || '').replace(/"/g, '""')}"`;
      const category = `"${String(p.categoryName || 'General').replace(/"/g, '""')}"`;
      const subCategory = `"${String(p.subCategoryName || '').replace(/"/g, '""')}"`;
      const brand = `"${String(p.brand || '').replace(/"/g, '""')}"`;
      const price = p.price || 0;
      const oldPrice = p.oldPrice || '';
      const weight = p.weight || '';
      const status = p.status || 'Active';
      const image = `"${String(p.image || '').replace(/"/g, '""')}"`;
      return `${name},${sku},${category},${subCategory},${brand},${price},${oldPrice},${weight},${status},${image}`;
    });

    const csvString = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `products_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('success', 'Export Successful', `Exported ${filteredProducts.length} products to CSV.`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const nameMatch = (prod.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const skuMatch = (prod.sku || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const brandMatch = (prod.brand || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const catMatch = (prod.categoryName || '').toLowerCase().includes(searchTerm.toLowerCase().trim());
      const subCatMatch = (prod.subCategoryName || '').toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesSearch = searchTerm.trim() === '' || nameMatch || skuMatch || brandMatch || catMatch || subCatMatch;

      const matchesCategory =
        categoryFilter === 'ALL' || String(prod.categoryId) === String(categoryFilter);

      const matchesSubCategory =
        subCategoryFilter === 'ALL' || String(prod.subCategoryId) === String(subCategoryFilter);

      const prodStatus = prod.status || 'Active';
      const matchesStatus =
        statusFilter === 'ALL' || prodStatus.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, subCategoryFilter, statusFilter]);

  const columns = [
    {
      key: 'image',
      header: 'IMAGE',
      width: '80px',
      render: (prod) => {
        if (!prod.image || !prod.image.trim()) {
          return <span className="text-slate-400 text-xs font-semibold px-2">—</span>;
        }
        const imgStr = prod.image.trim();
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
              alt={prod.name}
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
      header: 'NAME',
      className: 'font-medium text-slate-800',
    },
    {
      key: 'sku',
      header: 'SKU',
      render: (prod) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-mono text-xs font-bold text-slate-700 tracking-wider">
          {prod.sku || '—'}
        </span>
      ),
    },
    {
      key: 'categoryName',
      header: 'CATEGORY',
      render: (prod) => (
        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold w-fit">
          {prod.categoryName || 'General'}
        </span>
      ),
    },
    {
      key: 'subCategoryName',
      header: 'SUBCATEGORY',
      render: (prod) => (
        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium w-fit">
          {prod.subCategoryName || '—'}
        </span>
      ),
    },
    {
      key: 'brand',
      header: 'BRAND',
      render: (prod) => (
        <span className="text-slate-600 font-medium">
          {prod.brand || '—'}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'PRICE',
      render: (prod) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-900">
            {formatCurrency(prod.price)}
          </span>
          {prod.oldPrice && (
            <span className="text-[10px] text-slate-400 line-through">
              {formatCurrency(prod.oldPrice)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (prod) => <StatusBadge status={prod.status || 'Active'} />,
    },
    {
      key: 'action',
      header: 'ACTION',
      align: 'right',
      width: '120px',
      render: (prod) => (
        <div className="flex items-center justify-end gap-2.5 text-slate-500">
          <button
            onClick={() => setViewingProduct(prod)}
            className="p-1 hover:text-emerald-600 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(prod)}
            className="p-1 hover:text-blue-600 transition-colors"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteClick(prod)}
            className="p-1 hover:text-rose-600 transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const categoryFilterOptions = [
    { value: 'ALL', label: 'All Categories' },
    ...categories.map((c) => ({ value: String(c.id), label: c.name })),
  ];

  const subCategoryFilterOptions = [
    { value: 'ALL', label: 'All Subcategories' },
    ...subCategories
      .filter((sc) => categoryFilter === 'ALL' || String(sc.categoryId) === String(categoryFilter))
      .map((sc) => ({ value: String(sc.id), label: sc.name })),
  ];

  if (viewingProduct) {
    return (
      <ProductDetailsView
        product={viewingProduct}
        onBack={() => setViewingProduct(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Product List
        </h1>

        <div className="flex items-center gap-3">
          {/* IMPORT CSV Button */}
          <button
            type="button"
            onClick={() => setIsCsvModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-white border border-slate-200/90 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
            title="Import Products from CSV File"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>IMPORT CSV</span>
          </button>

          <button
            onClick={handleAddNew}
            className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            ADD PRODUCT
          </button>
        </div>
      </div>

      {/* Filter Bar & DataTable */}
      <div className="space-y-0">
        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          selectFilters={[
            {
              id: 'category',
              value: categoryFilter,
              onChange: (val) => {
                setCategoryFilter(val);
                setSubCategoryFilter('ALL');
              },
              options: categoryFilterOptions,
            },
            {
              id: 'subCategory',
              value: subCategoryFilter,
              onChange: setSubCategoryFilter,
              options: subCategoryFilterOptions,
            },
            {
              id: 'status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: 'ALL', label: 'All Status' },
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'DRAFT', label: 'Draft' },
              ],
            },
          ]}
          actions={
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs cursor-pointer transition-all"
              title="Export filtered products to CSV file"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>EXPORT CSV</span>
            </button>
          }
          showReset={Boolean(searchTerm || categoryFilter !== 'ALL' || subCategoryFilter !== 'ALL' || statusFilter !== 'ALL')}
          onReset={handleResetFilters}
        />

        <DataTable
          columns={columns}
          data={filteredProducts}
          keyExtractor={(prod) => prod.id}
          emptyMessage="No products found in catalog."
        />
      </div>

      {/* View Product Details Modal */}
      <ViewProductModal
        isOpen={Boolean(viewingProduct)}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
      />

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        productToEdit={editingProduct}
      />

      {/* Bulk Import CSV Modal */}
      <ImportCsvModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        type="product"
        onImport={bulkImportProducts}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deletingProduct?.name}"?`}
      />
    </div>
  );
}
