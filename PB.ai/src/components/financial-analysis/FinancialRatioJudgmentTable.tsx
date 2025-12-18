import type { RatioJudgmentRow } from '@/lib/types/company';
import { cn } from '@/lib/utils';
import { formatValue } from '@/lib/utils/format';

interface FinancialRatioJudgmentTableProps {
  data: RatioJudgmentRow[];
  className?: string;
}

export function FinancialRatioJudgmentTable({
  data,
  className,
}: FinancialRatioJudgmentTableProps) {
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
            {data.map((item, index) => (
              <tr
                key={index}
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
                  {formatValue(item.stability)}
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  {formatValue(item.leverage)}
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  {formatValue(item.investmentProfitability)}
                </td>
                <td
                  colSpan={1}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  {formatValue(item.salesMargin)}
                </td>
                <td
                  colSpan={2}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  {formatValue(item.activity)}
                </td>
                <td
                  colSpan={2}
                  className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  {formatValue(item.growth)}
                </td>
              </tr>
            ))}
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
