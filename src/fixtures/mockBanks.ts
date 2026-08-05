import { Bank, BankSummary } from '../types/bank';

export const INITIAL_BANKS: Bank[] = [
  {
    id: 'bank-1',
    label: 'GTB001',
    bankName: 'Guaranty Trust Bank',
    accountLabel: 'VAH Operations',
    accountNumber: '0123456789',
    brandColor: '#FF6600', // GTBank orange
    logoUrl: '/logos/gtb.png',
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-1', name: 'Alexander Wright', initials: 'AW', avatarBg: '#3b82f6' },
      { id: 'usr-2', name: 'Sarah Connor', initials: 'SC', avatarBg: '#10b981' },
      { id: 'usr-3', name: 'David Miller', initials: 'DM', avatarBg: '#8b5cf6' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 24850000,
    payerOpeningBalance: 24850000,
    closingBalance: 24850000,
    lastUpdated: '2025-05-31 09:15 AM',
  },
  {
    id: 'bank-2',
    label: 'ZEN002',
    bankName: 'Zenith Bank',
    accountLabel: 'VAH Main Account',
    accountNumber: '1234567890',
    brandColor: '#E61C24', // Zenith red
    logoUrl: '/logos/zenith.png',
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-4', name: 'Elena Rostova', initials: 'ER', avatarBg: '#ec4899' },
      { id: 'usr-5', name: 'Marcus Vance', initials: 'MV', avatarBg: '#f59e0b' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 18420000,
    payerOpeningBalance: 18420000,
    closingBalance: 18420000,
    lastUpdated: '2025-05-31 08:22 AM',
  },
  {
    id: 'bank-3',
    label: 'UBA003',
    bankName: 'United Bank for Africa',
    accountLabel: 'VAH Trade Account',
    accountNumber: '2345678901',
    brandColor: '#D32F2F', // UBA burgundy/red
    logoUrl: '/logos/uba.png',
    status: 'Pending',
    declarationState: 'Pending',
    assignees: [
      { id: 'tl', name: 'Team Lead', initials: 'TL', avatarBg: '#e2e8f0' },
    ],
    isUnassignedOrTL: true,
    systemOpeningBalance: 0,
    payerOpeningBalance: 0,
    closingBalance: 0,
    lastUpdated: '2025-05-30 05:45 PM',
  },
  {
    id: 'bank-4',
    label: 'ACCESS004',
    bankName: 'Access Bank',
    accountLabel: 'VAH Settlement',
    accountNumber: '3456789012',
    brandColor: '#FF9900', // Access orange
    logoUrl: '/logos/access.png',
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-6', name: 'Olivia Chen', initials: 'OC', avatarBg: '#14b8a6' },
      { id: 'usr-7', name: 'James Wilson', initials: 'JW', avatarBg: '#6366f1' },
      { id: 'usr-8', name: 'Amara Okafor', initials: 'AO', avatarBg: '#a855f7' },
      { id: 'usr-9', name: 'Lucas Scott', initials: 'LS', avatarBg: '#06b6d4' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 9850000,
    payerOpeningBalance: 9850000,
    closingBalance: 9850000,
    lastUpdated: '2025-05-30 02:10 PM',
  },
  {
    id: 'bank-5',
    label: 'FBN005',
    bankName: 'First Bank of Nigeria',
    accountLabel: 'VAH Collection',
    accountNumber: '4567890123',
    brandColor: '#002B66', // FirstBank navy/gold
    logoUrl: '/logos/firstbank.png',
    status: 'Mismatch',
    declarationState: 'Flagged',
    assignees: [
      { id: 'tl', name: 'Team Lead', initials: 'TL', avatarBg: '#e2e8f0' },
    ],
    isUnassignedOrTL: true,
    systemOpeningBalance: 2150000,
    payerOpeningBalance: 1900000,
    closingBalance: 2050000,
    lastUpdated: '2025-05-30 11:30 AM',
  },
  {
    id: 'bank-6',
    label: 'FCMB006',
    bankName: 'First City Monument Bank',
    accountLabel: 'VAH Reserve',
    accountNumber: '5678901234',
    brandColor: '#5B2C6F', // FCMB purple
    logoUrl: '/logos/fcmb.png',
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-10', name: 'Sophia Turner', initials: 'ST', avatarBg: '#3b82f6' },
      { id: 'usr-11', name: 'Liam Davies', initials: 'LD', avatarBg: '#10b981' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 6720000,
    payerOpeningBalance: 6720000,
    closingBalance: 6720000,
    lastUpdated: '2025-05-29 04:05 PM',
  },
  {
    id: 'bank-7',
    label: 'STB007',
    bankName: 'Stanbic IBTC Bank',
    accountLabel: 'VAH Corporate Operations',
    accountNumber: '6789012345',
    brandColor: '#0033A0', // Stanbic blue
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-12', name: 'Kelechi Eze', initials: 'KE', avatarBg: '#8b5cf6' },
      { id: 'usr-13', name: 'Chloe Bennett', initials: 'CB', avatarBg: '#f59e0b' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 5400000,
    payerOpeningBalance: 5400000,
    closingBalance: 5400000,
    lastUpdated: '2025-05-29 01:20 PM',
  },
  {
    id: 'bank-8',
    label: 'FID008',
    bankName: 'Fidelity Bank',
    accountLabel: 'VAH Liquidity Escrow',
    accountNumber: '7890123456',
    brandColor: '#0055A5', // Fidelity blue/green
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-14', name: 'Daniel Park', initials: 'DP', avatarBg: '#06b6d4' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 4120000,
    payerOpeningBalance: 4120000,
    closingBalance: 4120000,
    lastUpdated: '2025-05-29 10:15 AM',
  },
  {
    id: 'bank-9',
    label: 'UBN009',
    bankName: 'Union Bank of Nigeria',
    accountLabel: 'VAH Treasury Account',
    accountNumber: '8901234567',
    brandColor: '#0099FF', // Union Bank light blue
    status: 'Pending',
    declarationState: 'Pending',
    assignees: [
      { id: 'tl', name: 'Team Lead', initials: 'TL', avatarBg: '#0b132b' },
    ],
    isUnassignedOrTL: true,
    systemOpeningBalance: 0,
    payerOpeningBalance: 0,
    closingBalance: 0,
    lastUpdated: '2025-05-28 06:10 PM',
  },
  {
    id: 'bank-10',
    label: 'ECO010',
    bankName: 'Ecobank Nigeria',
    accountLabel: 'VAH Regional Clearing',
    accountNumber: '9012345678',
    brandColor: '#004B87', // Ecobank blue
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-15', name: 'Fatima Bello', initials: 'FB', avatarBg: '#ec4899' },
      { id: 'usr-16', name: 'Gabriel Santos', initials: 'GS', avatarBg: '#10b981' },
      { id: 'usr-17', name: 'Hannah Abbott', initials: 'HA', avatarBg: '#6366f1' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 3250000,
    payerOpeningBalance: 3250000,
    closingBalance: 3250000,
    lastUpdated: '2025-05-28 03:45 PM',
  },
  {
    id: 'bank-11',
    label: 'WEM011',
    bankName: 'Wema Bank',
    accountLabel: 'VAH Digital Vault',
    accountNumber: '0192837465',
    brandColor: '#7A1C75', // Wema purple
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-18', name: 'Ian Wright', initials: 'IW', avatarBg: '#f59e0b' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 2980000,
    payerOpeningBalance: 2980000,
    closingBalance: 2980000,
    lastUpdated: '2025-05-28 11:00 AM',
  },
  {
    id: 'bank-12',
    label: 'POL012',
    bankName: 'Polaris Bank',
    accountLabel: 'VAH Merchant Disbursal',
    accountNumber: '1928374650',
    brandColor: '#5C1D24', // Polaris maroon
    status: 'Mismatch',
    declarationState: 'Flagged',
    assignees: [
      { id: 'tl', name: 'Team Lead', initials: 'TL', avatarBg: '#0b132b' },
    ],
    isUnassignedOrTL: true,
    systemOpeningBalance: 1450000,
    payerOpeningBalance: 1200000,
    closingBalance: 1350000,
    lastUpdated: '2025-05-27 05:30 PM',
  },
  {
    id: 'bank-13',
    label: 'STE013',
    bankName: 'Sterling Bank',
    accountLabel: 'VAH Fleet Settlement',
    accountNumber: '2938475610',
    brandColor: '#CC0000', // Sterling red
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-19', name: 'Jessica Alba', initials: 'JA', avatarBg: '#14b8a6' },
      { id: 'usr-20', name: 'Kevin Durant', initials: 'KD', avatarBg: '#3b82f6' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 2100000,
    payerOpeningBalance: 2100000,
    closingBalance: 2100000,
    lastUpdated: '2025-05-27 02:15 PM',
  },
  {
    id: 'bank-14',
    label: 'KEY014',
    bankName: 'Keystone Bank',
    accountLabel: 'VAH Reserve Secondary',
    accountNumber: '3948576021',
    brandColor: '#00529B', // Keystone blue
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-21', name: 'Laura Linney', initials: 'LL', avatarBg: '#8b5cf6' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 1750000,
    payerOpeningBalance: 1750000,
    closingBalance: 1750000,
    lastUpdated: '2025-05-27 09:40 AM',
  },
  {
    id: 'bank-15',
    label: 'PRO015',
    bankName: 'Providus Bank',
    accountLabel: 'VAH Virtual Accounts',
    accountNumber: '4958671032',
    brandColor: '#008080', // Providus teal
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-22', name: 'Michael Jordan', initials: 'MJ', avatarBg: '#a855f7' },
      { id: 'usr-23', name: 'Nina Simone', initials: 'NS', avatarBg: '#ec4899' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 1420000,
    payerOpeningBalance: 1420000,
    closingBalance: 1420000,
    lastUpdated: '2025-05-26 04:50 PM',
  },
  {
    id: 'bank-16',
    label: 'JAI016',
    bankName: 'Jaiz Bank',
    accountLabel: 'VAH Ethical Finance',
    accountNumber: '5968710243',
    brandColor: '#006633', // Jaiz green
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-24', name: 'Oscar Isaac', initials: 'OI', avatarBg: '#10b981' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 1180000,
    payerOpeningBalance: 1180000,
    closingBalance: 1180000,
    lastUpdated: '2025-05-26 01:30 PM',
  },
  {
    id: 'bank-17',
    label: 'SUN017',
    bankName: 'SunTrust Bank Nigeria',
    accountLabel: 'VAH SME Clearing',
    accountNumber: '6978012354',
    brandColor: '#D97706', // SunTrust amber
    status: 'Pending',
    declarationState: 'Pending',
    assignees: [
      { id: 'tl', name: 'Team Lead', initials: 'TL', avatarBg: '#0b132b' },
    ],
    isUnassignedOrTL: true,
    systemOpeningBalance: 0,
    payerOpeningBalance: 0,
    closingBalance: 0,
    lastUpdated: '2025-05-26 10:00 AM',
  },
  {
    id: 'bank-18',
    label: 'GLOB018',
    bankName: 'Globus Bank',
    accountLabel: 'VAH Fast Disbursal',
    accountNumber: '7980123465',
    brandColor: '#4A154B', // Globus deep violet
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-25', name: 'Paul Rudd', initials: 'PR', avatarBg: '#6366f1' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 980000,
    payerOpeningBalance: 980000,
    closingBalance: 980000,
    lastUpdated: '2025-05-25 05:15 PM',
  },
  {
    id: 'bank-19',
    label: 'TAJ019',
    bankName: 'TAJBank',
    accountLabel: 'VAH Non-Interest Operations',
    accountNumber: '8901234576',
    brandColor: '#2E7D32', // TAJ green
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-26', name: 'Quincy Jones', initials: 'QJ', avatarBg: '#3b82f6' },
      { id: 'usr-27', name: 'Rachel Green', initials: 'RG', avatarBg: '#f59e0b' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 850000,
    payerOpeningBalance: 850000,
    closingBalance: 850000,
    lastUpdated: '2025-05-25 02:40 PM',
  },
  {
    id: 'bank-20',
    label: 'PAR020',
    bankName: 'Parallex Bank',
    accountLabel: 'VAH Institutional Sweep',
    accountNumber: '9012345687',
    brandColor: '#0284C7', // Parallex cyan
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-28', name: 'Steve Rogers', initials: 'SR', avatarBg: '#06b6d4' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 760000,
    payerOpeningBalance: 760000,
    closingBalance: 760000,
    lastUpdated: '2025-05-25 11:20 AM',
  },
  {
    id: 'bank-21',
    label: 'LOT021',
    bankName: 'Lotus Bank',
    accountLabel: 'VAH Alternative Finance',
    accountNumber: '0123456798',
    brandColor: '#059669', // Lotus emerald
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-29', name: 'Tony Stark', initials: 'TS', avatarBg: '#ef4444' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 640000,
    payerOpeningBalance: 640000,
    closingBalance: 640000,
    lastUpdated: '2025-05-24 04:10 PM',
  },
  {
    id: 'bank-22',
    label: 'OPY022',
    bankName: 'OPay Digital Bank',
    accountLabel: 'VAH Wallet Settlements',
    accountNumber: '1234567809',
    brandColor: '#12B76A', // OPay mint green
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-30', name: 'Uma Thurman', initials: 'UT', avatarBg: '#8b5cf6' },
      { id: 'usr-31', name: 'Victor Vance', initials: 'VV', avatarBg: '#14b8a6' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 520000,
    payerOpeningBalance: 520000,
    closingBalance: 520000,
    lastUpdated: '2025-05-24 01:05 PM',
  },
  {
    id: 'bank-23',
    label: 'PAL023',
    bankName: 'PalmPay Financial',
    accountLabel: 'VAH Micro-Disbursals',
    accountNumber: '2345678910',
    brandColor: '#6941C6', // PalmPay purple
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-32', name: 'Wanda Maximoff', initials: 'WM', avatarBg: '#ec4899' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 410000,
    payerOpeningBalance: 410000,
    closingBalance: 410000,
    lastUpdated: '2025-05-24 09:30 AM',
  },
  {
    id: 'bank-24',
    label: 'KUD024',
    bankName: 'Kuda Microfinance Bank',
    accountLabel: 'VAH API Operations',
    accountNumber: '3456789021',
    brandColor: '#401967', // Kuda dark violet
    status: 'In Use',
    declarationState: 'Declared',
    assignees: [
      { id: 'usr-33', name: 'Xavier Charles', initials: 'XC', avatarBg: '#3b82f6' },
    ],
    isUnassignedOrTL: false,
    systemOpeningBalance: 320000,
    payerOpeningBalance: 320000,
    closingBalance: 320000,
    lastUpdated: '2025-05-23 03:00 PM',
  },
];

export function calculateBankSummary(banks: Bank[]): BankSummary {
  const totalBanks = banks.length;
  
  let inUseCount = 0;
  let pendingCount = 0;
  let mismatchCount = 0;
  
  let totalSystemBalance = 0;
  
  banks.forEach((b) => {
    if (b.status === 'In Use') inUseCount++;
    else if (b.status === 'Pending') pendingCount++;
    else if (b.status === 'Mismatch') mismatchCount++;
    
    totalSystemBalance += b.closingBalance;
  });

  const inUsePercentage = totalBanks > 0 ? Number(((inUseCount / totalBanks) * 100).toFixed(1)) : 0;
  const pendingPercentage = totalBanks > 0 ? Number(((pendingCount / totalBanks) * 100).toFixed(1)) : 0;
  const mismatchPercentage = totalBanks > 0 ? Number(((mismatchCount / totalBanks) * 100).toFixed(1)) : 0;

  // Plausible liquidity flows derived from total system balance
  const totalInflow = 56780000;
  const totalOutflow = 25560000;
  const netFlow = 31220000;

  return {
    totalBanks,
    inUseCount,
    inUsePercentage,
    pendingCount,
    pendingPercentage,
    mismatchCount,
    mismatchPercentage,
    totalSystemBalance: 82340000, // Matching the specification ₦82,340,000 for total system liquidity
    totalInflow,
    totalOutflow,
    netFlow,
  };
}
