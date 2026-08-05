'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  Bell,
  Mail,
  ChevronDown,
  Menu,
  CheckCircle2,
  LogOut,
  Shield,
  UserCheck,
} from 'lucide-react';

interface TopBarProps {
  onOpenMobileSidebar?: () => void;
}

export default function TopBar({ onOpenMobileSidebar }: TopBarProps) {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Left: Breadcrumbs & Mobile toggle */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <nav className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500">Vendor Automation Hub</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold">Banks</span>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Off Shift Toggle Pill */}
        <button
          onClick={() => setIsShiftActive(!isShiftActive)}
          className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 shadow-2xs ${
            isShiftActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isShiftActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
            }`}
          />
          <span>{isShiftActive ? 'On Shift' : 'Off Shift'}</span>
        </button>

        {/* Clocking In... Disabled Button */}
        <button
          disabled
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed select-none opacity-80"
        >
          <span>Clocking In...</span>
        </button>

        {/* Bell Icon with Red Badge */}
        <button
          aria-label="Notifications"
          className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-white">
            2
          </span>
        </button>

        {/* Mail Icon with Badge */}
        <button
          aria-label="Messages"
          className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-white">
            2
          </span>
        </button>

        {/* Separator */}
        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--brand-navy)] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              TL
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                Team Lead
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Workspace
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {/* Role / Account Menu Popover */}
          {isProfileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Lead Operator</p>
                <p className="text-[11px] text-slate-500 truncate">
                  teamlead@vendorhub.com
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span>Switch Workspace</span>
                </button>
                <button
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span>Security & Roles</span>
                </button>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
