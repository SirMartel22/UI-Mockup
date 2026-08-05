'use client';

import React from 'react';
import {
  LayoutDashboard,
  Radio,
  MessageSquare,
  Percent,
  Landmark,
  Users,
  Coins,
  ShieldCheck,
  History,
  FileText,
  User,
  Headphones,
  MoreHorizontal,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isOpenMobile = false, onCloseMobile }: SidebarProps) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '#', active: false },
    { label: 'Live Queue', icon: Radio, href: '#', badge: 8, active: false },
    { label: 'Chat Inbox', icon: MessageSquare, href: '#', badge: 12, active: false },
    { label: 'Rates', icon: Percent, href: '#', active: false },
    { label: 'Banks', icon: Landmark, href: '#', active: true },
    { label: 'Team', icon: Users, href: '#', active: false },
    { label: 'Coin Hub', icon: Coins, href: '#', active: false },
    { label: 'Financial Controls', icon: ShieldCheck, href: '#', active: false },
    { label: 'Trade History', icon: History, href: '#', active: false },
    { label: 'Reports', icon: FileText, href: '#', active: false },
    { label: 'Profile', icon: User, href: '#', active: false },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-[240px] shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-navy)] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
            VA
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-wider text-slate-900 uppercase leading-tight">
              VENDOR AUTOMATION HUB
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Team Lead Workspace
            </span>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-md"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                item.active
                  ? 'bg-[var(--brand-navy)] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    item.active ? 'text-white' : 'text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    item.active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom Floating Card */}
      <div className="p-3">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-start justify-between gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-200 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-0.5">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2">
            <h4 className="text-xs font-bold text-slate-900">
              Team Lead Access
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Click to unlock Team Lead pages. Reports and Profile remain accessible
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (fixed left) */}
      <aside className="hidden lg:block h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 flex-1 max-w-xs w-full bg-white h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
