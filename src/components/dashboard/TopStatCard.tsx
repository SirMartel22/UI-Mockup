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

const iconMap = {
  trending: { Icon: TrendingUp, bg: 'bg-green-50', text: 'text-green-600' },
  escalation: { Icon: ShieldAlert, bg: 'bg-red-50', text: 'text-red-500' },
  unread: { Icon: MessageSquare, bg: 'bg-blue-50', text: 'text-blue-600' },
  discrepancies: { Icon: FileEdit, bg: 'bg-orange-50', text: 'text-orange-500' },
};

const sparklineStrokeMap = {
  green: '#16A34A',
  red: '#EF4444',
  blue: '#2563EB',
  orange: '#F59E0B',
};

interface TopStatCardProps {
  item: TopStatItem;
}

export function TopStatCard({ item }: TopStatCardProps) {
  const config = iconMap[item.iconType];
  const IconComponent = config.Icon;
  const strokeColor = sparklineStrokeMap[item.sparklineColor];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between h-[116px] relative overflow-hidden transition-all hover:border-gray-300">
      {/* Top Row: Icon circle */}
      <div>
        <div
          className={`w-9 h-9 rounded-full ${config.bg} ${config.text} flex items-center justify-center shrink-0`}
        >
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      {/* Main Stat Area */}
      <div>
        <span className="text-xs font-semibold text-gray-600 block leading-tight">
          {item.label}
        </span>
        <span className="text-2xl font-bold text-gray-900 block leading-tight mt-0.5">
          {item.value}
        </span>
        {/* Bottom Row: Caption + Sparkline */}
        <div className="flex items-end justify-between mt-1">
          <span className="text-[11px] font-medium text-gray-400 block pb-0.5">
            {item.caption}
          </span>

          {/* Tiny Sparkline SVG at bottom-right */}
          <div className="w-16 h-6 shrink-0">
            <svg
              viewBox="0 0 70 30"
              className="w-full h-full overflow-visible"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={
                  item.sparklineColor === 'green'
                    ? 'M 5 20 Q 20 22 35 15 T 65 18'
                    : item.sparklineColor === 'red'
                    ? 'M 5 15 Q 20 25 35 12 T 65 22'
                    : item.sparklineColor === 'blue'
                    ? 'M 5 22 Q 20 12 35 20 T 65 10'
                    : 'M 5 18 Q 20 10 35 22 T 65 16'
                }
              />
            </svg>
          </div>
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center justify-between h-[116px] transition-all hover:border-gray-300">
      <div className="flex items-center gap-3">
        {/* Teal/Blue pin icon circle */}
        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4" />
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-600 block leading-tight">
            System Status
          </span>
          <span className="text-xl font-bold text-gray-900 block mt-0.5 leading-tight">
            {data.statusText}
          </span>
          <span className="text-[11px] font-medium text-gray-400 block mt-0.5">
            {data.caption}
          </span>
        </div>
      </div>

      {/* Far Right Green Checkmark Circle Badge */}
      <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </div>
  );
}
