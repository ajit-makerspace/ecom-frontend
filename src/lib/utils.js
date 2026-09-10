import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = 'INR') {
  const numericAmount = parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value || 0);
}

export function getStatusBadgeStyle(status) {
  switch ((status || '').toLowerCase()) {
    case 'active':
    case 'paid':
    case 'delivered':
    case 'completed':
    case 'vip':
      return {
        bg: 'bg-emerald-50 border border-emerald-200/60',
        text: 'text-emerald-700',
        dot: 'bg-emerald-500',
      };
    case 'processing':
    case 'shipped':
    case 'pending':
      return {
        bg: 'bg-amber-50 border border-amber-200/60',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
      };
    case 'draft':
    case 'inactive':
      return {
        bg: 'bg-slate-100 border border-slate-200',
        text: 'text-slate-700',
        dot: 'bg-slate-500',
      };
    case 'out of stock':
    case 'cancelled':
    case 'failed':
    case 'refunded':
      return {
        bg: 'bg-rose-50 border border-rose-200/60',
        text: 'text-rose-700',
        dot: 'bg-rose-500',
      };
    default:
      return {
        bg: 'bg-slate-50 border border-slate-200',
        text: 'text-slate-700',
        dot: 'bg-slate-500',
      };
  }
}

/**
 * Reusable SKU Generator Function
 * Format: categorycode-subcategorycode-productname
 * Example: 1001-2001-WIRELESS-HEADPHONES
 */
export function generateSku(categoryCode, subCategoryCode, productName) {
  const catCode = String(categoryCode || '1000').trim().toUpperCase().replace(/[^\w]/g, '');
  const subCode = String(subCategoryCode || '0000').trim().toUpperCase().replace(/[^\w]/g, '');
  const nameClean = String(productName || '')
    .trim()
    .toUpperCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${catCode}-${subCode}-${nameClean}`;
}
