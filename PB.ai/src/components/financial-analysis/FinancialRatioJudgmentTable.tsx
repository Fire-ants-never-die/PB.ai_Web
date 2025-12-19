import type { RatioJudgmentRow, HealthCategory } from '@/lib/types/company';
import { cn } from '@/lib/utils';
import { formatValue } from '@/lib/utils/format';

interface FinancialRatioJudgmentTableProps {
  data: RatioJudgmentRow[];
  healthCategories?: HealthCategory[];
  className?: string;
}

export function FinancialRatioJudgmentTable({
  data,
  healthCategories,
  className,
}: FinancialRatioJudgmentTableProps) {
  // 디버깅: 데이터 확인
  console.log('FinancialRatioJudgmentTable - data:', data);
  console.log('FinancialRatioJudgmentTable - healthCategories:', healthCategories);

  // healthCategories를 컬럼별로 매핑
  const getStatusForColumn = (columnName: string): string => {
    if (!healthCategories) return '';

    const mapping: Record<string, string> = {
      stability: '유동성',
      leverage: '레버리지',
      investmentProfitability: '투자수익성',
      salesMargin: '판매마진',
      activity: '활동성',
      growth: '성장성',
    };

    const categoryLabel = mapping[columnName];
    const category = healthCategories.find(cat => cat.label === categoryLabel);
    return category?.status || '';
  };

  // 상태에 따른 색상 반환
  const getStatusColor = (status: string): string => {
    switch (status) {
      case '안전':
        return '#4CAF50'; // 녹색
      case '경고':
        return '#FF9800'; // 주황색
      case '위험':
        return '#F44336'; // 빨간색
      default:
        return '#191B1C';
    }
  };
  return (
    <div className={cn('w-full', className)}>
      <div className="relative w-full overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* 첫 번째 헤더 행 */}
            <tr className="bg-[#FCFCFD]" style={{ borderBottom: '1px solid #D7D9DB' }}>
              <th
                rowSpan={2}
                colSpan={2}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                지표
              </th>
              <th
                rowSpan={1}
                colSpan={2}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                안정성
              </th>
              <th
                rowSpan={1}
                colSpan={2}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                수익성
              </th>
              <th
                rowSpan={2}
                colSpan={2}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                활동성
              </th>
              <th
                rowSpan={2}
                colSpan={2}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                성장성
              </th>
            </tr>
            {/* 두 번째 헤더 행 */}
            <tr className="bg-[#FCFCFD]" style={{ borderBottom: '1px solid #D7D9DB' }}>
              {/* 지표는 rowSpan=2이므로 두 번째 행에 없음 */}
              {/* 안정성 하위 */}
              <th
                colSpan={1}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                유동성
              </th>
              <th
                colSpan={1}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                레버리지
              </th>
              {/* 수익성 하위 */}
              <th
                colSpan={1}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                투자수익성
              </th>
              <th
                colSpan={1}
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                판매마진
              </th>
              {/* 활동성은 rowSpan=2이므로 두 번째 행에 없음 */}
              {/* 성장성은 rowSpan=2이므로 두 번째 행에 없음 */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isJudgmentRow = item.indicator === '지표 판정';
              const isScoreRow = item.indicator === '지표 점수';

              return (
                <tr
                  key={`row-${index}-${item.indicator}`}
                  className="group transition-colors hover:bg-[#F5F5F6]"
                  style={{ borderBottom: '1px solid #D7D9DB' }}
                >
                  <td
                    colSpan={2}
                    className="px-4 py-3 text-[0.875rem] font-semibold text-[#191B1C] leading-[150%] text-left"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {formatValue(item.indicator)}
                  </td>
                  <td
                    colSpan={1}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {isJudgmentRow && healthCategories ? (
                      <div className="flex flex-col items-center gap-1">
                        {item.stability && <span>{formatValue(item.stability)}</span>}
                        <span className="text-[0.875rem] font-normal text-[#191B1C]">
                          {getStatusForColumn('stability')}
                        </span>
                      </div>
                    ) : (
                      formatValue(item.stability)
                    )}
                  </td>
                  <td
                    colSpan={1}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {isJudgmentRow && healthCategories ? (
                      <div className="flex flex-col items-center gap-1">
                        {item.leverage && <span>{formatValue(item.leverage)}</span>}
                        <span className="text-[0.875rem] font-normal text-[#191B1C]">
                          {getStatusForColumn('leverage')}
                        </span>
                      </div>
                    ) : (
                      formatValue(item.leverage)
                    )}
                  </td>
                  <td
                    colSpan={1}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {isJudgmentRow && healthCategories ? (
                      <div className="flex flex-col items-center gap-1">
                        {item.investmentProfitability && <span>{formatValue(item.investmentProfitability)}</span>}
                        <span className="text-[0.875rem] font-normal text-[#191B1C]">
                          {getStatusForColumn('investmentProfitability')}
                        </span>
                      </div>
                    ) : (
                      formatValue(item.investmentProfitability)
                    )}
                  </td>
                  <td
                    colSpan={1}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {isJudgmentRow && healthCategories ? (
                      <div className="flex flex-col items-center gap-1">
                        {item.salesMargin && <span>{formatValue(item.salesMargin)}</span>}
                        <span className="text-[0.875rem] font-normal text-[#191B1C]">
                          {getStatusForColumn('salesMargin')}
                        </span>
                      </div>
                    ) : (
                      formatValue(item.salesMargin)
                    )}
                  </td>
                  <td
                    colSpan={2}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {isJudgmentRow && healthCategories ? (
                      <div className="flex flex-col items-center gap-1">
                        {item.activity && <span>{formatValue(item.activity)}</span>}
                        <span className="text-[0.875rem] font-normal text-[#191B1C]">
                          {getStatusForColumn('activity')}
                        </span>
                      </div>
                    ) : (
                      formatValue(item.activity)
                    )}
                  </td>
                  <td
                    colSpan={2}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {isJudgmentRow && healthCategories ? (
                      <div className="flex flex-col items-center gap-1">
                        {item.growth && <span>{formatValue(item.growth)}</span>}
                        <span className="text-[0.875rem] font-normal text-[#191B1C]">
                          {getStatusForColumn('growth')}
                        </span>
                      </div>
                    ) : (
                      formatValue(item.growth)
                    )}
                  </td>
                </tr>
              );
            })}
            {/* healthCategories가 있지만 "지표 판정" 행이 데이터에 없는 경우, 상태 행 추가 */}
            {healthCategories && !data.find(row => row.indicator === '지표 판정') && (
              <tr
                key="judgment-row-status"
                className="group transition-colors hover:bg-[#F5F5F6]"
                style={{ borderBottom: '1px solid #D7D9DB' }}
              >
                <td
                  colSpan={2}
                  className="px-4 py-3 text-[0.875rem] font-semibold text-[#191B1C] leading-[150%] text-left"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  지표 판정
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[0.875rem] font-normal text-[#191B1C]">
                      {getStatusForColumn('stability')}
                    </span>
                  </div>
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[0.875rem] font-normal text-[#191B1C]">
                      {getStatusForColumn('leverage')}
                    </span>
                  </div>
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[0.875rem] font-normal text-[#191B1C]">
                      {getStatusForColumn('investmentProfitability')}
                    </span>
                  </div>
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[0.875rem] font-normal text-[#191B1C]">
                      {getStatusForColumn('salesMargin')}
                    </span>
                  </div>
                </td>
                <td
                  colSpan={2}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[0.875rem] font-normal text-[#191B1C]">
                      {getStatusForColumn('activity')}
                    </span>
                  </div>
                </td>
                <td
                  colSpan={2}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[0.875rem] font-normal text-[#191B1C]">
                      {getStatusForColumn('growth')}
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 데이터가 없을 때 */}
        {data.length === 0 && (
          <div className="flex h-24 items-center justify-center text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
