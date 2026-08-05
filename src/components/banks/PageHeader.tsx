'use client';

import React, { useState } from 'react';
import { Plus, MoreHorizontal, Download, RefreshCw, Layers } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

export default function PageHeader() {
  const setAddBankOpen = useBankStore((state) => state.setAddBankOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Banks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Manage and monitor all bank operations, assignments, and readiness.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setAddBankOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-hover)] text-white text-xs font-semibold shadow-xs transition-colors duration-150 active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bank</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
            aria-label="More page actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh Dataset</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Bank Audit Log</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Batch Assign Payers</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
