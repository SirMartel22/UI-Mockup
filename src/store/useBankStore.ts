import { create } from 'zustand';
import { Bank, BankFilterState, BankStatus, DeclarationStatus } from '../types/bank';

interface BankStore {
  // Filters state
  filters: BankFilterState;
  setSearch: (search: string) => void;
  setStatusFilter: (status: 'ALL' | BankStatus) => void;
  setAssignmentFilter: (assignment: 'ALL' | 'ASSIGNED' | 'UNASSIGNED') => void;
  setDeclarationFilter: (declaration: 'ALL' | DeclarationStatus) => void;
  setDateRange: (range: { from: string; to: string }) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;

  // UI Modal & Drawer states
  isAddBankOpen: boolean;
  setAddBankOpen: (open: boolean) => void;

  isAdvancedFiltersOpen: boolean;
  setAdvancedFiltersOpen: (open: boolean) => void;

  selectedBank: Bank | null;
  setSelectedBank: (bank: Bank | null) => void;

  // Dynamic status/data management for adding/editing banks locally
  localBanks: Bank[] | null;
  setLocalBanks: (banks: Bank[]) => void;
  addBank: (bank: Bank) => void;
}

const initialFilters: BankFilterState = {
  search: '',
  status: 'ALL',
  assignment: 'ALL',
  declaration: 'ALL',
  dateRange: {
    from: 'May 1, 2025',
    to: 'May 31, 2025',
  },
  page: 1,
  pageSize: 6,
};

export const useBankStore = create<BankStore>((set) => ({
  filters: initialFilters,

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search, page: 1 },
    })),

  setStatusFilter: (status) =>
    set((state) => ({
      filters: { ...state.filters, status, page: 1 },
    })),

  setAssignmentFilter: (assignment) =>
    set((state) => ({
      filters: { ...state.filters, assignment, page: 1 },
    })),

  setDeclarationFilter: (declaration) =>
    set((state) => ({
      filters: { ...state.filters, declaration, page: 1 },
    })),

  setDateRange: (dateRange) =>
    set((state) => ({
      filters: { ...state.filters, dateRange },
    })),

  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),

  setPageSize: (pageSize) =>
    set((state) => ({
      filters: { ...state.filters, pageSize, page: 1 },
    })),

  resetFilters: () =>
    set(() => ({
      filters: initialFilters,
    })),

  // Modals & Drawers
  isAddBankOpen: false,
  setAddBankOpen: (isAddBankOpen) => set({ isAddBankOpen }),

  isAdvancedFiltersOpen: false,
  setAdvancedFiltersOpen: (isAdvancedFiltersOpen) => set({ isAdvancedFiltersOpen }),

  selectedBank: null,
  setSelectedBank: (selectedBank) => set({ selectedBank }),

  localBanks: null,
  setLocalBanks: (localBanks) => set({ localBanks }),
  addBank: (newBank) =>
    set((state) => ({
      localBanks: state.localBanks ? [newBank, ...state.localBanks] : [newBank],
    })),
}));
