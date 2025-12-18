// React Query Hooks for Company Data
import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanyProfile,
  fetchSalesComposition,
  fetchFinancialOverview,
  fetchFinancialHealth,
  fetchIndustryDescription,
  fetchFinancialRatioJudgment,
  fetchFinancialAnalysisDetails,
} from '../companyApi';

// Mock data fallback (백엔드가 준비되기 전까지 사용)
import { companyProfileData } from '@/lib/data/mock/tableData';
import {
  financialRatioJudgmentData,
  liquidityAnalysisData,
  leverageAnalysisData,
  investmentProfitabilityData,
  salesMarginData,
  growthAnalysisData,
  activityAnalysisData,
} from '@/lib/data/mock/financialAnalysisData';

// 환경변수가 'false'가 아니면 Mock 사용 (기본값: true)
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

// 1.1. 기업 프로필
export const useCompanyProfile = (companyCode: string) => {
  return useQuery({
    queryKey: ['companyProfile', companyCode],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Mock 데이터를 API 응답 형식으로 변환
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          companyCode,
          companyName: '농심',
          profile: companyProfileData.rows,
        };
      }
      return fetchCompanyProfile(companyCode);
    },
    enabled: !!companyCode,
  });
};

// 1.2. 매출 산업 구성
export const useSalesComposition = (companyCode: string) => {
  return useQuery({
    queryKey: ['salesComposition', companyCode],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          totalRevenue: '34,387억',
          totalRevenueRaw: 3438700000000,
          items: [
            { name: '라면', value: 81.8, percentage: '81.8%', color: '#5797F7' },
            { name: '기타', value: 18.4, percentage: '18.4%', color: '#FFA353' },
            { name: '스낵', value: 14.4, percentage: '14.4%', color: '#8DD3BB' },
            { name: '매출 에누리등', value: 14.5, percentage: '-14.5%', color: '#FFD666' },
          ],
        };
      }
      return fetchSalesComposition(companyCode);
    },
    enabled: !!companyCode,
  });
};

// 1.3. 재무 현황
export const useFinancialOverview = (
  companyCode: string,
  periodType: 'annual' | 'quarterly' = 'annual'
) => {
  return useQuery({
    queryKey: ['financialOverview', companyCode, periodType],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
          revenueChart: [
            { year: '2021', value: 246800000000 },
            { year: '2022', value: 230500000000 },
            { year: '2023', value: 268900000000 },
            { year: '2024', value: 298400000000 },
            { year: '2025/06', value: 275600000000 },
          ],
          netIncomeChart: [
            { year: '2021', netIncome: 141500000000, netIncomeRate: 12.5 },
            { year: '2022', netIncome: 123800000000, netIncomeRate: 10.8 },
            { year: '2023', netIncome: 158900000000, netIncomeRate: 18.2 },
            { year: '2024', netIncome: 201300000000, netIncomeRate: 21.4 },
            { year: '2025/06', netIncome: 178200000000, netIncomeRate: 15.2 },
          ],
          financialTable: [
            {
              year: '2020.12',
              revenue: 246800000000,
              totalAssets: 1890000000000,
              totalLiabilities: 645000000000,
              totalEquity: 1245000000000,
              operatingIncome: 168500000000,
              netIncome: 141500000000,
            },
            {
              year: '2021.12',
              revenue: 230500000000,
              totalAssets: 1950000000000,
              totalLiabilities: 678000000000,
              totalEquity: 1272000000000,
              operatingIncome: 145300000000,
              netIncome: 123800000000,
            },
            {
              year: '2022.12',
              revenue: 268900000000,
              totalAssets: 2120000000000,
              totalLiabilities: 712000000000,
              totalEquity: 1408000000000,
              operatingIncome: 189400000000,
              netIncome: 158900000000,
            },
            {
              year: '2023.12',
              revenue: 298400000000,
              totalAssets: 2340000000000,
              totalLiabilities: 756000000000,
              totalEquity: 1584000000000,
              operatingIncome: 234500000000,
              netIncome: 201300000000,
            },
            {
              year: '2024.12',
              revenue: 340000000000,
              totalAssets: 35974000000000,
              totalLiabilities: 9248000000000,
              totalEquity: 26725000000000,
              operatingIncome: 163000000000,
              netIncome: 157600000000,
            },
          ],
        };
      }
      return fetchFinancialOverview(companyCode, periodType);
    },
    enabled: !!companyCode,
  });
};

// 1.4. 재무건전성
export const useFinancialHealth = (companyCode: string) => {
  return useQuery({
    queryKey: ['financialHealth', companyCode],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          description: '농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다',
          scoreValue: 0.855,
          scoreRange: {
            min: -1,
            max: 1,
            thresholds: [-1, -0.5, 0, 0.5, 1],
          },
          healthCategories: [
            { label: '유동성' as const, status: '안전' as const },
            { label: '레버리지' as const, status: '안전' as const },
            { label: '투자수익성' as const, status: '안전' as const },
            { label: '판매마진' as const, status: '안전' as const },
            { label: '활동성' as const, status: '안전' as const },
            { label: '성장성' as const, status: '안전' as const },
          ],
        };
      }
      return fetchFinancialHealth(companyCode);
    },
    enabled: !!companyCode,
  });
};

