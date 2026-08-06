'use client';

import React from 'react';
import {
  TrendingUp,
  Share2,
  Flame,
  Clock,
  Landmark,
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Users,
  Gauge,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Search,
  Coins,
  Lock,
  Layers,
  Shield,
} from 'lucide-react';
import { SectionCardData, SubTileMetric } from '../../types/dashboard';

const subIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trending: TrendingUp,
  paperplane: Share2,
  flame: Flame,
  clock: Clock,
  bank: Landmark,
  'down-arrow': ArrowDownCircle,
  'up-arrow': ArrowUpCircle,
  wallet: Wallet,
  'people-blue': Users,
  'people-purple': Users,
  speedometer: Gauge,
  'check-green': CheckCircle2,
  document: FileText,
  'warning-orange': AlertTriangle,
  'search-red': Search,
  bitcoin: Coins,
  'lock-red': Lock,
  'coins-purple': Layers,
  'warning-red': AlertTriangle,
  'shield-blue': Shield,
};

interface SectionCardProps {
  data: SectionCardData;
}

export default function SectionCard({ data }: SectionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between">
      {/* Outer Card Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 tracking-tight">
          {data.title}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5 leading-snug">
          {data.subtitle}
        </p>
      </div>

      {/* 2x2 Sub-tile Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {data.metrics.map((metric: SubTileMetric) => {
          const IconComponent = subIconMap[metric.iconType] || TrendingUp;

          return (
            <div
              key={metric.id}
              className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs hover:border-gray-300 transition-all flex flex-col justify-between min-h-[96px]"
            >
              {/* Top Sub-row: Icon Circle + Metric Label */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full ${metric.iconBgColor} ${metric.iconTextColor} flex items-center justify-center shrink-0`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-gray-500 line-clamp-1">
                  {metric.label}
                </span>
              </div>

              {/* Middle & Bottom: Large Bold Metric Value + Subtitle Caption */}
              <div className="mt-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900 block leading-tight tracking-tight">
                  {metric.value}
                </span>
                {metric.caption && (
                  <span className="text-[11px] font-normal text-gray-400 block mt-0.5">
                    {metric.caption}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
