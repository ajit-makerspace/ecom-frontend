'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import { useAdminData } from '@/context/AdminDataContext';
import { INITIAL_CATEGORIES } from '@/lib/mockData';

export function AddEditProductModal({ isOpen, onClose, productToEdit }) {
  const { addProduct, updateProduct, categories: contextCategories } = useAdminData();

  const availableCategories = contextCategories.length > 0
    ? contextCategories.map((c) => c.name)
    : ['Electronics', 'Home & Office', 'Fashion', 'Beauty & Personal Care'];

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState(availableCategories[0] || 'Electronics');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setSku(productToEdit.sku || '');
      setCategory(productToEdit.category || 'Electronics');
      setPrice(productToEdit.price ? productToEdit.price.toString() : '');
      setStock(productToEdit.stock !== undefined ? productToEdit.stock.toString() : '');
      setStatus(productToEdit.status || 'Active');
      setImage(productToEdit.image || '');
      setDescription(productToEdit.description || '');
    } else {
      setName('');
      setSku('');
      setCategory('Electronics');
      setPrice('');
      setStock('');
      setStatus('Active');
      setImage('');
      setDescription('');
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    const defaultImg =
      image ||
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        name,
        sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        status,
        image: defaultImg,
        description,
      });
    } else {
      addProduct({
        name,
        sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        status,
        image: defaultImg,
        description,
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? 'Edit Product' : 'Add New Product'}
      subtitle={
        productToEdit
          ? `Update details for SKU ${productToEdit.sku}`
          : 'Fill out the product information below to list it in your store.'
      }
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Title */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Product Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Wireless Ergonomic Headphones"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Grid 2 cols: SKU & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              SKU Code
            </label>
            <input
              type="text"
              placeholder="e.g. AUDIO-ANC-01"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            >
              {availableCategories.map((catName) => (
                <option key={catName} value={catName}>
                  {catName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid 3 cols: Price, Stock, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="199.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Initial Stock *
            </label>
            <input
              type="number"
              required
              placeholder="50"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Publish Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <FileUploadInput
          value={image}
          onChange={setImage}
          label="Product Image (PNG, JPG, JPEG, PDF, etc.)"
        />

        {/* Description */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Write a brief overview of features..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Form Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/20"
          >
            {productToEdit ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
