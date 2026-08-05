'use client';

import React, { useState } from 'react';
import { BankSummary } from '../../types/bank';

interface BankOverviewDonutProps {
  summary?: BankSummary;
  onSelectStatusFilter?: (status: 'ALL' | 'In Use' | 'Pending' | 'Mismatch') => void;
}

export default function BankOverviewDonut({
  summary = {
    totalBanks: 24,
    inUseCount: 18,
    inUsePercentage: 75.0,
    pendingCount: 3,
    pendingPercentage: 12.5,
    mismatchCount: 2,
    mismatchPercentage: 8.3,
    totalSystemBalance: 82340000,
    totalInflow: 56780000,
    totalOutflow: 25560000,
    netFlow: 31220000,
  },
  onSelectStatusFilter,
}: BankOverviewDonutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const {
    totalBanks,
    inUseCount,
    inUsePercentage,
    pendingCount,
    pendingPercentage,
    mismatchCount,
    mismatchPercentage,
  } = summary;

  // SVG Ring Chart calculations
  const size = 160;
  const strokeWidth = 20;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const items = [
    {
      label: 'In Use',
      count: inUseCount,
      percentage: inUsePercentage,
      color: '#059669', // Emerald/Green
      statusKey: 'In Use' as const,
    },
    {
      label: 'Pending',
      count: pendingCount,
      percentage: pendingPercentage,
      color: '#D97706', // Amber/Orange
      statusKey: 'Pending' as const,
    },
    {
      label: 'Mismatch',
      count: mismatchCount,
      percentage: mismatchPercentage,
      color: '#DC2626', // Red
      statusKey: 'Mismatch' as const,
    },
  ];

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs w-full">
      {/* Title */}
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4">
        Bank Overview
      </h3>

      {/* SVG Donut Chart */}
      <div className="relative flex items-center justify-center my-2">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {items.map((item, idx) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += item.percentage;

            const isHovered = hoveredIndex === idx;

            return (
              <circle
                key={item.label}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectStatusFilter && onSelectStatusFilter(item.statusKey)}
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900 leading-none">
            {hoveredIndex !== null ? items[hoveredIndex].count : totalBanks}
          </span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
            {hoveredIndex !== null ? items[hoveredIndex].label : 'Total Banks'}
          </span>
        </div>
      </div>

      {/* Legend below */}
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        {items.map((item, idx) => (
          <div
            key={item.label}
            onClick={() => onSelectStatusFilter && onSelectStatusFilter(item.statusKey)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`flex items-center justify-between text-xs py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              hoveredIndex === idx ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-700 font-medium">{item.label}</span>
            </div>
            <span className="text-slate-900 font-bold font-mono">
              {item.count} <span className="text-slate-500 font-normal">({item.percentage.toFixed(1)}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
