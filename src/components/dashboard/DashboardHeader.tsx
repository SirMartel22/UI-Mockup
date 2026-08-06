'use client';

import React, { useEffect } from 'react';
import {
  Pause,
  Sun,
  LogOut,
  AlertTriangle,
  Bell,
  ChevronDown,
  RefreshCw,
  User,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

interface DashboardHeaderProps {
  onOpenMobileSidebar?: () => void;
}

export default function DashboardHeader({ onOpenMobileSidebar }: DashboardHeaderProps) {
  const {
    isAssignmentPaused,
    isMorningShift,
    isClockedOut,
    lastSyncSeconds,
    activeShiftCount,
    warningAlertCount,
    bellNotificationCount,
    isAccountMenuOpen,
    togglePauseAssignment,
    toggleMorningShift,
    clockOut,
    resetSyncTimer,
    incrementSyncTimer,
    toggleAccountMenu,
    closeAccountMenu,
  } = useDashboardStore();

  // Timer interval for real-time live sync counter
  useEffect(() => {
    const timer = setInterval(() => {
      incrementSyncTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [incrementSyncTimer]);

  return (
    <div className="space-y-2 select-none">
      {/* Top Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
        {/* Left Title Area */}
        <div>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-0.5">
            TEAM LEAD CONTROL CENTER
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs font-normal text-gray-500 mt-0.5">
            Real-time cockpit for queue movement, liquidity, team performance and financial control.
          </p>
        </div>

        {/* Top-Right Action Cluster */}
        <div className="flex items-center flex-wrap gap-2 shrink-0 self-start lg:self-auto">
          {/* Pause Assignment Button */}
          <button
            onClick={togglePauseAssignment}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isAssignmentPaused
                ? 'bg-orange-100 text-orange-700 border-orange-400'
                : 'bg-[#FFF9F0] text-[#D97706] border-[#FDE68A] hover:bg-orange-100/70'
            }`}
          >
            <Pause className="w-3 h-3 fill-current" />
            <span>{isAssignmentPaused ? 'Resume Assignment' : 'Pause Assignment'}</span>
          </button>

          {/* Morning Shift Button */}
          <button
            onClick={toggleMorningShift}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isMorningShift && !isClockedOut
                ? 'bg-green-100 text-green-700 border-green-400'
                : 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0] hover:bg-green-100/70'
            }`}
          >
            <Sun className="w-3 h-3" />
            <span>Morning Shift</span>
          </button>

          {/* Clock Out Button */}
          <button
            onClick={clockOut}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isClockedOut
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-[#16A34A] border-[#BBF7D0] hover:bg-green-50'
            }`}
          >
            <LogOut className="w-3 h-3" />
            <span>{isClockedOut ? 'Clock In' : 'Clock Out'}</span>
          </button>

          {/* Warning Icon Button */}
          <button
            aria-label="View system warnings"
            className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 relative transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-gray-800" />
            {warningAlertCount > 0 && (
              <span
                aria-live="polite"
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-2xs"
              >
                {warningAlertCount}
              </span>
            )}
          </button>

          {/* Bell Icon Button */}
          <button
            aria-label="View notifications"
            className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4 text-gray-800" />
            {bellNotificationCount > 0 && (
              <span
                aria-live="polite"
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#0B153A] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-2xs"
              >
                {bellNotificationCount}
              </span>
            )}
          </button>

          {/* User Avatar & Workspace Dropdown Menu */}
          <div className="relative">
            <button
              onClick={toggleAccountMenu}
              aria-label="Account menu"
              aria-expanded={isAccountMenuOpen}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B153A] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                TL
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#0B153A] leading-tight">
                  Team Lead
                </span>
                <span className="text-[10px] font-medium text-gray-400 leading-tight">
                  Workspace
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            </button>

            {/* Dropdown Popover Menu */}
            {isAccountMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={closeAccountMenu}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Lead Supervisor</p>
                    <p className="text-[11px] text-gray-500">tl@vendorautomation.io</p>
                  </div>
                  <button
                    onClick={closeAccountMenu}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={closeAccountMenu}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                    <span>Access Permissions</span>
                  </button>
                  <button
                    onClick={closeAccountMenu}
                    className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-gray-500" />
                    <span>Workspace Settings</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Sub-Row (Right-Aligned) */}
      <div className="flex items-center justify-end gap-3 pt-1">
        {/* Shift Active Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-xs font-semibold text-green-600">
          <span>Shift Active</span>
          <span className="w-4 h-4 rounded-full bg-green-600/10 text-green-700 text-[10px] font-bold inline-flex items-center justify-center">
            {activeShiftCount}
          </span>
        </div>

        {/* Last Sync Timer */}
        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
          <button
            onClick={resetSyncTimer}
            title="Click to sync now"
            className="hover:text-gray-900 transition-colors p-0.5 rounded"
            aria-label="Refresh sync timer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 transition-transform active:rotate-180" />
          </button>
          <span>Last sync: {lastSyncSeconds}s ago</span>
        </div>
      </div>
    </div>
  );
}
