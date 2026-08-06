'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Lock,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isOpenMobile = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Live Queue', icon: Radio, href: '/live-queue' },
    { label: 'Chat Inbox', icon: MessageSquare, href: '/chat-inbox', badge: 12 },
    { label: 'Rates', icon: Percent, href: '/rates' },
    { label: 'Banks', icon: Landmark, href: '/banks' },
    { label: 'Team', icon: Users, href: '/team' },
    { label: 'Coin Hub', icon: Coins, href: '/coin-hub' },
    { label: 'Financial Controls', icon: ShieldCheck, href: '/financial-controls' },
    { label: 'Trade History', icon: History, href: '/trade-history' },
    { label: 'Reports', icon: FileText, href: '/reports' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[240px] shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-2xs shrink-0">
            VA
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-wider text-gray-900 uppercase leading-tight">
              VENDOR AUTOMATION HUB
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Team Lead Workspace
            </span>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600 rounded-md"
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
          const isActive =
            pathname === item.href || (item.href === '/' && (pathname === '' || pathname === '/dashboard'));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-navy-900 text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Floating Card */}
      <div className="p-3">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-2xs transition-all hover:border-gray-300">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-2xs border border-gray-200 shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-900">
                Team Lead Access
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Operational access is limited to your assigned workspace scope.
              </p>
              <Link
                href="/access-details"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 mt-2 transition-colors"
              >
                <span>View Access Details</span>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </Link>
            </div>
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
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity"
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
