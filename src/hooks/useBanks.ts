import { useQuery } from '@tanstack/react-query';
import { INITIAL_BANKS, calculateBankSummary } from '../fixtures/mockBanks';
import { BankFilterState, BankResponse } from '../types/bank';
import { useBankStore } from '../store/useBankStore';

async function fetchBanks(filters: BankFilterState, customBanks: typeof INITIAL_BANKS | null): Promise<BankResponse> {
  // Simulate network latency (250ms) for realistic loading shimmer experience
  await new Promise((resolve) => setTimeout(resolve, 250));

  const dataset = customBanks || INITIAL_BANKS;

  let filtered = [...dataset];

  // 1. Search filter (label, bank name, account number)
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (b) =>
        b.label.toLowerCase().includes(q) ||
        b.bankName.toLowerCase().includes(q) ||
        b.accountNumber.includes(q) ||
        b.accountLabel.toLowerCase().includes(q)
    );
  }

  // 2. Status filter
  if (filters.status !== 'ALL') {
    filtered = filtered.filter((b) => b.status === filters.status);
  }

  // 3. Assignment filter
  if (filters.assignment === 'ASSIGNED') {
    filtered = filtered.filter((b) => !b.isUnassignedOrTL);
  } else if (filters.assignment === 'UNASSIGNED') {
    filtered = filtered.filter((b) => b.isUnassignedOrTL);
  }

  // 4. Declaration filter
  if (filters.declaration !== 'ALL') {
    filtered = filtered.filter((b) => b.declarationState === filters.declaration);
  }

  const total = filtered.length;
  const summary = calculateBankSummary(dataset);

  // Pagination
  const page = Math.max(1, filters.page);
  const pageSize = Math.max(1, filters.pageSize);
  const totalPages = Math.ceil(total / pageSize) || 1;
  
  const startIndex = (page - 1) * pageSize;
  const paginatedBanks = filtered.slice(startIndex, startIndex + pageSize);

  return {
    banks: paginatedBanks,
    total,
    summary,
    page,
    pageSize,
    totalPages,
  };
}

export function useBanks() {
  const filters = useBankStore((state) => state.filters);
  const localBanks = useBankStore((state) => state.localBanks);

  return useQuery({
    queryKey: ['banks', filters, localBanks],
    queryFn: () => fetchBanks(filters, localBanks),
    placeholderData: (previousData) => previousData,
  });
}
