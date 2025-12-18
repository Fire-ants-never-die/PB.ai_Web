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
import { FinancialAnalysisTab } from '@/components/financial-analysis/FinancialAnalysisTab';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { useFinancialOverview } from '@/lib/api/hooks/useCompanyData';

const CompanyOverview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const companyCode = searchParams.get('code') || '001234'; // 기본 코드
  const companyName = searchParams.get('name') || '농심'; // 기본값은 농심

  // API 데이터 호출
  const { data: financialData, isLoading } = useFinancialOverview(companyCode);

  // 회사 코드가 없으면 메인 페이지로 리다이렉트
  useEffect(() => {
    if (!companyCode) {
      navigate('/');
    }
  }, [companyCode, navigate]);

  useEffect(() => {
    if (activeTab === 'financial') {
      // 탭 전환 시 항상 페이지 상단으로 이동하여 첫 섹션을 바로 노출
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // 회사 코드에 따른 로고/타이틀 이미지 매핑 (하드코딩)
  const getCompanyAssets = (code: string) => {
    const assetMap: Record<string, { logo: string; title: string }> = {
      '001234': { logo: '/nongshim_logo.svg', title: '/nongshim_title.png' },
      'cj': { logo: '/cj_logo.png', title: '/cj_logo.png' },
      'pb': { logo: '/pb_logo.svg', title: '/pb_logo.svg' },
      // 추가 기업들 매핑
    };
    return assetMap[code] || { logo: '/nongshim_logo.svg', title: '/nongshim_title.png' };
  };

  const companyAssets = getCompanyAssets(companyCode);

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">데이터를 불러오는 중...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="flex flex-col gap-12">
            <CompanyProfile companyCode={companyCode} />
            <SalesComposition companyCode={companyCode} />

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
                    data={financialData?.revenueChart || []}
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
                    data={financialData?.netIncomeChart || []}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* 재무 데이터 표 */}
              <div className="mt-6">
                <FinancialDataTable data={financialData?.financialTable || []} />
              </div>
            </div>

            <FinancialHealth companyCode={companyCode} onDetailClick={() => setActiveTab('financial')} />
            <IndustryDescription companyCode={companyCode} />
          </div>
        );
      case 'financial':
        return <FinancialAnalysisTab companyCode={companyCode} />;
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
        {/* 로고 이미지 - CompanyTabs 바로 위에 왼쪽 정렬 (하드코딩) */}
        <div className="mb-6">
          <img
            src={companyAssets.title}
            alt={`${companyName} 로고`}
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
