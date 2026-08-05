'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BankSummary } from '../../types/bank';

interface LiquidityOverviewCardProps {
  summary?: BankSummary;
}

export default function LiquidityOverviewCard({
  summary = {
    totalBanks: 24,
    inUseCount: 18,
    inUsePercentage: 75.0,
    pendingCount: 3,
    pendingPercentage: 12.5,
    mismatchCount: 2,
    mismatchPercentage: 8.3,
    totalSystemBalance: 82340000,
    totalInflow: 56780000,
    totalOutflow: 25560000,
    netFlow: 31220000,
  },
}: LiquidityOverviewCardProps) {
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    })
      .format(val)
      .replace('NGN', '₦');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs w-full">
      {/* Label */}
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
        Liquidity Overview
      </span>

      {/* Main Balance Row */}
      <div className="mt-2 flex items-baseline justify-between gap-2 flex-wrap">
        <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
          {formatNaira(summary.totalSystemBalance)}
        </span>
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ArrowUpRight className="w-3 h-3 text-emerald-600" />
          12.6% vs last month
        </span>
      </div>

      <p className="text-[10px] text-slate-400 mt-1">Total System Balance</p>

      {/* Three Stacked Flow Rows */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-600 font-medium">Total Inflow</span>
          <span className="font-bold text-emerald-600 font-mono">
            {formatNaira(summary.totalInflow)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 font-medium">Total Outflow</span>
          <span className="font-bold text-red-600 font-mono">
            {formatNaira(summary.totalOutflow)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="text-slate-800 font-semibold">Net Flow</span>
          <span className="font-bold text-slate-900 font-mono">
            {formatNaira(summary.netFlow)}
          </span>
        </div>
      </div>
    </div>
  );
}
