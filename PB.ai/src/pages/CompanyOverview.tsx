import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import { FinancialAnalysisTab } from '@/components/financial-analysis/FinancialAnalysisTab';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';

const CompanyOverview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const companyCode = searchParams.get('code');
  const companyName = searchParams.get('name') || '농심'; // 기본값은 농심

  // 회사 코드가 없으면 메인 페이지로 리다이렉트
  useEffect(() => {
    if (!companyCode) {
      navigate('/');
    }
  }, [companyCode, navigate]);

  // API 호출 (실제로는 백엔드에서 재무제표 데이터를 받아옴)
  // TODO: 받은 데이터를 실제로 사용하도록 구현 필요
  // const { data: financialStatements } = useFinancialStatements(companyCode || '', 'annual');
  // const { data: balanceSheets } = useBalanceSheets(companyCode || '', 'annual');

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
          <div className="flex flex-col gap-12">
            <CompanyProfile />
            <SalesComposition />

            {/* 새로운 재무 현황 섹션 */}
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
                3. 재무 현황
              </h2>

              {/* 차트 두 개 나란히 배치 */}
              <div className="flex items-start gap-3 min-w-0">
                {/* 왼쪽: 매출액 차트 */}
                <div
                  className="flex justify-between items-start"
                  style={{
                    width: '24.06419rem',
                    height: '22.51825rem',
                    padding: '0.45813rem 0.61081rem 0.45813rem 0.07638rem',
                    minWidth: 0,
                    minHeight: '200px',
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
                    padding: '0.45813rem 0.61081rem 0.45813rem 0.07638rem',
                    minWidth: 0,
                    minHeight: '200px',
                  }}
                >
                  <NetIncomeChart
                    data={netIncomeData}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* 재무 데이터 표 */}
              <div className="mt-6">
                <FinancialDataTable data={financialTableData} />
              </div>
            </div>

            <FinancialHealth onDetailClick={() => setActiveTab('financial')} />
            <IndustryDescription />
          </div>
        );
      case 'financial':
        return (
          <FinancialAnalysisTab
            revenueData={revenueData}
            netIncomeData={netIncomeData}
            financialTableData={financialTableData}
          />
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

  // 회사 코드가 없으면 아무것도 렌더링하지 않음
  if (!companyCode) {
    return null;
  }

  return (
    <PageLayout title="">
      <div className="max-w-[920px] mx-auto">
        {/* 로고 이미지 - CompanyTabs 바로 위에 왼쪽 정렬 */}
        <div className="mb-6">
          <img
            src="/nongshim_title.png"
            alt="로고"
            className="h-auto"
            style={{ maxHeight: '60px' }}
          />
        </div>
        <CompanyTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Chat Window */}
      <ChatWindow
        activeTab={activeTab}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        companyName={companyName}
      />

      {/* Floating Chat Button */}
      <FloatingActionButton onClick={() => setIsChatOpen(true)} />
    </PageLayout>
  );
};

export default CompanyOverview;
