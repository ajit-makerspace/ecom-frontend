'use client';

import React from 'react';
import { MetricCard } from '@/components/admin/dashboard/MetricCard';
import { RevenueChart } from '@/components/admin/dashboard/RevenueChart';
import { CategoryChart } from '@/components/admin/dashboard/CategoryChart';
import { RecentOrdersTable } from '@/components/admin/dashboard/RecentOrdersTable';
import { LowStockAlert } from '@/components/admin/dashboard/LowStockAlert';
import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const { products, orders, customers, analytics } = useAdminData();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalRevenue = analytics?.stats?.totalRevenue ?? orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const totalOrdersCount = analytics?.stats?.totalOrders ?? orders.length;
  const totalCustomersCount = analytics?.stats?.totalCustomers ?? customers.length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner - Clean Light White Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 text-slate-900 shadow-sm relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-48 h-48 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 inline-block mb-2">
            Store Performance Overview
          </span>
          <h1
            suppressHydrationWarning
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            Welcome Back, Super Admin 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl" suppressHydrationWarning>
            Here is what's happening with your store today. You have{' '}
            <span className="font-bold text-indigo-600 underline">
              {mounted ? orders.filter((o) => o.status === 'Pending').length : 0} pending orders
            </span>{' '}
            and {mounted ? products.filter((p) => p.stock <= 5).length : 0} low stock alerts requiring attention.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center">
            <span className="text-[10px] font-bold uppercase text-indigo-600 block">
              Total Revenue
            </span>
            <span className="text-lg font-bold text-indigo-950">
              {formatCurrency(totalRevenue)}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={analytics?.stats?.revenueGrowth || "+14.2%"}
          isPositive={true}
          timeframe="all time"
          icon={DollarSign}
          iconBgColor="bg-indigo-500/10 text-indigo-600"
        />
        <MetricCard
          title="Total Orders"
          value={`${totalOrdersCount}`}
          change={analytics?.stats?.ordersGrowth || "+8.5%"}
          isPositive={true}
          timeframe="all time"
          icon={ShoppingBag}
          iconBgColor="bg-emerald-500/10 text-emerald-600"
        />
        <MetricCard
          title="Active Customers"
          value={`${totalCustomersCount}`}
          change={analytics?.stats?.customersGrowth || "+22.1%"}
          isPositive={true}
          timeframe="registered users"
          icon={Users}
          iconBgColor="bg-sky-500/10 text-sky-600"
        />
        <MetricCard
          title="Total Products"
          value={`${products.length}`}
          change={analytics?.stats?.productsGrowth || "+4.1%"}
          isPositive={true}
          timeframe="in store"
          icon={Activity}
          iconBgColor="bg-amber-500/10 text-amber-600"
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart />
        </div>
      </div>

      {/* Recent Orders & Stock Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>
        <div className="lg:col-span-1">
          <LowStockAlert />
        </div>
      </div>
    </div>
  );
}
