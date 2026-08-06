'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ActivityItem } from '../../types/dashboard';

interface LiveActivityFeedProps {
  activities?: ActivityItem[];
}

const dotColorMap: Record<string, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-600',
  orange: 'bg-orange-500',
  purple: 'bg-purple-600',
  red: 'bg-red-500',
};

export default function LiveActivityFeed({ activities = [] }: LiveActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between h-full">
      {/* Header Area */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 tracking-tight">
          Live Activity Feed
        </h3>
        <p className="text-sm text-gray-500 mt-0.5 leading-snug">
          Real-time timeline of key activities across the workspace.
        </p>

        {/* Timeline Rows List */}
        <div className="mt-4 space-y-3.5">
          {activities.map((item) => {
            const dotClass = dotColorMap[item.actorColor] || 'bg-gray-400';

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 text-xs"
              >
                {/* Left Inline Group: Colored Dot + Actor Label + Description */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full ${dotClass} shrink-0`}
                  />
                  <span className="font-bold text-gray-900 shrink-0">
                    {item.actorType}
                  </span>
                  <span className="text-gray-500 truncate font-normal">
                    {item.message}
                  </span>
                </div>

                {/* Right-Aligned Timestamp */}
                <span className="text-gray-400 text-[11px] font-normal whitespace-nowrap shrink-0">
                  {item.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link Row */}
      <div className="pt-3 border-t border-gray-100 mt-5">
        <Link
          href="/activity"
          className="flex items-center justify-between text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors w-full group cursor-pointer"
        >
          <span>View full activity log</span>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
