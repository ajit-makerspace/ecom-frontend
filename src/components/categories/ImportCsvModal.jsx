'use client';

import React, { useState, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { UploadCloud, Download, CheckCircle2, AlertTriangle, FileSpreadsheet, X, Loader2 } from 'lucide-react';

export function ImportCsvModal({
  isOpen,
  onClose,
  type = 'category', // 'category' | 'sub-category'
  onImport,
}) {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const isSubCategory = type === 'sub-category';
  const title = isSubCategory ? 'Bulk Import Sub-Categories' : 'Bulk Import Categories';
  const subtitle = isSubCategory
    ? 'Upload a CSV file to import multiple sub-categories into your catalog at once.'
    : 'Upload a CSV file to bulk import main categories with codes, status, and images.';

  // Sample CSV Template Generator & Downloader
  const handleDownloadSample = () => {
    let csvContent = '';
    let filename = '';

    if (isSubCategory) {
      csvContent = `Sub Category Name,Parent Category,Code,Status,Image URL\n` +
        `Men's Wear,Fashion,2001,Active,https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300\n` +
        `Laptops,Electronics,2002,Active,https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300\n` +
        `Footwear,Fashion,2003,Active,\n`;
      filename = 'sub_categories_import_sample.csv';
    } else {
      csvContent = `Category Name,Code,Status,Image URL\n` +
        `Fashion,1001,Active,https://images.unsplash.com/photo-1445205170230-053b83016050?w=300\n` +
        `Electronics,1002,Active,https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=300\n` +
        `Home & Living,1003,Inactive,\n`;
      filename = 'categories_import_sample.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Parser Logic (Robust against quotes and whitespace)
  const parseCSV = (text) => {
    const lines = text.split(/\r\n|\n/).filter((line) => line.trim());
    if (lines.length <= 1) {
      throw new Error('CSV file is empty or missing data rows.');
    }

    // Function to parse a single CSV row handling quotes
    const parseRow = (rowText) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < rowText.length; i++) {
        const char = rowText[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const headers = parseRow(lines[0]).map((h) => h.toLowerCase());

    const nameIdx = headers.findIndex((h) => h.includes('sub') || h.includes('name') || h.includes('category'));
    const parentIdx = headers.findIndex((h) => h.includes('parent') || h.includes('main'));
    const codeIdx = headers.findIndex((h) => h.includes('code'));
    const statusIdx = headers.findIndex((h) => h.includes('status'));
    const imageIdx = headers.findIndex((h) => h.includes('image') || h.includes('url') || h.includes('file'));

    const items = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseRow(lines[i]);
      const nameVal = nameIdx !== -1 ? cols[nameIdx] : cols[0];
      if (!nameVal) continue;

      const codeVal = codeIdx !== -1 && cols[codeIdx] ? cols[codeIdx].replace(/\D/g, '') : '';
      const statusVal = statusIdx !== -1 && cols[statusIdx] ? cols[statusIdx] : 'Active';
      const imageVal = imageIdx !== -1 && cols[imageIdx] ? cols[imageIdx] : '';

      if (isSubCategory) {
        const parentVal = parentIdx !== -1 && cols[parentIdx] ? cols[parentIdx] : 'General';
        items.push({
          name: nameVal,
          categoryName: parentVal,
          code: codeVal,
          status: statusVal,
          image: imageVal,
        });
      } else {
        items.push({
          name: nameVal,
          code: codeVal,
          status: statusVal,
          image: imageVal,
        });
      }
    }

    if (items.length === 0) {
      throw new Error('No valid rows found in CSV file.');
    }

    return items;
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setErrorMsg('');
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') return;
        const parsed = parseCSV(text);
        setParsedData(parsed);
      } catch (err) {
        setErrorMsg(err.message || 'Failed to parse CSV file.');
        setParsedData([]);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      handleFileSelect(droppedFile);
    } else {
      setErrorMsg('Please upload a valid .csv file.');
    }
  };

  const handleConfirmImport = async () => {
    if (parsedData.length === 0) return;
    setIsImporting(true);
    try {
      await onImport(parsedData);
      handleReset();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Bulk import failed.');
    } finally {
      setIsImporting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setParsedData([]);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} subtitle={subtitle}>
      <div className="space-y-4 text-xs">
        {/* Sample Download Toolbar */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-blue-950">
            <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <p className="font-semibold">Need a CSV template?</p>
              <p className="text-[11px] text-blue-700">
                Download a formatted sample file with standard column headers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadSample}
            className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 font-bold text-[11px] flex items-center gap-1.5 shadow-2xs transition-all shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Sample CSV</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-medium text-xs">{errorMsg}</span>
          </div>
        )}

        {/* Upload Dropzone if no file loaded */}
        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 bg-slate-50/50"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
              className="hidden"
            />
            <div className="p-3 rounded-full bg-blue-100/80 text-blue-600">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Click to browse or drag & drop CSV file
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Supports standard comma-separated (.csv) files up to 10MB
              </p>
            </div>
          </div>
        ) : (
          /* File Preview & Records Data Table */
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate text-xs">{file.name}</p>
                  <p className="text-[10px] text-slate-500">
                    Ready to import <span className="font-bold text-blue-600">{parsedData.length}</span> records
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                title="Change File"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Grid */}
            <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold sticky top-0">
                  <tr>
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">NAME</th>
                    {isSubCategory && <th className="py-2 px-3">PARENT</th>}
                    <th className="py-2 px-3">CODE</th>
                    <th className="py-2 px-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parsedData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">{row.name}</td>
                      {isSubCategory && <td className="py-2 px-3 text-slate-600">{row.categoryName}</td>}
                      <td className="py-2 px-3 font-mono font-bold text-slate-700">
                        {row.code || <span className="text-slate-400 italic">Auto</span>}
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {row.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isImporting}
            className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmImport}
            disabled={parsedData.length === 0 || isImporting}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-sm flex items-center gap-1.5 transition-all"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Import {parsedData.length > 0 ? `${parsedData.length} Records` : 'CSV'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
