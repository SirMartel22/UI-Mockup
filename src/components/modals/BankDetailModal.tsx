'use client';

import React from 'react';
import { X, Landmark, User, AlertTriangle, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

export default function BankDetailModal() {
  const selectedBank = useBankStore((state) => state.selectedBank);
  const setSelectedBank = useBankStore((state) => state.setSelectedBank);

  if (!selectedBank) return null;

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    })
      .format(val)
      .replace('NGN', '₦');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedBank(null)}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedBank.logoUrl ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-1 shrink-0 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedBank.logoUrl}
                  alt={selectedBank.bankName}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                style={{ backgroundColor: selectedBank.brandColor }}
              >
                {selectedBank.label.slice(0, 3)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-mono">
                  {selectedBank.label}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-200 text-slate-700">
                  {selectedBank.bankName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {selectedBank.accountLabel} • {selectedBank.accountNumber}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedBank(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status & Declaration Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Readiness Status</span>
              {selectedBank.status === 'In Use' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  In Use
                </span>
              )}
              {selectedBank.status === 'Pending' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Pending Assignment
                </span>
              )}
              {selectedBank.status === 'Mismatch' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  Mismatch Detected
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium">Declaration State</span>
              <span className="font-bold text-slate-900">
                {selectedBank.declarationState}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium">Last Audit Sync</span>
              <span className="text-slate-700 font-mono">{selectedBank.lastUpdated}</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Financial Position Ledger
            </h4>
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs">
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-600">System Opening Balance</span>
                <span className="font-bold font-mono text-slate-900">
                  {formatNaira(selectedBank.systemOpeningBalance)}
                </span>
              </div>

              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-600">Payer Opening Balance</span>
                <span className="font-bold font-mono text-slate-900">
                  {formatNaira(selectedBank.payerOpeningBalance)}
                </span>
              </div>

              <div className="p-3 flex items-center justify-between bg-slate-50">
                <span className="font-bold text-slate-900">Closing Balance</span>
                <span
                  className={`font-bold font-mono text-sm ${
                    selectedBank.status === 'Mismatch'
                      ? 'text-red-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {formatNaira(selectedBank.closingBalance)}
                </span>
              </div>
            </div>
          </div>

          {/* Assignees List */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Assigned Payer Personnel
            </h4>
            <div className="space-y-2">
              {selectedBank.assignees.map((assignee) => (
                <div
                  key={assignee.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs bg-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assignee.avatarUrl || '/avatars/payer-avatar.jpg'}
                        alt={assignee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{assignee.name}</p>
                      <p className="text-[10px] text-slate-500">Payer Role Operator</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => setSelectedBank(null)}
            className="w-full px-4 py-2 bg-[var(--brand-navy)] text-white text-xs font-bold rounded-lg hover:bg-[var(--brand-navy-hover)] transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
