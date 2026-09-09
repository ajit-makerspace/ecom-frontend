'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import { useAdminData } from '@/context/AdminDataContext';
import { Image as ImageIcon, Plus } from 'lucide-react';

export function AddSubCategoryModal({ isOpen, onClose }) {
  const { categories, createSubCategory, addToast } = useAdminData();
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) {
      addToast('error', 'Validation Error', 'Please select a parent category and provide a sub-category name.');
      return;
    }

    const selectedCat = categories.find((c) => c.id === categoryId);

    const payload = {
      categoryId,
      categoryName: selectedCat ? selectedCat.name : 'General',
      name: name.trim(),
      image: imageUrl.trim() || '',
    };

    await createSubCategory(payload);
    setName('');
    setImageUrl('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Sub Category"
      subtitle="Link a secondary sub-category to an existing parent category."
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

        <FileUploadInput
          value={imageUrl}
          onChange={setImageUrl}
          label="Sub Category Image / File (PNG, JPG, JPEG, PDF, etc.)"
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
            <Plus className="w-4 h-4" /> Save Sub Category
          </button>
        </div>
      </form>
    </Modal>
  );
}
