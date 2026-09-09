'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, FileText, X, ExternalLink } from 'lucide-react';

export function FileUploadInput({
  value = '',
  onChange,
  label = 'Category Image (PNG, JPG, JPEG, PDF, etc.)',
  accept = 'image/*,.pdf',
  placeholder = 'https://...',
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const isPdf = Boolean(
    value &&
    (value.toLowerCase().startsWith('data:application/pdf') ||
     value.toLowerCase().endsWith('.pdf'))
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result && typeof result === 'string') {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result && typeof result === 'string') {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemove = () => {
    onChange('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-slate-700">{label}</label>

        {/* Toggle between Upload and URL */}
        <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              activeTab === 'url'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            File URL
          </button>
        </div>
      </div>

      {/* Preview Box if file/URL is selected */}
      {value ? (
        <div className="relative p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {isPdf ? (
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-slate-200 p-0.5 shrink-0 flex items-center justify-center overflow-hidden border border-slate-300">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-contain rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-800 truncate text-xs">
                {fileName || (isPdf ? 'Document.pdf' : 'Image File')}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                {isPdf ? 'PDF Document' : value.startsWith('data:') ? 'Local File' : 'External URL'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {value.startsWith('http') && (
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-200/60 transition-all"
                title="Open preview in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : activeTab === 'upload' ? (
        /* Drag & Drop File Upload Area */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 bg-slate-50/50"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="p-2.5 rounded-full bg-blue-50 text-blue-600">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Click to upload or drag & drop
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              Supports PNG, JPG, JPEG, PDF, WEBP, SVG
            </p>
          </div>
        </div>
      ) : (
        /* URL Input Field */
        <div className="relative">
          <input
            type="url"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600"
          />
          <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      )}
    </div>
  );
}
