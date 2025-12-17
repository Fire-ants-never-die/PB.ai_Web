import { RevenueChart } from '@/components/charts/RevenueChart';
import { NetIncomeChart } from '@/components/charts/NetIncomeChart';
import { FinancialDataTable, type FinancialYearData } from '@/components/company/FinancialDataTable';
import { FinancialHealth } from '@/components/company/FinancialHealth';
import { FinancialRatioJudgmentTable } from './FinancialRatioJudgmentTable';
import { ExpandableFinancialTable } from './ExpandableFinancialTable';
import { FinancialAnalysisFooter } from './FinancialAnalysisFooter';
import {
  financialRatioJudgmentData,
  liquidityAnalysisData,
  leverageAnalysisData,
  investmentProfitabilityData,
  salesMarginData,
  growthAnalysisData,
  activityAnalysisData,
} from '@/lib/data/mock/financialAnalysisData';

interface FinancialAnalysisTabProps {
  revenueData?: Array<{ year: string; value: number }>;
  netIncomeData?: Array<{ year: string; netIncome: number; netIncomeRate: number }>;
  financialTableData?: FinancialYearData[];
}

export function FinancialAnalysisTab({
  revenueData,
  netIncomeData,
  financialTableData,
}: FinancialAnalysisTabProps) {
  // 기본 Mock 데이터
  const defaultRevenueData = [
    { year: '2021', value: 246800000000 },
    { year: '2022', value: 230500000000 },
    { year: '2023', value: 268900000000 },
    { year: '2024', value: 298400000000 },
    { year: '2025/06', value: 275600000000 },
  ];

  const defaultNetIncomeData = [
    { year: '2021', netIncome: 141500000000, netIncomeRate: 12.5 },
    { year: '2022', netIncome: 123800000000, netIncomeRate: 10.8 },
    { year: '2023', netIncome: 158900000000, netIncomeRate: 18.2 },
    { year: '2024', netIncome: 201300000000, netIncomeRate: 21.4 },
    { year: '2025/06', netIncome: 178200000000, netIncomeRate: 15.2 },
  ];

  const defaultFinancialTableData: FinancialYearData[] = [
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
  ];

  const finalRevenueData = revenueData || defaultRevenueData;
  const finalNetIncomeData = netIncomeData || defaultNetIncomeData;
  const finalFinancialTableData = financialTableData || defaultFinancialTableData;

  return (
    <div className="flex flex-col min-h-screen gap-12 pt-8 pb-0">
      {/* 1. 재무 상황 */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          1. 재무 상황
        </h2>

        {/* 차트 두 개 나란히 배치 */}
        <div className="flex items-start gap-3">
          {/* 왼쪽: 매출액 차트 */}
          <div
            className="flex justify-between items-start"
            style={{
              width: '24.06419rem',
              height: '22.51825rem',
              padding: '0.45813rem 0.61081rem 0.45813rem 0.07638rem'
            }}
          >
            <RevenueChart
              data={finalRevenueData}
              className="w-full h-full"
            />
          </div>

          {/* 오른쪽: 순이익&순이익률 차트 */}
          <div
            className="flex justify-between items-start"
            style={{
              width: '24.06419rem',
              height: '22.51825rem',
              padding: '0.45813rem 0.61081rem 0.45813rem 0.07638rem'
            }}
          >
            <NetIncomeChart
              data={finalNetIncomeData}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 재무 데이터 표 */}
        <div className="mt-6">
          <FinancialDataTable data={finalFinancialTableData} />
        </div>
      </div>

      {/* 2. 재무 비율 판정 */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          2. 재무 비율 판정
        </h2>
        <FinancialHealth hideTitle={true} />

        {/* 재무 비율 판정 표 */}
        <div className="mt-6">
          <FinancialRatioJudgmentTable data={financialRatioJudgmentData} />
        </div>
      </div>

      {/* 3. 안정성 분석 */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          3. 안정성 분석
        </h2>

        {/* 3.1. 유동성 분석 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-[#191B1C]">
            {liquidityAnalysisData.title}
          </h3>
          <ExpandableFinancialTable items={liquidityAnalysisData.items} />
        </div>

        {/* 3.2. 레버리지 분석 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-[#191B1C]">
            {leverageAnalysisData.title}
          </h3>
          <ExpandableFinancialTable items={leverageAnalysisData.items} />
        </div>
      </div>

      {/* 4. 수익성 분석 */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          4. 수익성 분석
        </h2>

        {/* 4.1. 투자수익성 분석 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-[#191B1C]">
            {investmentProfitabilityData.title}
          </h3>
          <ExpandableFinancialTable items={investmentProfitabilityData.items} />
        </div>

        {/* 4.2. 판매마진 분석 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-[#191B1C]">
            {salesMarginData.title}
          </h3>
          <ExpandableFinancialTable items={salesMarginData.items} />
        </div>
      </div>

      {/* 5. 성장성 분석 */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          5. 성장성 분석
        </h2>
        <ExpandableFinancialTable items={growthAnalysisData.items} />
      </div>

      {/* 6. 활동성 분석 */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          6. 활동성 분석
        </h2>
        <ExpandableFinancialTable items={activityAnalysisData.items} />
      </div>

      {/* Footer */}
      <FinancialAnalysisFooter />
    </div>
  );
}
