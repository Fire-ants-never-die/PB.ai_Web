import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CompanyTabs } from '@/components/company/CompanyTabs';
import { CompanyProfile } from '@/components/company/CompanyProfile';
import { SalesComposition } from '@/components/company/SalesComposition';
import { FinancialHealth } from '@/components/company/FinancialHealth';
import { IndustryDescription } from '@/components/company/IndustryDescription';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { NetIncomeChart } from '@/components/charts/NetIncomeChart';
import { FinancialDataTable } from '@/components/company/FinancialDataTable';
import type { FinancialYearData } from '@/components/company/FinancialDataTable';

const CompanyOverview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock 데이터 - 실제로는 API에서 받아올 데이터
  const revenueData = [
    { year: '2021', value: 246800000000 },
    { year: '2022', value: 230500000000 },
    { year: '2023', value: 268900000000 },
    { year: '2024', value: 298400000000 },
    { year: '2025/06', value: 275600000000 },
  ];

  const netIncomeData = [
    { year: '2021', netIncome: 141500000000, netIncomeRate: 12.5 },
    { year: '2022', netIncome: 123800000000, netIncomeRate: 10.8 },
    { year: '2023', netIncome: 158900000000, netIncomeRate: 18.2 },
    { year: '2024', netIncome: 201300000000, netIncomeRate: 21.4 },
    { year: '2025/06', netIncome: 178200000000, netIncomeRate: 15.2 },
  ];

  const financialTableData: FinancialYearData[] = [
    {
      year: '2021',
      revenue: 246800000000,
      totalAssets: 1890000000000,
      totalLiabilities: 645000000000,
      totalEquity: 1245000000000,
      operatingIncome: 168500000000,
      netIncome: 141500000000,
    },
    {
      year: '2022',
      revenue: 230500000000,
      totalAssets: 1950000000000,
      totalLiabilities: 678000000000,
      totalEquity: 1272000000000,
      operatingIncome: 145300000000,
      netIncome: 123800000000,
    },
    {
      year: '2023',
      revenue: 268900000000,
      totalAssets: 2120000000000,
      totalLiabilities: 712000000000,
      totalEquity: 1408000000000,
      operatingIncome: 189400000000,
      netIncome: 158900000000,
    },
    {
      year: '2024',
      revenue: 298400000000,
      totalAssets: 2340000000000,
      totalLiabilities: 756000000000,
      totalEquity: 1584000000000,
      operatingIncome: 234500000000,
      netIncome: 201300000000,
    },
    {
      year: '2025/06',
      revenue: 275600000000,
      totalAssets: 2410000000000,
      totalLiabilities: 789000000000,
      totalEquity: 1621000000000,
      operatingIncome: 212800000000,
      netIncome: 178200000000,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="flex flex-col gap-12 py-8">
            <CompanyProfile />
            <SalesComposition />

            {/* 새로운 재무 현황 섹션 */}
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
                3. 재무 현황
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
                    data={revenueData}
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
                    data={netIncomeData}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* 재무 데이터 표 */}
              <div className="mt-1">
                <FinancialDataTable data={financialTableData} />
              </div>
            </div>

            <FinancialHealth />
            <IndustryDescription />
          </div>
        );
      case 'financial':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">재무현황분석 탭 내용 (준비 중)</p>
          </div>
        );
      case 'investment':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">투자지표 탭 내용 (준비 중)</p>
          </div>
        );
      case 'valuation':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">주식가치평가 탭 내용 (준비 중)</p>
          </div>
        );
      case 'chat':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">채팅 탭 내용 (준비 중)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout title="농심">
      <div className="max-w-[920px] mx-auto">
        <CompanyTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </PageLayout>
  );
};

export default CompanyOverview;
