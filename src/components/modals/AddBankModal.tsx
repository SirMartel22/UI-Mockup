'use client';

import React, { useState } from 'react';
import { X, Building2, Landmark, CheckCircle2 } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';
import { Bank } from '../../types/bank';

export default function AddBankModal() {
  const isAddBankOpen = useBankStore((state) => state.isAddBankOpen);
  const setAddBankOpen = useBankStore((state) => state.setAddBankOpen);
  const addBank = useBankStore((state) => state.addBank);

  const [label, setLabel] = useState('');
  const [bankName, setBankName] = useState('Guaranty Trust Bank');
  const [accountLabel, setAccountLabel] = useState('VAH Settlement Account');
  const [accountNumber, setAccountNumber] = useState('');
  const [initialBalance, setInitialBalance] = useState('10000000');
  const [status, setStatus] = useState<'In Use' | 'Pending'>('In Use');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAddBankOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !accountNumber) return;

    const brandColors: Record<string, string> = {
      'Guaranty Trust Bank': '#FF6600',
      'Zenith Bank': '#E61C24',
      'United Bank for Africa': '#D32F2F',
      'Access Bank': '#FF9900',
      'First Bank of Nigeria': '#002B66',
      'FCMB': '#5B2C6F',
    };

    const newBank: Bank = {
      id: `bank-${Date.now()}`,
      label: label.toUpperCase(),
      bankName,
      accountLabel,
      accountNumber,
      brandColor: brandColors[bankName] || '#0b132b',
      status,
      declarationState: status === 'In Use' ? 'Declared' : 'Pending',
      assignees:
        status === 'In Use'
          ? [
              { id: 'usr-new1', name: 'Operations Lead', initials: 'OL', avatarBg: '#3b82f6' },
              { id: 'usr-new2', name: 'Settlement Officer', initials: 'SO', avatarBg: '#10b981' },
            ]
          : [{ id: 'tl', name: 'Team Lead', initials: 'TL', avatarBg: '#0b132b' }],
      isUnassignedOrTL: status === 'Pending',
      systemOpeningBalance: Number(initialBalance),
      payerOpeningBalance: Number(initialBalance),
      closingBalance: Number(initialBalance),
      lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    addBank(newBank);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setAddBankOpen(false);
      setLabel('');
      setAccountNumber('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setAddBankOpen(false)}
      />

      {/* Dialog */}
      <div className="relative z-10 bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--brand-navy)] text-white flex items-center justify-center shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Add New Bank Account</h3>
              <p className="text-[11px] text-slate-500">Register a new liquidity bank node</p>
            </div>
          </div>
          <button
            onClick={() => setAddBankOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Bank Registered Successfully!</h4>
            <p className="text-xs text-slate-500 mt-1">The bank node is now active in your operations queue.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bank Code / Label *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GTB009"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bank Institution *
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] font-semibold"
                >
                  <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="United Bank for Africa">United Bank for Africa</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                  <option value="FCMB">FCMB</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Internal Account Label
              </label>
              <input
                type="text"
                value={accountLabel}
                onChange={(e) => setAccountLabel(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Account Number (10 digits) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  placeholder="0123456789"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Opening Balance (₦)
                </label>
                <input
                  type="number"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-navy)] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Initial Operational Readiness Status
              </label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <label
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                    status === 'In Use'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'In Use'}
                    onChange={() => setStatus('In Use')}
                    className="sr-only"
                  />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>In Use (Active)</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                    status === 'Pending'
                      ? 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'Pending'}
                    onChange={() => setStatus('Pending')}
                    className="sr-only"
                  />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Pending Assignment</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setAddBankOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[var(--brand-navy)] text-white text-xs font-bold hover:bg-[var(--brand-navy-hover)] transition-colors shadow-xs"
              >
                Add Bank Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
