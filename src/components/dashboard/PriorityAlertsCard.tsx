'use client';

import React from 'react';
import { CheckCircle2, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { PriorityAlertsSummary } from '../../types/dashboard';

interface PriorityAlertsCardProps {
  data?: PriorityAlertsSummary;
}

export default function PriorityAlertsCard({ data }: PriorityAlertsCardProps) {
  const critical = data?.criticalCount ?? 0;
  const warning = data?.warningCount ?? 0;
  const info = data?.infoCount ?? 0;
  const alerts = data?.alerts ?? [];

  const hasNoAlerts = critical === 0 && warning === 0 && info === 0 && alerts.length === 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between h-full">
      {/* Top Header & Badges Row */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 tracking-tight">
            Priority Alerts
          </h3>
          <p className="text-sm text-gray-500 mt-0.5 leading-snug">
            Operational issues requiring immediate attention.
          </p>
        </div>

        {/* Severity Badges Row */}
        <div className="flex items-center gap-2 pt-1">
          {/* Critical Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-semibold">
            <span>Critical</span>
            <span className="w-4 h-4 rounded-full bg-red-600/10 text-red-700 text-[10px] font-bold inline-flex items-center justify-center">
              {critical}
            </span>
          </div>

          {/* Warning Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 text-xs font-semibold">
            <span>Warning</span>
            <span className="w-4 h-4 rounded-full bg-orange-600/10 text-orange-700 text-[10px] font-bold inline-flex items-center justify-center">
              {warning}
            </span>
          </div>

          {/* Info Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold">
            <span>Info</span>
            <span className="w-4 h-4 rounded-full bg-blue-600/10 text-blue-700 text-[10px] font-bold inline-flex items-center justify-center">
              {info}
            </span>
          </div>
        </div>
      </div>

      {/* Main Alert List / Success Banner Area */}
      <div className="mt-4">
        {hasNoAlerts ? (
          <div className="bg-green-50/80 border border-green-200/60 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-tight">
                No active alerts
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Great! Everything looks good.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3 text-xs"
              >
                {alert.severity === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                ) : alert.severity === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{alert.message}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
