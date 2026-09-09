'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function AnalyticsPage() {
  const topProducts = [...INITIAL_PRODUCTS]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const trafficData = [
    { name: 'Organic Search', value: 45, color: '#6366f1' },
    { name: 'Direct Traffic', value: 25, color: '#10b981' },
    { name: 'Social Media', value: 15, color: '#f59e0b' },
    { name: 'Paid Ads', value: 10, color: '#ec4899' },
    { name: 'Email Campaign', value: 5, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-indigo-600" />
            Analytics & Business Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Deep dive into sales trends, product velocity, and marketing channels.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Net Profit Margin
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {formatCurrency(34800)}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
              +18.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">40.2% profit margin rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Avg. Order Value (AOV)
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900">
              $154.20
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
              +$12.30
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">vs. $141.90 last month</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Acquisition Cost (CAC)
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900">
              $28.50
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
              -8.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Lower acquisition cost</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Return & Refund Rate
          </span>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900">
              1.24%
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
              Optimal
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Below target threshold 2.0%</p>
        </div>
      </div>

      {/* Main Revenue Area Chart */}
      <RevenueChart />

      {/* Row 2: Top Selling Products Bar Chart & Acquisition Channels Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Top Performing Products by Sales Units
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Best selling store items over the last 30 days
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={130}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-slate-200 text-slate-900 p-2.5 rounded-xl shadow-xl text-xs">
                          <p className="font-bold">{data.name}</p>
                          <p className="text-indigo-600 font-semibold">{data.sales} units sold</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Channels */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Customer Acquisition Channels
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              Where your store traffic and sales originate
            </p>
          </div>

          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {trafficData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-slate-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
