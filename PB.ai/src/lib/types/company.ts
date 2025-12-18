// API 명세서에 따른 타입 정의

// 1.1. 기업 프로필
export interface CompanyProfile {
  companyCode: string;
  companyName: string;
  profile: ProfileItem[];
}

export interface ProfileItem {
  label: string;
  value: string;
}

// 1.2. 매출 산업 구성
export interface SalesComposition {
  totalRevenue: string;
  totalRevenueRaw: number;
  items: SalesCompositionItem[];
}

export interface SalesCompositionItem {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

// 1.3. 재무 현황
export interface FinancialOverview {
  revenueChart: RevenueChartItem[];
  netIncomeChart: NetIncomeChartItem[];
  financialTable: FinancialTableRow[];
}

export interface RevenueChartItem {
  year: string;
  value: number;
}

export interface NetIncomeChartItem {
  year: string;
  netIncome: number;
  netIncomeRate: number;
}

export interface FinancialTableRow {
  year: string;
  revenue: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  operatingIncome: number;
  netIncome: number;
}

// 1.4. 재무건전성
export interface FinancialHealth {
  description: string;
  scoreValue: number;
  scoreRange: ScoreRange;
  healthCategories: HealthCategory[];
}

export interface ScoreRange {
  min: number;
  max: number;
  thresholds: number[];
}

export interface HealthCategory {
  label: '유동성' | '레버리지' | '투자수익성' | '판매마진' | '활동성' | '성장성';
  status: '안전' | '경고' | '위험';
}

// 1.5. 산업 설명
export interface IndustryDescription {
  items: IndustryDescriptionItem[];
}

export interface IndustryDescriptionItem {
  label: string;
  value: string;
}

// 2.2. 재무 비율 판정
export interface FinancialRatioJudgment {
  financialHealth: Omit<FinancialHealth, 'description'>; // description 제외
  ratioJudgmentTable: RatioJudgmentRow[];
}

export interface RatioJudgmentRow {
  indicator: string;
  stability: string;
  leverage: string;
  investmentProfitability: string;
  salesMargin: string;
  activity: string;
  growth: string;
}

// 2.3. 안정성/수익성/성장성/활동성 분석
export interface FinancialAnalysisDetails {
  sections: AnalysisSection[];
}

export interface AnalysisSection {
  id: 'stability' | 'profitability' | 'growth' | 'activity';
  title: string;
  subsections: AnalysisSubsection[];
}

export interface AnalysisSubsection {
  title: string;
  tableHeaders: TableHeader[];
  items: FinancialRatioItem[];
}

export interface TableHeader {
  key: string;
  label: string;
}

export interface FinancialRatioItem {
  name: string;
  values: Record<string, string | number>;
  children: FinancialRatioItem[];
}

// 에러 응답
export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}
