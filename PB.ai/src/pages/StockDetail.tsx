import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { useCompanyInfo } from '@/lib/api/hooks';
import { Sidebar as StockSidebar } from '@/components/stock-detail/Sidebar';
import { CompanyHeader } from '@/components/stock-detail/CompanyHeader';
import { TabNavigation } from '@/components/stock-detail/TabNavigation';
import { OverviewTab } from '@/components/stock-detail/tabs/OverviewTab';
import { FinancialsTab } from '@/components/stock-detail/tabs/FinancialsTab';
import { IndicatorsTab } from '@/components/stock-detail/tabs/IndicatorsTab';
import { ValuationTab } from '@/components/stock-detail/tabs/ValuationTab';
import { ChatTab } from '@/components/stock-detail/tabs/ChatTab';
import { FloatingChatWidget } from '@/components/stock-detail/FloatingChatWidget';
import { Skeleton } from '@/components/ui/skeleton';

export default function StockDetail() {
  const { code } = useParams<{ code: string }>();
  const { activeTab, setActiveTab, setSelectedStock } = useAppStore();
  const { data: companyInfo, isLoading, isError } = useCompanyInfo(code || '');

  // Set selected stock when component mounts
  React.useEffect(() => {
    if (code) {
      setSelectedStock(code);
    }
    return () => setSelectedStock(null);
  }, [code, setSelectedStock]);

  if (!code) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">종목 코드가 제공되지 않았습니다.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <StockSidebar />

      {/* Main Content - Always Centered */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Company Header */}
        <div className="border-b bg-background">
          {isLoading ? (
            <div className="container mx-auto px-4 py-6">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
          ) : (
            <CompanyHeader companyInfo={companyInfo!} />
          )}
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {activeTab === 'overview' && <OverviewTab code={code} />}
            {activeTab === 'financials' && <FinancialsTab code={code} />}
            {activeTab === 'indicators' && <IndicatorsTab code={code} />}
            {activeTab === 'valuation' && <ValuationTab code={code} />}
            {activeTab === 'chat' && <ChatTab code={code} />}
          </div>
        </div>
      </div>

      {/* Floating Chat Widget - Only show on tabs 1-4, not on chat tab */}
      {activeTab !== 'chat' && <FloatingChatWidget />}
    </div>
  );
}
