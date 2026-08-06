'use client';

import React from 'react';
import Link from 'next/link';
import {
  List,
  ShieldAlert,
  MessageSquare,
  TrendingUp,
  Landmark,
  Search,
} from 'lucide-react';

const quickToolsData = [
  {
    id: 'live-queue',
    label: 'Open Live Queue',
    href: '/live-queue',
    iconType: 'queue' as const,
    pillBg: 'bg-[#0B153A] border-transparent text-white',
    iconBg: 'bg-white/15 text-white',
  },
  {
    id: 'escalations',
    label: 'View Escalations',
    href: '/escalations',
    iconType: 'escalations' as const,
    pillBg: 'bg-[#FFF2F2] border-[#FEE2E2] text-[#DC2626]',
    iconBg: 'bg-[#FEE2E2] text-[#DC2626]',
  },
  {
    id: 'chat-inbox',
    label: 'Open Chat Inbox',
    href: '/chat-inbox',
    iconType: 'chat' as const,
    pillBg: 'bg-[#F0F5FF] border-[#DBEAFE] text-[#2563EB]',
    iconBg: 'bg-[#DBEAFE] text-[#2563EB]',
  },
  {
    id: 'push-rate',
    label: 'Push Rate',
    href: '/rates',
    iconType: 'rates' as const,
    pillBg: 'bg-[#F7F2FF] border-[#F3E8FF] text-[#9333EA]',
    iconBg: 'bg-[#F3E8FF] text-[#9333EA]',
  },
  {
    id: 'view-banks',
    label: 'View Banks',
    href: '/banks',
    iconType: 'banks' as const,
    pillBg: 'bg-[#F0F9FF] border-[#E0F2FE] text-[#0284C7]',
    iconBg: 'bg-[#E0F2FE] text-[#0284C7]',
  },
  {
    id: 'discrepancies',
    label: 'Discrepancy Center',
    href: '/discrepancies',
    iconType: 'discrepancy' as const,
    pillBg: 'bg-[#FFFBEB] border-[#FEF3C7] text-[#D97706]',
    iconBg: 'bg-[#FEF3C7] text-[#D97706]',
  },
];

const iconComponentMap = {
  queue: List,
  escalations: ShieldAlert,
  chat: MessageSquare,
  rates: TrendingUp,
  banks: Landmark,
  discrepancy: Search,
};

export default function QuickToolsBar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-3.5 space-y-2.5">
      <div>
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">
          Operations Quick Tools
        </h2>
        <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
          Jump into key actions and workflows.
        </p>
      </div>

      {/* Grid of 6 equal-width action pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {quickToolsData.map((tool) => {
          const Icon = iconComponentMap[tool.iconType];
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={`${tool.pillBg} border rounded-lg px-2 py-1.5 flex items-center justify-center gap-1.5 transition-all hover:opacity-95 active:scale-[0.98] whitespace-nowrap cursor-pointer shadow-2xs min-w-0`}
            >
              <div className={`w-5 h-5 rounded-full ${tool.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="w-3 h-3 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold tracking-tight truncate">{tool.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
