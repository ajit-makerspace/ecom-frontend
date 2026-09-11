import './globals.css';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';

export const metadata = {
  title: 'MakerShop - E-Commerce Admin Dashboard',
  description: 'Next.js modern e-commerce management dashboard frontend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-slate-50 overscroll-none" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 font-sans text-slate-900 overscroll-none">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
