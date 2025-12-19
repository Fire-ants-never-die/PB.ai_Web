// API 호출 함수들
import type {
  CompanyProfile,
  SalesComposition,
  FinancialOverview,
  FinancialHealth,
  IndustryDescription,
  FinancialRatioJudgment,
  FinancialAnalysisDetails,
} from '@/lib/types/company';

const API_BASE_URL = (() => {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const trimmed = base.replace(/\/+$/, '');
  return trimmed.endsWith('/api/v1') ? trimmed : `${trimmed}/api/v1`;
})();

// API 호출 헬퍼 함수
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API 호출 실패');
  }

  return response.json();
}

// 1.1. 기업 프로필
export async function fetchCompanyProfile(companyCode: string): Promise<CompanyProfile> {
  return fetchApi<CompanyProfile>(`/companies/${companyCode}/profile`);
}

// 1.2. 매출 산업 구성
export async function fetchSalesComposition(companyCode: string): Promise<SalesComposition> {
  return fetchApi<SalesComposition>(`/companies/${companyCode}/sales-composition`);
}

// 1.3. 재무 현황
export async function fetchFinancialOverview(
  companyCode: string,
  periodType: 'annual' | 'quarterly' = 'annual'
): Promise<FinancialOverview> {
  return fetchApi<FinancialOverview>(
    `/companies/${companyCode}/financial-overview?periodType=${periodType}`
  );
}

// 1.4. 재무건전성
export async function fetchFinancialHealth(companyCode: string): Promise<FinancialHealth> {
  return fetchApi<FinancialHealth>(`/companies/${companyCode}/financial-health`);
}

// 1.5. 산업 설명
export async function fetchIndustryDescription(companyCode: string): Promise<IndustryDescription> {
  return fetchApi<IndustryDescription>(`/companies/${companyCode}/industry-description`);
}

// 2.2. 재무 비율 판정
export async function fetchFinancialRatioJudgment(companyCode: string): Promise<FinancialRatioJudgment> {
  return fetchApi<FinancialRatioJudgment>(`/companies/${companyCode}/financial-ratio-judgment`);
}

// 2.3. 안정성/수익성/성장성/활동성 분석
export async function fetchFinancialAnalysisDetails(companyCode: string): Promise<FinancialAnalysisDetails> {
  return fetchApi<FinancialAnalysisDetails>(`/companies/${companyCode}/financial-analysis-details`);
}
