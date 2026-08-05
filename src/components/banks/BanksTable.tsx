'use client';

import React, { useState } from 'react';
import {
  Download,
  Calendar,
  ChevronDown,
  Eye,
  MoreVertical,
  AlertTriangle,
  RefreshCw,
  SearchX,
  Edit2,
  UserPlus,
  History,
  Slash,
} from 'lucide-react';
import { Bank } from '../../types/bank';
import { useBankStore } from '../../store/useBankStore';

interface BanksTableProps {
  banks?: Bank[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export default function BanksTable({
  banks = [],
  isLoading = false,
  isError = false,
  onRetry,
}: BanksTableProps) {
  const setSelectedBank = useBankStore((state) => state.setSelectedBank);
  const resetFilters = useBankStore((state) => state.resetFilters);
  const filters = useBankStore((state) => state.filters);

  const [activeMenuBankId, setActiveMenuBankId] = useState<string | null>(null);

  // Helper to format currency in Nigerian Naira ₦
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace('NGN', '₦');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Section Header & Top Actions */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Bank Operations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Monitor liquidity position, declaration state, payer assignment, and live bank readiness.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Export Button */}
          <button
            onClick={() => {
              const headers = ['Label', 'Bank Name', 'Account Number', 'Status', 'Closing Balance', 'Last Updated'];
              const rows = banks.map(b => [b.label, b.bankName, b.accountNumber, b.status, b.closingBalance, b.lastUpdated]);
              const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', `bank_operations_${new Date().toISOString().slice(0,10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          {/* Date-Range Picker Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {filters.dateRange.from} – {filters.dateRange.to}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {isError && (
        <div className="p-4 bg-red-50 border-b border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-red-900">Failed to load bank data</h4>
              <p className="text-[11px] text-red-700">
                An unexpected network error occurred while fetching bank records.
              </p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          {/* Two-level (grouped) Header */}
          <thead>
            {/* Level 1: Category Groups */}
            <tr className="bg-slate-100/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <th colSpan={2} className="px-4 py-2 border-r border-slate-200 text-left">
                BANK INFORMATION
              </th>
              <th colSpan={2} className="px-4 py-2 border-r border-slate-200 text-left">
                STATUS & ASSIGNMENT
              </th>
              <th colSpan={3} className="px-4 py-2 border-r border-slate-200 text-center">
                FINANCIAL OVERVIEW → Balances (₦)
              </th>
              <th className="px-4 py-2 border-r border-slate-200 text-left">
                LAST ACTIVITY
              </th>
              <th className="px-4 py-2 text-center">ACTIONS</th>
            </tr>

            {/* Level 2: Column Subheaders */}
            <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
              <th className="px-4 py-2.5 w-32">Bank Label</th>
              <th className="px-4 py-2.5">Bank / Account Details</th>
              <th className="px-4 py-2.5 w-28">Status</th>
              <th className="px-4 py-2.5 w-36">Assignment</th>
              <th className="px-4 py-2.5 text-right w-36">System Opening</th>
              <th className="px-4 py-2.5 text-right w-36">Payer Opening</th>
              <th className="px-4 py-2.5 text-right w-36">Closing Balance</th>
              <th className="px-4 py-2.5 w-36">Last Updated</th>
              <th className="px-4 py-2.5 text-center w-20">—</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 text-xs">
            {/* Loading Shimmer Skeleton */}
            {isLoading &&
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-6 w-20 bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-36 bg-slate-200 rounded-md mb-1" />
                    <div className="h-3 w-28 bg-slate-100 rounded-md" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-6 w-20 bg-slate-200 rounded-full" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="h-4 w-24 bg-slate-200 rounded-md ml-auto" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="h-4 w-24 bg-slate-200 rounded-md ml-auto" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="h-4 w-24 bg-slate-200 rounded-md ml-auto" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="h-6 w-12 bg-slate-200 rounded-md mx-auto" />
                  </td>
                </tr>
              ))}

            {/* Empty State */}
            {!isLoading && !isError && banks.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center bg-slate-50/50">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                      <SearchX className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">No banks found</h3>
                    <p className="text-[11px] text-slate-500 mt-1">
                      No bank operations match your current search or filter criteria.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-3 py-1.5 bg-[var(--brand-navy)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--brand-navy-hover)] transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Populated Bank Rows */}
            {!isLoading &&
              !isError &&
              banks.map((bank) => {
                const isPending = bank.status === 'Pending';
                const isMismatch = bank.status === 'Mismatch';

                return (
                  <tr
                    key={bank.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Bank Label Cell */}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-2.5">
                        {bank.logoUrl ? (
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-0.5 shrink-0 shadow-2xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={bank.logoUrl}
                              alt={bank.bankName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-[10px] shadow-2xs shrink-0"
                            style={{ backgroundColor: bank.brandColor }}
                          >
                            {bank.label.slice(0, 3)}
                          </div>
                        )}
                        <span className="font-bold text-slate-900 font-mono tracking-tight">
                          {bank.label}
                        </span>
                      </div>
                    </td>

                    {/* Bank & Account Details Cell */}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-xs">
                          {bank.bankName}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span>{bank.accountLabel}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-slate-600">{bank.accountNumber}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td className="px-4 py-3 align-middle">
                      {bank.status === 'In Use' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          In Use
                        </span>
                      )}
                      {bank.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Pending
                        </span>
                      )}
                      {bank.status === 'Mismatch' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Mismatch
                        </span>
                      )}
                    </td>

                    {/* Assignment Cell */}
                    <td className="px-4 py-3 align-middle">
                      {bank.isUnassignedOrTL ? (
                        <div
                          title="Team Lead (Unassigned)"
                          className="w-6 h-6 rounded-full bg-slate-200 text-slate-900 text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-2xs"
                        >
                          TL
                        </div>
                      ) : (
                        <div className="flex items-center -space-x-1.5">
                          {bank.assignees.slice(0, 2).map((assignee) => (
                            <div
                              key={assignee.id}
                              title={assignee.name}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-2xs overflow-hidden shrink-0 bg-slate-200"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={assignee.avatarUrl || '/avatars/payer-avatar.jpg'}
                                alt={assignee.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {bank.assignees.length > 2 && (
                            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center border-2 border-white">
                              +{bank.assignees.length - 2}
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* System Opening Balance */}
                    <td className="px-4 py-3 text-right align-middle font-mono font-medium">
                      <span className={isPending ? 'text-slate-300 font-normal' : 'text-slate-900'}>
                        {formatNaira(bank.systemOpeningBalance)}
                      </span>
                    </td>

                    {/* Payer Opening Balance */}
                    <td className="px-4 py-3 text-right align-middle font-mono font-medium">
                      <span className={isPending ? 'text-slate-300 font-normal' : 'text-slate-900'}>
                        {formatNaira(bank.payerOpeningBalance)}
                      </span>
                    </td>

                    {/* Closing Balance */}
                    <td className="px-4 py-3 text-right align-middle font-mono">
                      {isPending ? (
                        <span className="text-slate-300 font-normal">₦0.00</span>
                      ) : isMismatch ? (
                        <div className="inline-flex items-center justify-end gap-1 text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                          <span>{formatNaira(bank.closingBalance)}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-emerald-600">
                          {formatNaira(bank.closingBalance)}
                        </span>
                      )}
                    </td>

                    {/* Last Updated Cell */}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex flex-col text-[11px] text-slate-500">
                        <span className="font-medium text-slate-700">
                          {bank.lastUpdated.split(' ')[0]} {bank.lastUpdated.split(' ')[1]} {bank.lastUpdated.split(' ')[2]}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {bank.lastUpdated.split(' ').slice(3).join(' ')}
                        </span>
                      </div>
                    </td>

                    {/* Actions Cell */}
                    <td className="px-4 py-3 text-center align-middle relative">
                      <div className="flex items-center justify-center gap-1">
                        {/* Eye icon to view details drawer */}
                        <button
                          onClick={() => setSelectedBank(bank)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="View Bank Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* 3-dot dropdown menu */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuBankId(
                                activeMenuBankId === bank.id ? null : bank.id
                              );
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                            title="More Actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuBankId === bank.id && (
                            <div
                              className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-left animate-in fade-in duration-100"
                              onClick={() => setActiveMenuBankId(null)}
                            >
                              <button
                                onClick={() => setSelectedBank(bank)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                                <span>Edit Bank Config</span>
                              </button>
                              <button
                                onClick={() => setSelectedBank(bank)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                              >
                                <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                                <span>Assign Payers</span>
                              </button>
                              <button
                                onClick={() => setSelectedBank(bank)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                              >
                                <History className="w-3.5 h-3.5 text-slate-400" />
                                <span>View History</span>
                              </button>
                              <div className="my-1 border-t border-slate-100" />
                              <button
                                onClick={() => setActiveMenuBankId(null)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                              >
                                <Slash className="w-3.5 h-3.5 text-red-500" />
                                <span>Deactivate Bank</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
