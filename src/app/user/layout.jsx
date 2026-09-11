'use client';

import React from 'react';
import { UserPortalProvider } from '@/context/user/UserPortalContext';
import { UserHeader } from '@/components/user/layout/UserHeader';
import { UserNavbar } from '@/components/user/layout/UserNavbar';
import { UserFooter } from '@/components/user/layout/UserFooter';
import { CartDrawer } from '@/components/user/cart/CartDrawer';
import { ProductQuickViewModal } from '@/components/user/products/ProductQuickViewModal';

export default function UserPortalAppLayout({ children }) {
  return (
    <UserPortalProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
        <UserHeader />
        <UserNavbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
          {children}
        </main>
        <CartDrawer />
        <ProductQuickViewModal />
        <UserFooter />
      </div>
    </UserPortalProvider>
  );
}
