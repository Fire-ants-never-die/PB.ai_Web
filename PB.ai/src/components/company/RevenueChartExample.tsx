import { RevenueChart } from './RevenueChart';

export const RevenueChartExample = () => {
  // API로부터 받을 데이터 예시
  const revenueData = {
    "2021": 1900000000000,  // 1.9조
    "2022": 2200000000000,  // 2.2조
    "2023": 2800000000000,  // 2.8조
    "2024": 2700000000000,  // 2.7조
    "2025/06": 2400000000000, // 2.4조 (2025년 6월까지)
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        2. 연도별 매출액
      </h2>
      <RevenueChart data={revenueData} />
    </div>
  );
};