// 1.5. 산업 설명
export const useIndustryDescription = (companyCode: string) => {
  return useQuery({
    queryKey: ['industryDescription', companyCode],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          items: [
            { label: '산업명', value: '식료품 제조업(C10)' },
            { label: '평가기준일', value: '2025.06' },
            { label: '산업평가 종합등급', value: '2(양호)' },
          ],
        };
      }
      return fetchIndustryDescription(companyCode);
    },
    enabled: !!companyCode,
  });
};

// 2.2. 재무 비율 판정
export const useFinancialRatioJudgment = (companyCode: string) => {
  return useQuery({
    queryKey: ['financialRatioJudgment', companyCode],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
          financialHealth: {
            scoreValue: 0.855,
            scoreRange: {
              min: -1,
              max: 1,
              thresholds: [-1, -0.5, 0, 0.5, 1],
            },
            healthCategories: [
              { label: '유동성' as const, status: '안전' as const },
              { label: '레버리지' as const, status: '안전' as const },
              { label: '투자수익성' as const, status: '안전' as const },
              { label: '판매마진' as const, status: '안전' as const },
              { label: '활동성' as const, status: '안전' as const },
              { label: '성장성' as const, status: '안전' as const },
            ],
          },
          ratioJudgmentTable: financialRatioJudgmentData.map(row => ({
            indicator: row.indicator,
            stability: row.stability,
            leverage: row.leverage,
            investmentProfitability: row.investmentProfitability,
            salesMargin: row.salesMargin,
            activity: row.activity,
            growth: row.growth,
          })),
        };
      }
      return fetchFinancialRatioJudgment(companyCode);
    },
    enabled: !!companyCode,
  });
};

// 2.3. 안정성/수익성/성장성/활동성 분석
export const useFinancialAnalysisDetails = (companyCode: string) => {
  return useQuery({
    queryKey: ['financialAnalysisDetails', companyCode],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          sections: [
            {
              id: 'stability' as const,
              title: '3. 안정성 분석',
              subsections: [
                {
                  title: liquidityAnalysisData.title,
                  tableHeaders: [
                    { key: 'indicator', label: '' },
                    { key: 'year2023', label: '2023' },
                    { key: 'timeSeriesAverage', label: '시계열평균' },
                    { key: 'industryMedian', label: '업종중위수' },
                    { key: 'timeSeriesScore', label: '시계열점수' },
                    { key: 'industryScore', label: '업종점수' },
                  ],
                  items: liquidityAnalysisData.items,
                },
                {
                  title: leverageAnalysisData.title,
                  tableHeaders: [
                    { key: 'indicator', label: '' },
                    { key: 'year2023', label: '2023' },
                    { key: 'timeSeriesAverage', label: '시계열평균' },
                    { key: 'industryMedian', label: '업종중위수' },
                    { key: 'timeSeriesScore', label: '시계열점수' },
                    { key: 'industryScore', label: '업종점수' },
                  ],
                  items: leverageAnalysisData.items,
                },
              ],
            },
            {
              id: 'profitability' as const,
              title: '4. 수익성 분석',
              subsections: [
                {
                  title: investmentProfitabilityData.title,
                  tableHeaders: [
                    { key: 'indicator', label: '' },
                    { key: 'year2023', label: '2023' },
                    { key: 'timeSeriesAverage', label: '시계열평균' },
                    { key: 'industryMedian', label: '업종중위수' },
                    { key: 'timeSeriesScore', label: '시계열점수' },
                    { key: 'industryScore', label: '업종점수' },
                  ],
                  items: investmentProfitabilityData.items,
                },
                {
                  title: salesMarginData.title,
                  tableHeaders: [
                    { key: 'indicator', label: '' },
                    { key: 'year2023', label: '2023' },
                    { key: 'timeSeriesAverage', label: '시계열평균' },
                    { key: 'industryMedian', label: '업종중위수' },
                    { key: 'timeSeriesScore', label: '시계열점수' },
                    { key: 'industryScore', label: '업종점수' },
                  ],
                  items: salesMarginData.items,
                },
              ],
            },
            {
              id: 'growth' as const,
              title: '5. 성장성 분석',
              subsections: [
                {
                  title: '',
                  tableHeaders: [
                    { key: 'indicator', label: '' },
                    { key: 'year2023', label: '2023' },
                    { key: 'timeSeriesAverage', label: '시계열평균' },
                    { key: 'industryMedian', label: '업종중위수' },
                    { key: 'timeSeriesScore', label: '시계열점수' },
                    { key: 'industryScore', label: '업종점수' },
                  ],
                  items: growthAnalysisData.items,
                },
              ],
            },
            {
              id: 'activity' as const,
              title: '6. 활동성 분석',
              subsections: [
                {
                  title: '',
                  tableHeaders: [
                    { key: 'indicator', label: '' },
                    { key: 'year2023', label: '2023' },
                    { key: 'timeSeriesAverage', label: '시계열평균' },
                    { key: 'industryMedian', label: '업종중위수' },
                    { key: 'timeSeriesScore', label: '시계열점수' },
                    { key: 'industryScore', label: '업종점수' },
                  ],
                  items: activityAnalysisData.items,
                },
              ],
            },
          ],
        };
      }
      return fetchFinancialAnalysisDetails(companyCode);
    },
    enabled: !!companyCode,
  });
};
