'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { REVENUE_MONTHLY_DATA } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export function RevenueChart() {
  const [range, setRange] = useState('12m');

  const filteredData =
    range === '7d'
      ? REVENUE_MONTHLY_DATA.slice(-3)
      : range === '30d'
      ? REVENUE_MONTHLY_DATA.slice(-6)
      : REVENUE_MONTHLY_DATA;

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Revenue Analytics
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Gross sales income vs net profit metrics over time
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 self-start sm:self-auto">
          {['7d', '30d', '12m'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                range === r
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '12 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-[11px] font-medium fill-slate-400"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-[11px] font-medium fill-slate-400"
              tickFormatter={(v) => `₹${v / 1000}k`}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-slate-200 text-slate-900 p-3 rounded-xl shadow-xl text-xs space-y-1">
                      <p className="font-semibold text-slate-600">{label}</p>
                      <p className="text-indigo-600 font-bold">
                        Revenue: {formatCurrency(Number(payload[0].value))}
                      </p>
                      {payload[1] && (
                        <p className="text-emerald-600 font-bold">
                          Profit: {formatCurrency(Number(payload[1].value))}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-xs font-semibold">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
          <span>Total Revenue</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span>Net Profit</span>
        </div>
      </div>
    </div>
  );
}
