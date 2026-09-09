'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import { useAdminData } from '@/context/AdminDataContext';
import { Plus, Edit, Hash } from 'lucide-react';

export function AddSubCategoryModal({ isOpen, onClose, editSubCategory = null }) {
  const { categories, createSubCategory, updateSubCategory, addToast } = useAdminData();
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('Active');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editSubCategory) {
      setName(editSubCategory.name || '');
      setCategoryId(editSubCategory.categoryId || (categories[0]?.id || ''));
      setCode(editSubCategory.code || '');
      setStatus(editSubCategory.status || 'Active');
      setImageUrl(editSubCategory.image || '');
    } else {
      setName('');
      if (categories.length > 0 && !categoryId) {
        setCategoryId(categories[0].id);
      }
      setCode('');
      setStatus('Active');
      setImageUrl('');
    }
  }, [editSubCategory, isOpen, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) {
      addToast('error', 'Validation Error', 'Please select a parent category and provide a sub-category name.');
      return;
    }

    const selectedCat = categories.find((c) => String(c.id) === String(categoryId));

    const cleanedCode = code.replace(/\D/g, '').slice(0, 4);
    const finalCode = cleanedCode.length === 4
      ? cleanedCode
      : Math.floor(2000 + Math.random() * 8000).toString();

    const payload = {
      categoryId,
      categoryName: selectedCat ? selectedCat.name : 'General',
      name: name.trim(),
      code: finalCode,
      status: status || 'Active',
      image: imageUrl.trim() || '',
    };

    if (editSubCategory) {
      await updateSubCategory(editSubCategory.id, payload);
    } else {
      await createSubCategory(payload);
    }

    setName('');
    setCode('');
    setStatus('Active');
    setImageUrl('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editSubCategory ? 'Edit Sub Category' : 'Add New Sub Category'}
      subtitle={editSubCategory ? 'Update sub-category details and parent association.' : 'Link a secondary sub-category to an existing parent category.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Parent Category *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Sub Category Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Men's Wear, Sneakers, Handbags"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Sub Category Code (4 Digits) *
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={4}
                placeholder="e.g. 2001"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 font-mono font-bold tracking-wider"
              />
              <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Leave blank to auto-generate.</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 font-semibold"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <FileUploadInput
          value={imageUrl}
          onChange={setImageUrl}
          label="Sub Category Image (PNG, JPG, JPEG, PDF, etc.)"
        />

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold shadow-sm shadow-blue-600/20 flex items-center gap-1.5"
          >
            {editSubCategory ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editSubCategory ? 'Update Sub Category' : 'Save Sub Category'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
