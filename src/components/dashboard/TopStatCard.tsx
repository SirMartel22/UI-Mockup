'use client';

import React from 'react';
import {
  TrendingUp,
  ShieldAlert,
  MessageSquare,
  FileEdit,
  Check,
  Activity,
} from 'lucide-react';
import { TopStatItem, SystemStatusData } from '../../types/dashboard';
import { Sparkline } from './Sparkline';

const iconMap = {
  trending: { Icon: TrendingUp, bg: 'bg-emerald-50', text: 'text-emerald-600' },
  escalation: { Icon: ShieldAlert, bg: 'bg-rose-50', text: 'text-rose-500' },
  unread: { Icon: MessageSquare, bg: 'bg-blue-50', text: 'text-blue-600' },
  discrepancies: { Icon: FileEdit, bg: 'bg-amber-50', text: 'text-amber-500' },
};

const sparklineDataMap: Record<string, { data: number[]; color: string }> = {
  green: {
    data: [3, 4, 4, 6, 5, 3, 4, 8, 7, 7, 9],
    color: '#22c55e',
  },
  red: {
    data: [2, 2, 4, 3, 8, 4, 3, 7, 7, 8],
    color: '#ef4444',
  },
  blue: {
    data: [3, 4, 5, 3, 4, 9, 3, 5, 5, 8],
    color: '#3b82f6',
  },
  orange: {
    data: [2, 3, 4, 3, 5, 4, 7, 5, 8, 7, 9],
    color: '#f59e0b',
  },
};

interface TopStatCardProps {
  item: TopStatItem;
}

export function TopStatCard({ item }: TopStatCardProps) {
  const config = iconMap[item.iconType];
  const IconComponent = config.Icon;
  const spark = sparklineDataMap[item.sparklineColor] || sparklineDataMap.green;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-2.5 sm:p-3 flex items-start gap-2 sm:gap-2.5 h-[108px] relative overflow-hidden transition-all hover:border-gray-300">
      {/* Icon Aligned Left */}
      <div
        className={`w-7.5 h-7.5 rounded-lg ${config.bg} ${config.text} flex items-center justify-center shrink-0 mt-0.5`}
      >
        <IconComponent className="w-4 h-4 stroke-[2.2]" />
      </div>

      {/* Main Stat Content Block Aligned Right of Icon */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div>
          <span className="text-xs font-semibold text-gray-700 block leading-tight truncate">
            {item.label}
          </span>
          <span className="text-[22px] sm:text-2xl font-bold text-gray-900 block leading-tight mt-0.5 truncate">
            {item.value}
          </span>
        </div>

        {/* Bottom Row: Caption + Justified Bottom Recharts Sparkline */}
        <div className="flex items-end justify-between gap-1">
          <span className="text-xs font-medium text-gray-400 block pb-0.5 whitespace-nowrap">
            {item.caption}
          </span>

          {/* Recharts Sparkline Component */}
          <Sparkline data={spark.data} color={spark.color} width={68} height={28} />
        </div>
      </div>
    </div>
  );
}

interface SystemStatusCardProps {
  data: SystemStatusData;
}

export function SystemStatusCard({ data }: SystemStatusCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-2.5 sm:p-3 flex items-center justify-between h-[108px] transition-all hover:border-gray-300">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Green Icon Box on Left */}
        <div className="w-7.5 h-7.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4 stroke-[2.2]" />
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold text-gray-700 block leading-tight truncate">
            System Status
          </span>
          <span className="text-base font-bold text-gray-900 block mt-0.5 leading-tight">
            {data.statusText}
          </span>
          <span className="text-[10px] font-medium text-gray-400 block mt-0.5 leading-tight">
            {data.caption}
          </span>
        </div>
      </div>

      {/* Far Right Green Checkmark Circle Badge */}
      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs ml-0.5">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
    </div>
  );
}
