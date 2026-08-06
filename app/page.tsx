'use client';

import React, { useState } from 'react';
import Sidebar from '../src/components/layout/Sidebar';
import DashboardHeader from '../src/components/dashboard/DashboardHeader';
import { TopStatCard, SystemStatusCard } from '../src/components/dashboard/TopStatCard';
import QuickToolsBar from '../src/components/dashboard/QuickToolsBar';
import SectionCard from '../src/components/dashboard/SectionCard';
import PriorityAlertsCard from '../src/components/dashboard/PriorityAlertsCard';
import LiveActivityFeed from '../src/components/dashboard/LiveActivityFeed';
import DashboardSkeleton from '../src/components/dashboard/DashboardSkeleton';

import {
  useTopStats,
  useSystemStatus,
  useLiveOperations,
  useFinancialOverview,
  useTeamPerformance,
  useBankHealth,
  useCoinPosition,
  useRiskSummary,
  usePriorityAlerts,
  useActivityFeed,
} from '../src/hooks/useDashboardData';

export default function DashboardPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // React Query Hooks
  const { data: topStats, isLoading: isLoadingTopStats } = useTopStats();
  const { data: systemStatus, isLoading: isLoadingSystem } = useSystemStatus();
  const { data: liveOps, isLoading: isLoadingLiveOps } = useLiveOperations();
  const { data: financial, isLoading: isLoadingFinancial } = useFinancialOverview();
  const { data: team, isLoading: isLoadingTeam } = useTeamPerformance();
  const { data: bankHealth, isLoading: isLoadingBankHealth } = useBankHealth();
  const { data: coinPosition, isLoading: isLoadingCoin } = useCoinPosition();
  const { data: riskSummary, isLoading: isLoadingRisk } = useRiskSummary();
  const { data: priorityAlerts, isLoading: isLoadingAlerts } = usePriorityAlerts();
  const { data: activityFeed, isLoading: isLoadingActivity } = useActivityFeed();

  const isInitialLoading =
    isLoadingTopStats ||
    isLoadingSystem ||
    isLoadingLiveOps ||
    isLoadingFinancial ||
    isLoadingTeam ||
    isLoadingBankHealth ||
    isLoadingCoin ||
    isLoadingRisk ||
    isLoadingAlerts ||
    isLoadingActivity;

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900 font-sans antialiased">
      {/* 1. Left Sidebar (Fixed desktop / Drawer mobile) */}
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Header Component */}
          <DashboardHeader
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />

          {isInitialLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* Section 3: Top Stat Row — 5 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {topStats?.map((item) => (
                  <TopStatCard key={item.id} item={item} />
                ))}
                {systemStatus && <SystemStatusCard data={systemStatus} />}
              </div>

              {/* Section 4: Operations Quick Tools */}
              <QuickToolsBar />

              {/* Section 5: Three-Card Row #1 — Live Operations / Financial Overview / Team Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {liveOps && <SectionCard data={liveOps} />}
                {financial && <SectionCard data={financial} />}
                {team && <SectionCard data={team} />}
              </div>

              {/* Section 6: Three-Card Row #2 — Bank Health / Coin Position / Risk & Discrepancy */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {bankHealth && <SectionCard data={bankHealth} />}
                {coinPosition && <SectionCard data={coinPosition} />}
                {riskSummary && <SectionCard data={riskSummary} />}
              </div>

              {/* Section 7: Bottom Row — Priority Alerts (~40%) + Live Activity Feed (~60%) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
                <div className="lg:col-span-2">
                  <PriorityAlertsCard data={priorityAlerts} />
                </div>
                <div className="lg:col-span-3">
                  <LiveActivityFeed activities={activityFeed} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
