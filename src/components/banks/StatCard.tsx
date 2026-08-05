'use client';

import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  count: number;
  percentage?: number;
  caption: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function StatCard({
  label,
  count,
  percentage,
  caption,
  icon: Icon,
  iconBgColor,
  iconColor,
  badgeBgColor = 'bg-slate-100',
  badgeTextColor = 'text-slate-700',
  isActive = false,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl border p-4 shadow-2xs transition-all duration-150 cursor-pointer group flex flex-col justify-between hover:shadow-xs ${
        isActive
          ? 'border-[var(--brand-navy)] ring-1 ring-[var(--brand-navy)]'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top right drill-down affordance */}
      <div className="absolute top-3 right-3 text-slate-300 group-hover:text-slate-500 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </div>

      <div className="flex items-center gap-3">
        {/* Soft-tinted Icon Circle */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>

        {/* Label & Number + Percentage Pill */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            {label}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 leading-none">
              {count}
            </span>
            {percentage !== undefined && (
              <span
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${badgeBgColor} ${badgeTextColor}`}
              >
                {percentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Caption below */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">
          {caption}
        </span>
      </div>
    </div>
  );
}
