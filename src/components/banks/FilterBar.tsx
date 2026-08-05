'use client';

import React from 'react';
import { Search, ChevronDown, Filter, X } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';
import { BankStatus, DeclarationStatus } from '../../types/bank';

export default function FilterBar() {
  const filters = useBankStore((state) => state.filters);
  const setSearch = useBankStore((state) => state.setSearch);
  const setStatusFilter = useBankStore((state) => state.setStatusFilter);
  const setAssignmentFilter = useBankStore((state) => state.setAssignmentFilter);
  const setDeclarationFilter = useBankStore((state) => state.setDeclarationFilter);
  const resetFilters = useBankStore((state) => state.resetFilters);
  const setAdvancedFiltersOpen = useBankStore((state) => state.setAdvancedFiltersOpen);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'ALL' ||
    filters.assignment !== 'ALL' ||
    filters.declaration !== 'ALL';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs mb-6 flex flex-col md:flex-row items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by bank label, bank name or account number..."
          className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] focus:bg-white transition-all"
        />
        {filters.search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Select Filters Group */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
        {/* Status Dropdown */}
        <div className="relative flex-1 md:flex-none min-w-[130px]">
          <select
            value={filters.status}
            onChange={(e) => setStatusFilter(e.target.value as 'ALL' | BankStatus)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="In Use">In Use</option>
            <option value="Pending">Pending</option>
            <option value="Mismatch">Mismatch</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Assignments Dropdown */}
        <div className="relative flex-1 md:flex-none min-w-[140px]">
          <select
            value={filters.assignment}
            onChange={(e) =>
              setAssignmentFilter(e.target.value as 'ALL' | 'ASSIGNED' | 'UNASSIGNED')
            }
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] cursor-pointer"
          >
            <option value="ALL">All Assignments</option>
            <option value="ASSIGNED">Assigned Payers</option>
            <option value="UNASSIGNED">Unassigned / TL</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Declarations Dropdown */}
        <div className="relative flex-1 md:flex-none min-w-[140px]">
          <select
            value={filters.declaration}
            onChange={(e) =>
              setDeclarationFilter(e.target.value as 'ALL' | DeclarationStatus)
            }
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] cursor-pointer"
          >
            <option value="ALL">All Declarations</option>
            <option value="Declared">Declared</option>
            <option value="Pending">Pending Declaration</option>
            <option value="Flagged">Flagged Mismatch</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Button (Opens Drawer) */}
        <button
          onClick={() => setAdvancedFiltersOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span>Filter</span>
        </button>

        {/* Clear Filters reset option */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
