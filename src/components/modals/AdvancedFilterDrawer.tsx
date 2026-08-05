'use client';

import React, { useState } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

export default function AdvancedFilterDrawer() {
  const isOpen = useBankStore((state) => state.isAdvancedFiltersOpen);
  const setOpen = useBankStore((state) => state.setAdvancedFiltersOpen);
  const filters = useBankStore((state) => state.filters);
  const setStatusFilter = useBankStore((state) => state.setStatusFilter);
  const setAssignmentFilter = useBankStore((state) => state.setAssignmentFilter);
  const setDeclarationFilter = useBankStore((state) => state.setDeclarationFilter);
  const resetFilters = useBankStore((state) => state.resetFilters);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Advanced Operations Filter</h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Operational Status
            </label>
            <div className="space-y-1.5">
              {['ALL', 'In Use', 'Pending', 'Mismatch'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st as any)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    filters.status === st
                      ? 'border-[var(--brand-navy)] bg-slate-100 text-[var(--brand-navy)] font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {st === 'ALL' ? 'All Operational Statuses' : st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Payer Assignment Mode
            </label>
            <div className="space-y-1.5">
              {[
                { label: 'All Assignments', val: 'ALL' },
                { label: 'Assigned to Payers', val: 'ASSIGNED' },
                { label: 'Unassigned / Team Lead', val: 'UNASSIGNED' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setAssignmentFilter(opt.val as any)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    filters.assignment === opt.val
                      ? 'border-[var(--brand-navy)] bg-slate-100 text-[var(--brand-navy)] font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Declaration State
            </label>
            <div className="space-y-1.5">
              {[
                { label: 'All Declaration States', val: 'ALL' },
                { label: 'Declared Ready', val: 'Declared' },
                { label: 'Pending Declaration', val: 'Pending' },
                { label: 'Flagged Mismatch', val: 'Flagged' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setDeclarationFilter(opt.val as any)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    filters.declaration === opt.val
                      ? 'border-[var(--brand-navy)] bg-slate-100 text-[var(--brand-navy)] font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              resetFilters();
              setOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setOpen(false)}
            className="px-5 py-2 bg-[var(--brand-navy)] text-white text-xs font-bold rounded-lg hover:bg-[var(--brand-navy-hover)] transition-colors shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
