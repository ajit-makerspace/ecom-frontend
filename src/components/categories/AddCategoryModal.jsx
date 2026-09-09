'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import { useAdminData } from '@/context/AdminDataContext';
import { Image as ImageIcon, Plus, Edit, Hash } from 'lucide-react';

export function AddCategoryModal({ isOpen, onClose, editCategory = null }) {
  const { createCategory, updateCategory, addToast } = useAdminData();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('Active');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || '');
      setCode(editCategory.code || '');
      setStatus(editCategory.status || 'Active');
      setImageUrl(editCategory.image || '');
    } else {
      setName('');
      setCode('');
      setStatus('Active');
      setImageUrl('');
    }
  }, [editCategory, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('error', 'Validation Error', 'Category name is required.');
      return;
    }

    // Ensure 4-digit code format
    const cleanedCode = code.replace(/\D/g, '').slice(0, 4);
    const finalCode = cleanedCode.length === 4
      ? cleanedCode
      : Math.floor(1000 + Math.random() * 9000).toString();

    const payload = {
      name: name.trim(),
      code: finalCode,
      status: status || 'Active',
      image: imageUrl.trim() || '',
    };

    if (editCategory) {
      await updateCategory(editCategory.id, payload);
    } else {
      await createCategory(payload);
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
      title={editCategory ? 'Edit Category' : 'Add New Category'}
      subtitle={editCategory ? 'Update category details and icon' : 'Create a new classification category for your catalog.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Category Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Fashion, Groceries, Footwear"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Category Code (4 Digits) *
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={4}
                placeholder="e.g. 1001"
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
          label="Category Image / File (PNG, JPG, JPEG, PDF, etc.)"
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
            {editCategory ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editCategory ? 'Update Category' : 'Save Category'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
