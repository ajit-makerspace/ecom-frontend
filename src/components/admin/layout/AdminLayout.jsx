'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import { AdminDataProvider } from '@/context/admin/AdminDataContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

export function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === '/login' || pathname === '/admin/login' || pathname.startsWith('/admin/login');
  const isUserPortal = pathname.startsWith('/user');
  const isNoAdminLayoutPage = isLoginPage || isUserPortal;

  return (
    <ThemeProvider>
      <AdminDataProvider>
        {isNoAdminLayoutPage ? (
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {children}
            <ToastContainer />
          </div>
        ) : (
          <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-200">
            {/* Dark Navy Sidebar Navigation */}
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
              onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
            />

            {/* Clean White Main Content Area */}
            <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
              }`}
            >
              {/* White Header Navbar */}
              <Header
                onOpenMobileSidebar={() => setIsMobileOpen(true)}
                onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
              />

              {/* Page Content Body */}
              <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>

            {/* Confirmation Modal for Logout */}
            <LogoutConfirmModal
              isOpen={isLogoutModalOpen}
              onClose={() => setIsLogoutModalOpen(false)}
            />

            {/* Global Toast Alerts */}
            <ToastContainer />
          </div>
        )}
      </AdminDataProvider>
    </ThemeProvider>
  );
}
