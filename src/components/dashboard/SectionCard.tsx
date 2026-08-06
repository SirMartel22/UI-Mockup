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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3.5 flex flex-col justify-between">
      {/* Outer Card Header */}
      <div className="mb-3">
        <h3 className="text-sm font-bold text-gray-900 tracking-tight">
          {data.title}
        </h3>
        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
          {data.subtitle}
        </p>
      </div>

      {/* 2x2 Sub-tile Grid */}
      <div className="grid grid-cols-2 gap-2">
        {data.metrics.map((metric: SubTileMetric) => {
          const IconComponent = subIconMap[metric.iconType] || TrendingUp;

          return (
            <div
              key={metric.id}
              className="bg-gray-50/80 rounded-lg border border-gray-100 p-2 hover:border-gray-200 transition-all flex items-start gap-2 min-h-[76px]"
            >
              {/* Icon aligned left */}
              <div
                className={`w-6 h-6 rounded-full ${metric.iconBgColor} ${metric.iconTextColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <IconComponent className="w-3 h-3" />
              </div>

              {/* Other content (label, value, caption) aligned right of the icon */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-[10px] font-semibold text-gray-600 block leading-tight truncate">
                  {metric.label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight tracking-tight mt-0.5 truncate">
                  {metric.value}
                </span>
                {metric.caption && (
                  <span className="text-[9px] font-normal text-gray-400 block mt-0.5 truncate">
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
