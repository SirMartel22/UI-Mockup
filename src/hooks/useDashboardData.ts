import { useQuery } from '@tanstack/react-query';
import {
  TopStatItem,
  SystemStatusData,
  SectionCardData,
  PriorityAlertsSummary,
  ActivityItem,
} from '../types/dashboard';

export function useTopStats() {
  return useQuery<TopStatItem[]>({
    queryKey: ['dashboard', 'topStats'],
    queryFn: async () => [
      {
        id: 'active-trades',
        label: 'Active Trades',
        value: 0,
        caption: 'In execution',
        sparklineColor: 'green',
        sparklineData: [10, 15, 12, 18, 14, 20, 16],
        iconType: 'trending',
      },
      {
        id: 'escalations',
        label: 'Escalations',
        value: 0,
        caption: 'Requires action',
        sparklineColor: 'red',
        sparklineData: [20, 18, 22, 19, 25, 21, 24],
        iconType: 'escalation',
      },
      {
        id: 'unread-messages',
        label: 'Unread Messages',
        value: 0,
        caption: 'New in inbox',
        sparklineColor: 'blue',
        sparklineData: [5, 10, 8, 15, 12, 18, 14],
        iconType: 'unread',
      },
      {
        id: 'discrepancies',
        label: 'Discrepancies',
        value: 0,
        caption: 'Under review',
        sparklineColor: 'orange',
        sparklineData: [12, 10, 14, 11, 16, 13, 15],
        iconType: 'discrepancies',
      },
    ],
    staleTime: 30000,
  });
}

export function useSystemStatus() {
  return useQuery<SystemStatusData>({
    queryKey: ['dashboard', 'systemStatus'],
    queryFn: async () => ({
      statusText: 'All Good',
      caption: 'Everything running smoothly',
      isAllGood: true,
    }),
    staleTime: 30000,
  });
}

