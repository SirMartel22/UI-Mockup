'use client';

import React, { useState } from 'react';
import { Landmark, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import Sidebar from '../src/components/layout/Sidebar';
import TopBar from '../src/components/layout/TopBar';
import PageHeader from '../src/components/banks/PageHeader';
import StatCard from '../src/components/banks/StatCard';
import FilterBar from '../src/components/banks/FilterBar';
import BanksTable from '../src/components/banks/BanksTable';
import Pagination from '../src/components/banks/Pagination';
import LiquidityOverviewCard from '../src/components/banks/LiquidityOverviewCard';
import QuickActionsCard from '../src/components/banks/QuickActionsCard';
import AddBankModal from '../src/components/modals/AddBankModal';
import BankDetailModal from '../src/components/modals/BankDetailModal';
import AdvancedFilterDrawer from '../src/components/modals/AdvancedFilterDrawer';
import { useBanks } from '../src/hooks/useBanks';
import { useBankStore } from '../src/store/useBankStore';

export default function BanksDashboardPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useBanks();

  const filters = useBankStore((state) => state.filters);
  const setStatusFilter = useBankStore((state) => state.setStatusFilter);

  const summary = data?.summary || {
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
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      {/* 1. Left Sidebar (Fixed desktop / Drawer mobile) */}
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Bar */}
        <TopBar onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* 3. Dashboard Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Page Header */}
          <PageHeader />

          {/* Stat Cards Row (4 equal columns grid across full width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Total Banks */}
            <StatCard
              label="Total Banks"
              count={summary.totalBanks}
              caption="All registered banks"
              icon={Landmark}
              iconBgColor="bg-blue-50"
              iconColor="text-blue-600"
              isActive={filters.status === 'ALL'}
              onClick={() => setStatusFilter('ALL')}
            />

            {/* Stat 2: In Use */}
            <StatCard
              label="In Use"
              count={summary.inUseCount}
              percentage={summary.inUsePercentage}
              caption="Active in operations"
              icon={CheckCircle2}
              iconBgColor="bg-emerald-50"
              iconColor="text-emerald-600"
              badgeBgColor="bg-emerald-100"
              badgeTextColor="text-emerald-800"
              isActive={filters.status === 'In Use'}
              onClick={() => setStatusFilter('In Use')}
            />

            {/* Stat 3: Pending Assignment */}
            <StatCard
              label="Pending Assignment"
              count={summary.pendingCount}
              percentage={summary.pendingPercentage}
              caption="Awaiting payer assignment"
              icon={Clock}
              iconBgColor="bg-amber-50"
              iconColor="text-amber-600"
              badgeBgColor="bg-amber-100"
              badgeTextColor="text-amber-800"
              isActive={filters.status === 'Pending'}
              onClick={() => setStatusFilter('Pending')}
            />

            {/* Stat 4: Mismatches */}
            <StatCard
              label="Mismatches"
              count={summary.mismatchCount}
              percentage={summary.mismatchPercentage}
              caption="Require attention"
              icon={AlertTriangle}
              iconBgColor="bg-red-50"
              iconColor="text-red-600"
              badgeBgColor="bg-red-100"
              badgeTextColor="text-red-800"
              isActive={filters.status === 'Mismatch'}
              onClick={() => setStatusFilter('Mismatch')}
            />
          </div>

          {/* Filter & Search Bar */}
          <FilterBar />

          {/* Main Data & Secondary Column Section */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            {/* Main Table + Pagination (Spans 3 columns on desktop) */}
            <div className="xl:col-span-3 space-y-4 min-w-0">
              <BanksTable
                banks={data?.banks || []}
                isLoading={isLoading}
                isError={isError}
                onRetry={() => refetch()}
              />

              <Pagination
                total={data?.total ?? 24}
                page={data?.page ?? 1}
                pageSize={data?.pageSize ?? 6}
                totalPages={data?.totalPages ?? 4}
              />
            </div>

            {/* Right Analytics Side Panel (Stacks below on md/sm, side column on xl) */}
            <div className="xl:col-span-1 space-y-6">
              <LiquidityOverviewCard summary={summary} />
              <QuickActionsCard />
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Modals & Drawers */}
      <AddBankModal />
      <BankDetailModal />
      <AdvancedFilterDrawer />
    </div>
  );
}
