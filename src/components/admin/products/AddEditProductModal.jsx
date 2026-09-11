'use client';

import React, { useState, useEffect } from 'react';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { Modal } from '@/components/ui/Modal';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import { generateSku } from '@/lib/utils';

export function AddEditProductModal({ isOpen, onClose, productToEdit = null }) {
  const { categories, subCategories, addProduct, updateProduct, addToast } = useAdminData();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [hasVariants, setHasVariants] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState('0');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setCategoryId(productToEdit.categoryId ? String(productToEdit.categoryId) : '');
      setSubCategoryId(productToEdit.subCategoryId ? String(productToEdit.subCategoryId) : '');
      setSku(productToEdit.sku || '');
      setBrand(productToEdit.brand || '');
      setPrice(productToEdit.price !== undefined ? String(productToEdit.price) : '');
      setOldPrice(productToEdit.oldPrice !== undefined && productToEdit.oldPrice !== null ? String(productToEdit.oldPrice) : '');
      setWeight(productToEdit.weight !== undefined && productToEdit.weight !== null ? String(productToEdit.weight) : '');
      setDescription(productToEdit.description || '');
      setHasVariants(Boolean(productToEdit.hasVariants));
      setIsFeatured(Boolean(productToEdit.isFeatured));
      setSortOrder(productToEdit.sortOrder !== undefined ? String(productToEdit.sortOrder) : '0');
      setMetaTitle(productToEdit.metaTitle || '');
      setMetaDescription(productToEdit.metaDescription || '');
      setImage(productToEdit.image || '');
      setStatus(productToEdit.status || 'Active');
    } else {
      setName('');
      setCategoryId('');
      setSubCategoryId('');
      setSku('');
      setBrand('');
      setPrice('');
      setOldPrice('');
      setWeight('');
      setDescription('');
      setHasVariants(false);
      setIsFeatured(false);
      setSortOrder('0');
      setMetaTitle('');
      setMetaDescription('');
      setImage('');
      setStatus('Active');
    }
  }, [productToEdit, isOpen]);

  // Filter subcategories by selected category
  const filteredSubCategories = subCategories.filter(
    (sc) => !categoryId || String(sc.categoryId) === String(categoryId)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('error', 'Validation Error', 'Product Name is required.');
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      addToast('error', 'Validation Error', 'Please enter a valid price.');
      return;
    }

    if (!categoryId) {
      addToast('error', 'Validation Error', 'Please select a Category.');
      return;
    }

    // Auto-generate SKU if omitted
    let finalSku = sku.trim();
    if (!finalSku) {
      const selectedCat = categories.find((c) => String(c.id) === String(categoryId));
      const selectedSubCat = subCategories.find((sc) => String(sc.id) === String(subCategoryId));
      const catCode = selectedCat?.code || (categoryId ? String(1000 + parseInt(categoryId, 10)) : '1000');
      const subCatCode = selectedSubCat?.code || (subCategoryId ? String(2000 + parseInt(subCategoryId, 10)) : '0000');
      finalSku = generateSku(catCode, subCatCode, name);
    }

    const payload = {
      name: name.trim(),
      categoryId: parseInt(categoryId, 10),
      subCategoryId: subCategoryId ? parseInt(subCategoryId, 10) : null,
      sku: finalSku,
      brand: brand.trim(),
      price: parseFloat(price),
      oldPrice: oldPrice ? parseFloat(oldPrice) : null,
      weight: weight ? parseFloat(weight) : null,
      description: description.trim(),
      hasVariants,
      isFeatured,
      sortOrder: parseInt(sortOrder || '0', 10),
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      image: image.trim(),
      status,
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? 'Edit Product' : 'Add New Product'}
      subtitle={productToEdit ? `Update details for ${productToEdit.name}` : 'Fill in the form to create a new product.'}
      size="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Product Name */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wireless Ergonomic Headphones"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Category & Sub Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Category *
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setSubCategoryId('');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Sub Category
            </label>
            <select
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">None / General</option>
              {filteredSubCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SKU & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">
                SKU Code
              </label>
              <button
                type="button"
                onClick={() => {
                  const selectedCat = categories.find((c) => String(c.id) === String(categoryId));
                  const selectedSubCat = subCategories.find((sc) => String(sc.id) === String(subCategoryId));
                  const catCode = selectedCat?.code || (categoryId ? String(1000 + parseInt(categoryId, 10)) : '1000');
                  const subCatCode = selectedSubCat?.code || (subCategoryId ? String(2000 + parseInt(subCategoryId, 10)) : '0000');
                  setSku(generateSku(catCode, subCatCode, name));
                }}
                className="text-[10px] text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Auto Generate
              </button>
            </div>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Price, Old Price, Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Old Price
            </label>
            <input
              type="number"
              step="0.01"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.001"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Status & Sort Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none font-semibold"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="flex items-center gap-6 pt-1">
          {/* Has Variants - Commented Out
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
            <input
              type="checkbox"
              checked={hasVariants}
              onChange={(e) => setHasVariants(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Has Variants</span>
          </label>
          */}

          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Is Featured</span>
          </label>
        </div>

        {/* Image Input */}
        <FileUploadInput
          value={image}
          onChange={setImage}
          label="Product Image"
        />

        {/* SEO Meta Title & Meta Description - Commented Out
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              SEO Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              SEO Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
        */}

        {/* Product Description */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Product Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none text-xs"
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
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
          >
            {productToEdit ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
