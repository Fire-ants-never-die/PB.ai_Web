import { TAB_LABELS } from '@/lib/data/static';
import { Button } from '@/components/ui/button';

type Tab = 'overview' | 'financials' | 'indicators' | 'valuation' | 'chat';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: TAB_LABELS.overview },
    { id: 'financials', label: TAB_LABELS.financials },
    { id: 'indicators', label: TAB_LABELS.indicators },
    { id: 'valuation', label: TAB_LABELS.valuation },
    { id: 'chat', label: TAB_LABELS.chat },
  ];

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`rounded-none border-b-2 px-4 py-3 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
