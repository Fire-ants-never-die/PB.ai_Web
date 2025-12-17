// Custom hooks for fetching stock data
// These hooks return mock data now, but can be easily switched to API calls

import { useQuery } from '@tanstack/react-query';
import {
  mockCompanyInfo,
  mockStockPrices,
  mockRevenueData,
  mockFinancialStatements,
  mockBalanceSheets,
  mockCashFlowStatements,
  mockPerShareMetrics,
  mockMultiples,
  mockOwnershipStructure,
  mockProfitabilityRatios,
  mockGrowthMetrics,
  mockStabilityMetrics,
  mockActivityMetrics,
  mockValuationIndicators,
  mockChatHistory,
} from '@/lib/data/mock';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Company Information Hook
export const useCompanyInfo = (code: string) => {
  return useQuery({
    queryKey: ['companyInfo', code],
    queryFn: async () => {
      await delay(300);
      return mockCompanyInfo;
    },
  });
};

// Stock Prices Hook (for charts)
export const useStockPrices = (code: string, period: '1M' | '3M' | '6M' | '1Y' | '3Y' | 'ALL' = 'ALL') => {
  return useQuery({
    queryKey: ['stockPrices', code, period],
    queryFn: async () => {
      await delay(500);
      return mockStockPrices;
    },
  });
};

// Revenue Data Hook (for bar charts)
export const useRevenueData = (code: string) => {
  return useQuery({
    queryKey: ['revenueData', code],
    queryFn: async () => {
      await delay(400);
      return mockRevenueData;
    },
  });
};

// Financial Statements Hook
export const useFinancialStatements = (code: string, type: 'annual' | 'quarterly' = 'annual') => {
  return useQuery({
    queryKey: ['financialStatements', code, type],
    queryFn: async () => {
      await delay(400);
      return mockFinancialStatements;
    },
  });
};

// Balance Sheets Hook
export const useBalanceSheets = (code: string, type: 'annual' | 'quarterly' = 'annual') => {
  return useQuery({
    queryKey: ['balanceSheets', code, type],
    queryFn: async () => {
      await delay(400);
      return mockBalanceSheets;
    },
  });
};

// Cash Flow Statements Hook
export const useCashFlowStatements = (code: string, type: 'annual' | 'quarterly' = 'annual') => {
  return useQuery({
    queryKey: ['cashFlowStatements', code, type],
    queryFn: async () => {
      await delay(400);
      return mockCashFlowStatements;
    },
  });
};

// Per Share Metrics Hook
export const usePerShareMetrics = (code: string, type: 'annual' | 'quarterly' = 'annual') => {
  return useQuery({
    queryKey: ['perShareMetrics', code, type],
    queryFn: async () => {
      await delay(400);
      return mockPerShareMetrics;
    },
  });
};

// Multiples Hook
export const useMultiples = (code: string, type: 'annual' | 'quarterly' = 'annual') => {
  return useQuery({
    queryKey: ['multiples', code, type],
    queryFn: async () => {
      await delay(400);
      return mockMultiples;
    },
  });
};

// Ownership Structure Hook
export const useOwnershipStructure = (code: string) => {
  return useQuery({
    queryKey: ['ownershipStructure', code],
    queryFn: async () => {
      await delay(300);
      return mockOwnershipStructure;
    },
  });
};

// Profitability Ratios Hook
export const useProfitabilityRatios = (code: string) => {
  return useQuery({
    queryKey: ['profitabilityRatios', code],
    queryFn: async () => {
      await delay(400);
      return mockProfitabilityRatios;
    },
  });
};

// Growth Metrics Hook
export const useGrowthMetrics = (code: string) => {
  return useQuery({
    queryKey: ['growthMetrics', code],
    queryFn: async () => {
      await delay(400);
      return mockGrowthMetrics;
    },
  });
};

// Stability Metrics Hook
export const useStabilityMetrics = (code: string) => {
  return useQuery({
    queryKey: ['stabilityMetrics', code],
    queryFn: async () => {
      await delay(400);
      return mockStabilityMetrics;
    },
  });
};

// Activity Metrics Hook
export const useActivityMetrics = (code: string) => {
  return useQuery({
    queryKey: ['activityMetrics', code],
    queryFn: async () => {
      await delay(400);
      return mockActivityMetrics;
    },
  });
};

// Valuation Indicators Hook
export const useValuationIndicators = (code: string) => {
  return useQuery({
    queryKey: ['valuationIndicators', code],
    queryFn: async () => {
      await delay(400);
      return mockValuationIndicators;
    },
  });
};

// Chat History Hook
export const useChatHistory = (code: string) => {
  return useQuery({
    queryKey: ['chatHistory', code],
    queryFn: async () => {
      await delay(300);
      return mockChatHistory;
    },
  });
};

// All Data Hook (for initial load)
export const useAllStockData = (code: string) => {
  const companyInfo = useCompanyInfo(code);
  const stockPrices = useStockPrices(code);
  const revenueData = useRevenueData(code);
  const financialStatements = useFinancialStatements(code);
  const balanceSheets = useBalanceSheets(code);
  const cashFlowStatements = useCashFlowStatements(code);

  return {
    companyInfo,
    stockPrices,
    revenueData,
    financialStatements,
    balanceSheets,
    cashFlowStatements,
    isLoading:
      companyInfo.isLoading ||
      stockPrices.isLoading ||
      revenueData.isLoading ||
      financialStatements.isLoading ||
      balanceSheets.isLoading ||
      cashFlowStatements.isLoading,
    isError:
      companyInfo.isError ||
      stockPrices.isError ||
      revenueData.isError ||
      financialStatements.isError ||
      balanceSheets.isError ||
      cashFlowStatements.isError,
  };
};
