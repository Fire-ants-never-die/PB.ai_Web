import { Check } from 'lucide-react';
import { useFinancialHealth } from '@/lib/api/hooks/useCompanyData';

type HealthStatus = '안전' | '위험' | '경고';

interface FinancialHealthProps {
  companyCode: string;
  hideTitle?: boolean; // 제목 숨김 여부
  hideDescription?: boolean; // 설명 숨김 여부 (재무현황분석 페이지용)
  onDetailClick?: () => void; // 상세보기 버튼 클릭 핸들러
}

export const FinancialHealth = ({
  companyCode,
  hideTitle = false,
  hideDescription = false,
  onDetailClick,
}: FinancialHealthProps) => {
  const { data, isLoading, isError } = useFinancialHealth(companyCode);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {!hideTitle && (
          <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
            4. 재무건전성
          </h2>
        )}
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {!hideTitle && (
          <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
            4. 재무건전성
          </h2>
        )}
        <div className="flex items-center justify-center h-48">
          <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  const { scoreValue, healthCategories, description } = data;
  // 상태별 색상 매핑
  const getStatusColor = (status: HealthStatus): string => {
    switch (status) {
      case '안전':
        return '#0042FB'; // typography/safe/500
      case '위험':
        return '#EB0E0E'; // color/danger/500
      case '경고':
        return '#F59E0B'; // color/warning/600
      default:
        return '#0042FB';
    }
  };

  const scorePosition = ((scoreValue + 1) / 2) * 100; // Convert -1~1 to 0~100%

  return (
    <div className="flex flex-col gap-2 w-full">
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
            4. 재무건전성
          </h2>
          <button
            onClick={onDetailClick}
            className="flex items-center gap-2 text-[12px] text-[#4D76D4] hover:underline"
          >
            <Check className="w-4 h-4" />
            재무 건정성 상세하게 알아보기
          </button>
        </div>
      )}

      <div
        className="flex flex-col gap-8 rounded-2xl bg-white w-full"
        style={{
          backdropFilter: 'blur(4px)',
          padding: '2rem 2rem 1rem 2rem',
          minHeight: 0,
        }}
      >
        {/* Dynamic description */}
        {!hideDescription && (
          <p className="text-[17px] text-[#191B1C] leading-[1.5] font-normal">
            {description}
          </p>
        )}

        {/* Score bar */}
        <div className="relative pt-8 pb-6">
          <div className="relative h-[5px] flex">
            <div className="h-full bg-[#EB0E0E]" style={{ width: '25%' }} />
            <div className="h-full bg-[#FFA353]" style={{ width: '48%' }} />
            <div className="h-full bg-[#0042FB]" style={{ width: '27%' }} />
          </div>

          {/* Score labels */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-between text-[15px] text-[#191B1C] font-normal">
            <span className="translate-x-0">-1</span>
            <span className="translate-x-3">-0.5</span>
            <span className="translate-x-0">0</span>
            <span className="translate-x-0">0.5</span>
            <span className="translate-x-0">1</span>
          </div>

          {/* Current score indicator */}
          <div
            className="absolute -top-6 transform -translate-x-1/2"
            style={{ left: `${scorePosition}%` }}
          >
            <p className="text-[15px] text-[#191B1C] font-normal text-center mb-1">{scoreValue}</p>
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-[#0042FB]" />
          </div>
        </div>

        {/* Health categories */}
        <div className="flex flex-wrap items-center justify-between gap-4 leading-none">
          {healthCategories.map((category, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-[100px] h-[100px] border border-solid rounded-md shrink-0"
              style={{ borderColor: getStatusColor(category.status) }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-[15px] text-[#191B1C] font-semibold leading-[1.4] whitespace-nowrap">
                  {category.label}
                </p>
                <p className="text-[15px] text-[#191B1C] font-normal leading-[1.4] whitespace-nowrap">
                  {category.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
