import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Tab = 'overview' | 'financials' | 'indicators' | 'valuation' | 'chat';

interface ChatWidgetState {
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
}

interface AppState {
  // Sidebar state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Active tab
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;

  // Chat widget state
  chatWidget: ChatWidgetState;
  toggleChatWidget: () => void;
  minimizeChatWidget: () => void;
  setChatWidgetPosition: (position: { x: number; y: number }) => void;
  closeChatWidget: () => void;

  // Selected stock
  selectedStock: string | null;
  setSelectedStock: (code: string | null) => void;

  // Period type for financial data
  periodType: 'annual' | 'quarterly';
  setPeriodType: (type: 'annual' | 'quarterly') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Sidebar state
      isSidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),

      // Active tab
      activeTab: 'overview',
      setActiveTab: (tab: Tab) => set({ activeTab: tab }),

      // Chat widget state
      chatWidget: {
        isOpen: false,
        isMinimized: false,
        position: { x: 20, y: 20 }, // Default position (bottom-right offset)
      },
      toggleChatWidget: () =>
        set((state) => ({
          chatWidget: {
            ...state.chatWidget,
            isOpen: !state.chatWidget.isOpen,
            isMinimized: false,
          },
        })),
      minimizeChatWidget: () =>
        set((state) => ({
          chatWidget: {
            ...state.chatWidget,
            isMinimized: !state.chatWidget.isMinimized,
          },
        })),
      setChatWidgetPosition: (position: { x: number; y: number }) =>
        set((state) => ({
          chatWidget: {
            ...state.chatWidget,
            position,
          },
        })),
      closeChatWidget: () =>
        set((state) => ({
          chatWidget: {
            ...state.chatWidget,
            isOpen: false,
            isMinimized: false,
          },
        })),

      // Selected stock
      selectedStock: null,
      setSelectedStock: (code: string | null) => set({ selectedStock: code }),

      // Period type
      periodType: 'annual',
      setPeriodType: (type: 'annual' | 'quarterly') =>
        set({ periodType: type }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        chatWidget: state.chatWidget,
        selectedStock: state.selectedStock,
        periodType: state.periodType,
      }),
    }
  )
);
