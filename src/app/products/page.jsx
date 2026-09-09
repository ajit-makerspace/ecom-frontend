'use client';

import React, { useState } from 'react';
import { useAdminData } from '@/context/AdminDataContext';
import { formatCurrency, getStatusBadgeStyle } from '@/lib/utils';
import { AddEditProductModal } from '@/components/products/AddEditProductModal';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  Star,
  FileText,
} from 'lucide-react';

export default function ProductsPage() {
  const { products, deleteProduct, globalSearch } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const activeSearch = searchQuery || globalSearch;

  const categories = ['All', 'Electronics', 'Home & Office', 'Fashion', 'Beauty & Personal Care'];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      prod.sku.toLowerCase().includes(activeSearch.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || prod.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || prod.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddEditModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsAddEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-indigo-600" />
            Products Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage product listings, pricing, stock levels, and store availability.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Stock</th>
                <th className="py-3 px-3">Sales</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No products found matching your search filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const badge = getStatusBadgeStyle(product.status);

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Title & Image */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          {product.image &&
                          (product.image.toLowerCase().startsWith('data:application/pdf') ||
                           product.image.toLowerCase().endsWith('.pdf')) ? (
                            <a
                              href={product.image}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs hover:bg-rose-100 transition-colors"
                              title="View PDF Document"
                            >
                              <FileText className="w-5 h-5" />
                            </a>
                          ) : product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
                              —
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-slate-900 truncate max-w-xs">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{' '}
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-3 text-slate-500 font-mono">
                        {product.sku}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 text-slate-700">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3 font-extrabold text-slate-900">
                        {formatCurrency(product.price)}
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`font-bold ${
                            product.stock <= 5
                              ? 'text-rose-600'
                              : 'text-slate-700'
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>

                      {/* Sales */}
                      <td className="py-3.5 px-3 text-slate-600">
                        {product.sales} sold
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {product.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
}
