interface CompanyTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: '기업 Overview' },
  { id: 'financial', label: '재무현황분석' },
  { id: 'investment', label: '투자지표' },
  { id: 'valuation', label: '주식가치평가' },
  { id: 'chat', label: '채팅' },
];

export const CompanyTabs = ({ activeTab, onTabChange }: CompanyTabsProps) => {
  return (
    <div className="relative w-full">
      <div className="flex gap-10 items-center border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center justify-center gap-2 h-12 px-0 py-4
              text-[17px] leading-[1.5] transition-colors
              ${
                activeTab === tab.id
                  ? 'text-[#5797F7] border-b-2 border-[#5797F7] font-semibold'
                  : 'text-[#191B1C] font-normal hover:text-[#5797F7]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
