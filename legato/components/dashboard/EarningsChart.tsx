'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface EarningsChartProps {
  detailed?: boolean;
}

export function EarningsChart({ detailed = false }: EarningsChartProps) {
  // Mock data for the chart
  const earningsData = detailed 
    ? [
        { month: 'Jan', earnings: 3200 },
        { month: 'Feb', earnings: 2800 },
        { month: 'Mar', earnings: 3450 },
        { month: 'Apr', earnings: 4100 },
        { month: 'May', earnings: 3800 },
        { month: 'Jun', earnings: 4250 },
      ]
    : [
        { month: 'Mon', earnings: 450 },
        { month: 'Tue', earnings: 620 },
        { month: 'Wed', earnings: 380 },
        { month: 'Thu', earnings: 540 },
        { month: 'Fri', earnings: 710 },
        { month: 'Sat', earnings: 320 },
        { month: 'Sun', earnings: 230 },
      ];

  const maxEarnings = Math.max(...earningsData.map(d => d.earnings));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Earnings Overview</h3>
          <p className="text-gray-600">Last {detailed ? '6 months' : '7 days'}</p>
        </div>
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="font-medium">+12.5%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        <div className="absolute inset-0 flex items-end space-x-2">
          {earningsData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-black to-gray-800 rounded-t-lg"
                style={{ height: `${(data.earnings / maxEarnings) * 80}%` }}
              />
              <div className="mt-2 text-xs text-gray-600">{data.month}</div>
              <div className="text-xs font-medium">${data.earnings}</div>
            </div>
          ))}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 border-t border-gray-200" />
        <div className="absolute inset-0 border-b border-gray-200" />
        <div className="absolute inset-0 border-t border-gray-200 mt-24" />
      </div>

      {/* Stats */}
      {detailed && (
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Average per Month</p>
            <p className="text-xl font-bold">$3,625</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Highest Month</p>
            <p className="text-xl font-bold">$4,250</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Growth Rate</p>
            <p className="text-xl font-bold text-green-600">+12.5%</p>
          </div>
        </div>
      )}
    </div>
  );
}