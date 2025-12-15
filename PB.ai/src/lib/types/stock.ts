// Stock Types

export interface CompanyInfo {
  code: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  marketCap: number;
  outstandingShares: number;
}

export interface StockPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface RevenueData {
  year: string;
  revenue: number;
  operatingIncome: number;
  netIncome: number;
}

export interface FinancialStatement {
  period: string;
  revenue: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
  operatingMargin: number;
  netMargin: number;
}

export interface BalanceSheet {
  period: string;
  totalAssets: number;
  currentAssets: number;
  nonCurrentAssets: number;
  totalLiabilities: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  equity: number;
  debtRatio: number;
  currentRatio: number;
}

export interface CashFlowStatement {
  period: string;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  freeCashFlow: number;
  capitalExpenditure: number;
}

export interface PerShareMetrics {
  period: string;
  eps: number;
  bps: number;
  cfps: number;
  sps: number;
  dps: number;
}

export interface Multiples {
  period: string;
  per: number;
  pbr: number;
  psr: number;
  pcr: number;
  evEbitda: number;
  evSales: number;
}

export interface OwnershipStructure {
  category: string;
  percentage: number;
  year: string;
}

export interface ProfitabilityRatio {
  category: string;
  ratio2023: number;
  comparisonYear: number;
  industryAvg: number;
  yearChange: number;
  industryChange: number;
}

export interface GrowthMetric {
  category: string;
  ratio2023: number;
  comparisonYear: number;
  industryAvg: number;
  yearChange: number;
  industryChange: number;
}

export interface StabilityMetric {
  category: string;
  ratio2023: number;
  comparisonYear: number;
  industryAvg: number;
  yearChange: number;
  industryChange: number;
}

export interface ActivityMetric {
  category: string;
  ratio2023: number;
  comparisonYear: number;
  industryAvg: number;
  yearChange: number;
  industryChange: number;
}

export interface ValuationIndicator {
  name: string;
  currentPrice: number;
  fairValue: number;
  range: {
    min: number;
    max: number;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messages: ChatMessage[];
}

export type PeriodType = 'annual' | 'quarterly';

export interface ChartData {
  date: string;
  value: number;
  comparison?: number;
}
