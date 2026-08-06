import { create } from 'zustand';

interface DashboardState {
  isAssignmentPaused: boolean;
  isMorningShift: boolean;
  isClockedOut: boolean;
  lastSyncSeconds: number;
  activeShiftCount: number;
  warningAlertCount: number;
  bellNotificationCount: number;
  isAccountMenuOpen: boolean;
  
  // Actions
  togglePauseAssignment: () => void;
  toggleMorningShift: () => void;
  clockOut: () => void;
  resetSyncTimer: () => void;
  incrementSyncTimer: () => void;
  toggleAccountMenu: () => void;
  closeAccountMenu: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isAssignmentPaused: false,
  isMorningShift: true,
  isClockedOut: false,
  lastSyncSeconds: 0,
  activeShiftCount: 0,
  warningAlertCount: 2,
  bellNotificationCount: 3,
  isAccountMenuOpen: false,

  togglePauseAssignment: () =>
    set((state) => ({ isAssignmentPaused: !state.isAssignmentPaused })),

  toggleMorningShift: () =>
    set((state) => ({
      isMorningShift: !state.isMorningShift,
      isClockedOut: false,
    })),

  clockOut: () =>
    set((state) => ({
      isClockedOut: !state.isClockedOut,
      isMorningShift: state.isClockedOut ? true : false,
    })),

  resetSyncTimer: () => set({ lastSyncSeconds: 0 }),
  incrementSyncTimer: () =>
    set((state) => ({ lastSyncSeconds: state.lastSyncSeconds + 1 })),

  toggleAccountMenu: () =>
    set((state) => ({ isAccountMenuOpen: !state.isAccountMenuOpen })),
  closeAccountMenu: () => set({ isAccountMenuOpen: false }),
}));
