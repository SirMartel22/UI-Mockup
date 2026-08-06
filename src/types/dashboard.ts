import { ComponentType } from 'react';

export interface TopStatItem {
  id: string;
  label: string;
  value: number | string;
  caption: string;
  sparklineColor: 'green' | 'red' | 'blue' | 'orange';
  sparklineData: number[];
  iconType: 'trending' | 'escalation' | 'unread' | 'discrepancies';
}

export interface SystemStatusData {
  statusText: string;
  caption: string;
  isAllGood: boolean;
}

export interface SubTileMetric {
  id: string;
  label: string;
  value: string | number; // "₦4,000,000.00", "0", "—", "0.0005 BTC"
  caption?: string;
  iconType:
    | 'trending'
    | 'paperplane'
    | 'flame'
    | 'clock'
    | 'bank'
    | 'down-arrow'
    | 'up-arrow'
    | 'wallet'
    | 'people-blue'
    | 'people-purple'
    | 'speedometer'
    | 'check-green'
    | 'document'
    | 'warning-orange'
    | 'search-red'
    | 'bitcoin'
    | 'lock-red'
    | 'coins-purple'
    | 'warning-red'
    | 'shield-blue';
  iconBgColor: string; // e.g. 'bg-green-50'
  iconTextColor: string; // e.g. 'text-green-600'
}

export interface SectionCardData {
  id: string;
  title: string;
  subtitle: string;
  metrics: [SubTileMetric, SubTileMetric, SubTileMetric, SubTileMetric];
}

export interface PriorityAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export interface PriorityAlertsSummary {
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  alerts: PriorityAlert[];
}

export interface ActivityItem {
  id: string;
  actorType: 'System' | 'Team Lead' | 'Payer' | string;
  actorColor: 'green' | 'blue' | 'orange' | 'purple' | 'red';
  message: string;
  timestamp: string; // e.g. "May 31, 2025 07:45 AM"
}

export interface QuickToolItem {
  id: string;
  label: string;
  href: string;
  iconType: 'queue' | 'escalations' | 'chat' | 'rates' | 'banks' | 'discrepancy';
  bgColor: string; // e.g. 'bg-navy-900', 'bg-red-50', 'bg-blue-50', etc.
  textColor: string; // e.g. 'text-white', 'text-red-600', etc.
  isPrimary?: boolean;
}
