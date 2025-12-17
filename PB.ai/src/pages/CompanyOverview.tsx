import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CompanyTabs } from '@/components/company/CompanyTabs';
import { CompanyProfile } from '@/components/company/CompanyProfile';
import { SalesComposition } from '@/components/company/SalesComposition';
import { FinancialHealth } from '@/components/company/FinancialHealth';
import { IndustryDescription } from '@/components/company/IndustryDescription';
import { RevenueChartExample } from '@/components/company/RevenueChartExample';
import { FinancialTable } from '@/components/company/FinancialTable';

const CompanyOverview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="flex flex-col gap-12 py-8">
            <CompanyProfile />
            <RevenueChartExample />
            <SalesComposition />

            {/* 새로운 재무 상태 표 */}
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
                3. 재무 상태
              </h2>
              <FinancialTable />
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
