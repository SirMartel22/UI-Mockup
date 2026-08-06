'use client';

import React from 'react';
import Link from 'next/link';
import {
  List,
  ShieldAlert,
  MessageSquare,
  ArrowUpRight,
  Landmark,
  Search,
} from 'lucide-react';
import { QuickToolItem } from '../../types/dashboard';

const quickToolsData: QuickToolItem[] = [
  {
    id: 'live-queue',
    label: 'Open Live Queue',
    href: '/live-queue',
    iconType: 'queue',
    bgColor: 'bg-navy-900',
    textColor: 'text-white',
    isPrimary: true,
  },
  {
    id: 'escalations',
    label: 'View Escalations',
    href: '/escalations',
    iconType: 'escalations',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
  },
  {
    id: 'chat-inbox',
    label: 'Open Chat Inbox',
    href: '/chat-inbox',
    iconType: 'chat',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'push-rate',
    label: 'Push Rate',
    href: '/rates',
    iconType: 'rates',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: 'view-banks',
    label: 'View Banks',
    href: '/banks',
    iconType: 'banks',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'discrepancies',
    label: 'Discrepancy Center',
    href: '/discrepancies',
    iconType: 'discrepancy',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
];

const iconComponentMap = {
  queue: List,
  escalations: ShieldAlert,
  chat: MessageSquare,
  rates: ArrowUpRight,
  banks: Landmark,
  discrepancy: Search,
};

export default function QuickToolsBar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Operations Quick Tools
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Jump into key actions and workflows.
        </p>
      </div>

      {/* Grid of 6 equal-width action pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-1">
        {quickToolsData.map((tool) => {
          const Icon = iconComponentMap[tool.iconType];
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={`${tool.bgColor} ${tool.textColor} rounded-xl px-3.5 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.98] whitespace-nowrap shadow-2xs cursor-pointer border border-transparent`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tool.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
