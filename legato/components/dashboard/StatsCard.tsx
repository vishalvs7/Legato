import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
}: StatsCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 p-6",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl md:text-3xl font-bold">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span className="font-medium">
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-gray-500">from last month</span>
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}