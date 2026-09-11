'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { INITIAL_CATEGORIES } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export function CategoryChart() {
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const totalRevenue = INITIAL_CATEGORIES.reduce((acc, cat) => acc + cat.revenue, 0);

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900">
          Category Distribution
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Revenue share by product category
        </p>
      </div>

      {/* Donut Chart */}
      <div className="h-56 w-full relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={INITIAL_CATEGORIES}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={4}
              dataKey="revenue"
            >
              {INITIAL_CATEGORIES.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const percentage = ((data.revenue / totalRevenue) * 100).toFixed(1);
                  return (
                    <div className="bg-white border border-slate-200 text-slate-900 p-2.5 rounded-xl shadow-xl text-xs">
                      <p className="font-bold">{data.name}</p>
                      <p className="text-slate-600">
                        {formatCurrency(data.revenue)} ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center overlay label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Share</span>
          <span className="text-lg font-extrabold text-slate-900">
            100%
          </span>
        </div>
      </div>

      {/* Category Legends */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        {INITIAL_CATEGORIES.map((cat, i) => {
          const percent = ((cat.revenue / totalRevenue) * 100).toFixed(1);
          return (
            <div key={cat.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="font-medium text-slate-700 truncate">
                  {cat.name}
                </span>
              </div>
              <div className="font-semibold text-slate-900">
                {percent}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
