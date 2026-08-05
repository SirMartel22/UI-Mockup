export type BankStatus = 'In Use' | 'Pending' | 'Mismatch';

export type DeclarationStatus = 'Declared' | 'Pending' | 'Flagged';

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  avatarBg?: string;
  avatarUrl?: string;
}

export interface Bank {
  id: string;
  label: string;
  bankName: string;
  accountLabel: string;
  accountNumber: string;
  brandColor: string;
  status: BankStatus;
  declarationState: DeclarationStatus;
  assignees: Assignee[];
  isUnassignedOrTL: boolean;
  systemOpeningBalance: number;
  payerOpeningBalance: number;
  closingBalance: number;
  lastUpdated: string; // ISO String or formatted datetime
  logoUrl?: string;
}

export interface BankFilterState {
  search: string;
  status: 'ALL' | BankStatus;
  assignment: 'ALL' | 'ASSIGNED' | 'UNASSIGNED';
  declaration: 'ALL' | DeclarationStatus;
  dateRange: {
    from: string;
    to: string;
  };
  page: number;
  pageSize: number;
}

export interface BankSummary {
  totalBanks: number;
  inUseCount: number;
  inUsePercentage: number;
  pendingCount: number;
  pendingPercentage: number;
  mismatchCount: number;
  mismatchPercentage: number;
  totalSystemBalance: number;
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
}

export interface BankResponse {
  banks: Bank[];
  total: number;
  summary: BankSummary;
  page: number;
  pageSize: number;
  totalPages: number;
}
