'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function Pagination({
  total = 24,
  page = 1,
  pageSize = 6,
  totalPages = 4,
}: PaginationProps) {
  const setPage = useBankStore((state) => state.setPage);
  const setPageSize = useBankStore((state) => state.setPageSize);

  const startCount = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endCount = Math.min(page * pageSize, total);

  // Generate numbered buttons
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - 1 && i <= page + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              i === page
                ? 'bg-[var(--brand-navy)] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === 2 && page > 3) ||
        (i === totalPages - 1 && page < totalPages - 2)
      ) {
        pages.push(
          <span key={i} className="px-1 text-slate-400 font-bold text-xs select-none">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-2xs mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Dynamic Showing Count */}
      <span className="text-xs font-semibold text-slate-600">
        Showing{' '}
        <span className="text-slate-900 font-bold">{startCount}</span> to{' '}
        <span className="text-slate-900 font-bold">{endCount}</span> of{' '}
        <span className="text-slate-900 font-bold">{total}</span> banks
      </span>

      {/* Right Controls: Prev/Next buttons & Page Size selector */}
      <div className="flex items-center gap-3">
        {/* Page Nav */}
        <div className="flex items-center gap-1.5">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">{renderPageNumbers()}</div>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-slate-200" />

        {/* Items per page selector */}
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-xs font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] cursor-pointer"
          >
            <option value={6}>6 / page</option>
            <option value={10}>10 / page</option>
            <option value={18}>18 / page</option>
            <option value={24}>24 / page</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
