import { Check } from 'lucide-react';

type HealthStatus = '안전' | '위험' | '경고';

interface HealthCategory {
  label: '유동성' | '레버리지' | '투자수익성' | '판매마진' | '활동성' | '성장성';
  status: HealthStatus;
}

interface FinancialHealthProps {
  scoreValue?: number; // -1 ~ 1 사이의 값, 기본값: 0.855
  healthCategories?: HealthCategory[];
  hideTitle?: boolean; // 제목 숨김 여부
  onDetailClick?: () => void; // 상세보기 버튼 클릭 핸들러
}

export const FinancialHealth = ({
  scoreValue = 0.855,
  healthCategories = [
    { label: '유동성', status: '안전' },
    { label: '레버리지', status: '안전' },
    { label: '투자수익성', status: '안전' },
    { label: '판매마진', status: '안전' },
    { label: '활동성', status: '안전' },
    { label: '성장성', status: '안전' },
  ],
  hideTitle = false,
  onDetailClick,
}: FinancialHealthProps) => {
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
        {/* Dynamic description - mock data */}
        <p className="text-[17px] text-[#191B1C] leading-[1.5] font-normal">
          농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다
        </p>

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
        <div className="flex items-center justify-between leading-[0]">
          {healthCategories.map((category, index) => (
            <div key={index} className="inline-grid grid-cols-[max-content] grid-rows-[max-content] justify-items-start shrink-0">
              <div
                className="col-[1] row-[1] w-[100px] h-[100px] border border-solid"
                style={{ borderColor: getStatusColor(category.status) }}
              />
              <p
                className="col-[1] row-[1] relative text-[15px] text-[#191B1C] font-normal leading-[1.5] whitespace-nowrap"
                style={{
                  marginLeft: category.label === '유동성' ? '31px' :
                              category.label === '레버리지' ? '23.8px' :
                              category.label === '투자수익성' ? '17.2px' :
                              category.label === '판매마진' ? '23.8px' :
                              category.label === '활동성' ? '30.4px' : '31px',
                  marginTop: category.label === '투자수익성' ||
                             category.label === '판매마진' ||
                             category.label === '활동성' ||
                             category.label === '성장성' ? '30px' : '25px'
                }}
              >
                {category.label}
              </p>
              <p
                className="col-[1] row-[1] relative text-[15px] text-[#191B1C] font-normal leading-[1.5] whitespace-nowrap"
                style={{
                  marginLeft: category.label === '유동성' ? '37px' :
                              category.label === '레버리지' ? '36.6px' :
                              category.label === '투자수익성' ? '37.2px' :
                              category.label === '판매마진' ? '36.8px' :
                              category.label === '활동성' ? '37.4px' : '37px',
                  marginTop: category.label === '유동성' ||
                             category.label === '투자수익성' ||
                             category.label === '판매마진' ||
                             category.label === '활동성' ||
                             category.label === '성장성' ? '55px' : '50px'
                }}
              >
                {category.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