export function useLiveOperations() {
  return useQuery<SectionCardData>({
    queryKey: ['dashboard', 'liveOperations'],
    queryFn: async () => ({
      id: 'live-operations',
      title: 'Live Operations',
      subtitle: 'Real-time queue execution and trade flow.',
      metrics: [
        {
          id: 'lo-active',
          label: 'Active Trades',
          value: 0,
          caption: 'In execution',
          iconType: 'trending',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
        {
          id: 'lo-assigned',
          label: 'Assigned Trades',
          value: 0,
          caption: 'To team',
          iconType: 'paperplane',
          iconBgColor: 'bg-blue-50',
          iconTextColor: 'text-blue-600',
        },
        {
          id: 'lo-escalated',
          label: 'Escalated Trades',
          value: 0,
          caption: 'Escalated',
          iconType: 'flame',
          iconBgColor: 'bg-orange-50',
          iconTextColor: 'text-orange-500',
        },
        {
          id: 'lo-avg-time',
          label: 'Avg Processing Time',
          value: '0s',
          caption: 'Today',
          iconType: 'clock',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
      ],
    }),
    staleTime: 30000,
  });
}

export function useFinancialOverview() {
  return useQuery<SectionCardData>({
    queryKey: ['dashboard', 'financialOverview'],
    queryFn: async () => ({
      id: 'financial-overview',
      title: 'Financial Overview',
      subtitle: 'Shift-level capital movement and liquidity.',
      metrics: [
        {
          id: 'fo-opening',
          label: 'Opening Balance',
          value: '₦4,000,000.00',
          iconType: 'bank',
          iconBgColor: 'bg-blue-50',
          iconTextColor: 'text-blue-600',
        },
        {
          id: 'fo-inflow',
          label: 'Total Inflow',
          value: '₦0.00',
          iconType: 'down-arrow',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
        {
          id: 'fo-outflow',
          label: 'Total Outflow',
          value: '₦0.00',
          iconType: 'up-arrow',
          iconBgColor: 'bg-orange-50',
          iconTextColor: 'text-orange-500',
        },
        {
          id: 'fo-closing',
          label: 'Closing Balance',
          value: '₦4,000,000.00',
          iconType: 'wallet',
          iconBgColor: 'bg-purple-50',
          iconTextColor: 'text-purple-600',
        },
      ],
    }),
    staleTime: 30000,
  });
}

export function useTeamPerformance() {
  return useQuery<SectionCardData>({
    queryKey: ['dashboard', 'teamPerformance'],
    queryFn: async () => ({
      id: 'team-performance',
      title: 'Team Performance',
      subtitle: 'Staff activity, throughput and efficiency.',
      metrics: [
        {
          id: 'tp-active-staff',
          label: 'Active Staff',
          value: 2,
          caption: 'Online now',
          iconType: 'people-blue',
          iconBgColor: 'bg-blue-50',
          iconTextColor: 'text-blue-600',
        },
        {
          id: 'tp-total-payers',
          label: 'Total Payers',
          value: 2,
          caption: 'Onboarded',
          iconType: 'people-purple',
          iconBgColor: 'bg-purple-50',
          iconTextColor: 'text-purple-600',
        },
        {
          id: 'tp-avg-speed',
          label: 'Avg Speed',
          value: '0s',
          caption: 'Per trade',
          iconType: 'speedometer',
          iconBgColor: 'bg-orange-50',
          iconTextColor: 'text-orange-500',
        },
        {
          id: 'tp-trades-completed',
          label: 'Trades Completed',
          value: 1,
          caption: 'Today',
          iconType: 'check-green',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
      ],
    }),
    staleTime: 30000,
  });
}

export function useBankHealth() {
  return useQuery<SectionCardData>({
    queryKey: ['dashboard', 'bankHealth'],
    queryFn: async () => ({
      id: 'bank-health',
      title: 'Bank Health',
      subtitle: 'Bank readiness, balance status and payout safety.',
      metrics: [
        {
          id: 'bh-funded',
          label: 'Funded Banks',
          value: 0,
          caption: 'Ready to trade',
          iconType: 'bank',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
        {
          id: 'bh-in-use',
          label: 'In Use',
          value: 0,
          caption: 'Currently active',
          iconType: 'document',
          iconBgColor: 'bg-blue-50',
          iconTextColor: 'text-blue-600',
        },
        {
          id: 'bh-low-balance',
          label: 'Low Balance',
          value: '—',
          caption: 'Below threshold',
          iconType: 'warning-orange',
          iconBgColor: 'bg-orange-50',
          iconTextColor: 'text-orange-500',
        },
        {
          id: 'bh-mismatch',
          label: 'Mismatch',
          value: 0,
          caption: 'Detected',
          iconType: 'search-red',
          iconBgColor: 'bg-red-50',
          iconTextColor: 'text-red-500',
        },
      ],
    }),
    staleTime: 30000,
  });
}

export function useCoinPosition() {
  return useQuery<SectionCardData>({
    queryKey: ['dashboard', 'coinPosition'],
    queryFn: async () => ({
      id: 'coin-position',
      title: 'Coin Position',
      subtitle: 'Treasury liquidity and coin exposure (BTC).',
      metrics: [
        {
          id: 'cp-total',
          label: 'Total Coin',
          value: '0.0005 BTC',
          iconType: 'bitcoin',
          iconBgColor: 'bg-blue-50',
          iconTextColor: 'text-blue-600',
        },
        {
          id: 'cp-locked',
          label: 'Locked Coin',
          value: '0.0002 BTC',
          iconType: 'lock-red',
          iconBgColor: 'bg-red-50',
          iconTextColor: 'text-red-500',
        },
        {
          id: 'cp-available',
          label: 'Available Coin',
          value: '0.0004 BTC',
          iconType: 'check-green',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
        {
          id: 'cp-excess',
          label: 'Excess Coin',
          value: '0.0005 BTC',
          iconType: 'coins-purple',
          iconBgColor: 'bg-purple-50',
          iconTextColor: 'text-purple-600',
        },
      ],
    }),
    staleTime: 30000,
  });
}

export function useRiskSummary() {
  return useQuery<SectionCardData>({
    queryKey: ['dashboard', 'riskSummary'],
    queryFn: async () => ({
      id: 'risk-summary',
      title: 'Risk & Discrepancy',
      subtitle: 'Exception exposure and recovery tracking.',
      metrics: [
        {
          id: 'rs-open-cases',
          label: 'Open Cases',
          value: '—',
          caption: 'Active issues',
          iconType: 'warning-red',
          iconBgColor: 'bg-red-50',
          iconTextColor: 'text-red-500',
        },
        {
          id: 'rs-unresolved',
          label: 'Unresolved Cases',
          value: '—',
          caption: 'Pending resolution',
          iconType: 'clock',
          iconBgColor: 'bg-amber-50',
          iconTextColor: 'text-amber-500',
        },
        {
          id: 'rs-amount-at-risk',
          label: 'Amount at Risk',
          value: '—',
          caption: 'Exposure',
          iconType: 'shield-blue',
          iconBgColor: 'bg-purple-50',
          iconTextColor: 'text-purple-600',
        },
        {
          id: 'rs-recovered',
          label: 'Recovered Amount',
          value: '—',
          caption: 'This shift',
          iconType: 'check-green',
          iconBgColor: 'bg-green-50',
          iconTextColor: 'text-green-600',
        },
      ],
    }),
    staleTime: 30000,
  });
}

export function usePriorityAlerts() {
  return useQuery<PriorityAlertsSummary>({
    queryKey: ['dashboard', 'priorityAlerts'],
    queryFn: async () => ({
      criticalCount: 0,
      warningCount: 0,
      infoCount: 0,
      alerts: [],
    }),
    staleTime: 30000,
  });
}

export function useActivityFeed() {
  return useQuery<ActivityItem[]>({
    queryKey: ['dashboard', 'activityFeed'],
    queryFn: async () => [
      {
        id: 'act-1',
        actorType: 'System',
        actorColor: 'green',
        message: 'Shift started successfully',
        timestamp: 'May 31, 2025 07:45 AM',
      },
      {
        id: 'act-2',
        actorType: 'Team Lead',
        actorColor: 'blue',
        message: 'Logged in to workspace',
        timestamp: 'May 31, 2025 07:45 AM',
      },
      {
        id: 'act-3',
        actorType: 'System',
        actorColor: 'orange',
        message: 'All systems operational',
        timestamp: 'May 31, 2025 07:45 AM',
      },
    ],
    staleTime: 30000,
  });
}
