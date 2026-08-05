'use client';

import React from 'react';
import { ChevronRight, UserCheck, FileCheck, AlertTriangle } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

export default function QuickActionsCard() {
  const setStatusFilter = useBankStore((state) => state.setStatusFilter);
  const setDeclarationFilter = useBankStore((state) => state.setDeclarationFilter);
  const setAssignmentFilter = useBankStore((state) => state.setAssignmentFilter);

  const actions = [
    {
      label: 'Bank Assignments',
      icon: UserCheck,
      badge: undefined,
      onClick: () => setAssignmentFilter('UNASSIGNED'),
    },
    {
      label: 'Declaration Review',
      icon: FileCheck,
      badge: 2,
      onClick: () => setDeclarationFilter('Flagged'),
    },
    {
      label: 'Mismatch Review',
      icon: AlertTriangle,
      badge: 2,
      onClick: () => setStatusFilter('Mismatch'),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs w-full">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
        Quick Actions
      </h3>

      <div className="space-y-1.5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.label}
              onClick={action.onClick}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all duration-150 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-[var(--brand-navy)] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  {action.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {action.badge !== undefined && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white font-bold text-[9px] flex items-center justify-center">
                    {action.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
