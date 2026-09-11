'use client';

import React, { useState, useEffect } from 'react';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { Modal } from '@/components/ui/Modal';
import { FileUploadInput } from '@/components/ui/FileUploadInput';

export function AddModuleModal({ isOpen, onClose, editModule = null }) {
  const { createModule, updateModule, addToast } = useAdminData();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (editModule) {
      setName(editModule.name || '');
      setCode(editModule.code || '');
      setDescription(editModule.description || '');
      setImage(editModule.image || '');
      setStatus(editModule.status || 'Active');
    } else {
      setName('');
      setCode('');
      setDescription('');
      setImage('');
      setStatus('Active');
    }
  }, [editModule, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('error', 'Validation Error', 'Module Name is required.');
      return;
    }

    const payload = {
      name: name.trim(),
      code: code.trim(),
      description: description.trim(),
      image: image.trim(),
      status,
    };

    if (editModule) {
      updateModule(editModule.id, payload);
    } else {
      createModule(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editModule ? 'Edit Module' : 'Add New Module'}
      subtitle={editModule ? `Update details for "${editModule.name}"` : 'Create a top-level module to organize categories.'}
      size="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Module Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. E-Commerce, Electronics, Fashion"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Module Code (4 digits)
            </label>
            <input
              type="text"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 1000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none font-mono"
            />
          </div>

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
        </div>

        <FileUploadInput
          value={image}
          onChange={setImage}
          label="Module Image / Banner"
        />

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of module scope..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
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
            {editModule ? 'Save Changes' : 'Create Module'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
