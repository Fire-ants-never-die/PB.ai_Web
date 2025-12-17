import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  mockFinancialData,
  fieldLabels,
  type FinancialDataPoint,
} from '@/lib/data/mock/financialTableData';

type YearRange = '1년' | '3년' | '5년';
type Period = '연간' | '반기' | '분기';

export const FinancialTable = () => {
  const [yearRange, setYearRange] = React.useState<YearRange>('5년');
  const [period, setPeriod] = React.useState<Period>('연간');

  // 현재 선택에 따른 데이터 가져오기
  const getCurrentData = (): FinancialDataPoint[] => {
    const rangeMap = {
      '1년': 'oneYear',
      '3년': 'threeYear',
      '5년': 'fiveYear',
    } as const;

    const periodMap = {
      연간: 'annual',
      반기: 'semiAnnual',
      분기: 'quarterly',
    } as const;

    const rangeKey = rangeMap[yearRange];
    const periodKey = periodMap[period];

    return mockFinancialData[rangeKey][periodKey];
  };

  const data = getCurrentData();

  // 테이블 헤더 (년도 + 각 데이터 포인트의 년도)
  const headers = ['항목', ...data.map((d) => d.year)];

  // 테이블 행 데이터
  const rows = [
    {
      label: fieldLabels.revenue,
      values: data.map((d) => d.revenue),
    },
    {
      label: fieldLabels.totalAssets,
      values: data.map((d) => d.totalAssets),
    },
    {
      label: fieldLabels.totalLiabilities,
      values: data.map((d) => d.totalLiabilities),
    },
    {
      label: fieldLabels.totalEquity,
      values: data.map((d) => d.totalEquity),
    },
    {
      label: fieldLabels.operatingIncome,
      values: data.map((d) => d.operatingIncome),
    },
    {
      label: fieldLabels.netIncome,
      values: data.map((d) => d.netIncome),
    },
  ];

  return (
    <div className="w-full">
      {/* 드롭다운 영역 */}
      <div className="mb-6 flex items-center gap-3">
        {/* 왼쪽 드롭다운: 기간 범위 */}
        <Select value={yearRange} onValueChange={(value) => setYearRange(value as YearRange)}>
          <SelectTrigger className="w-[140px] h-[40px] border-gray-300 text-gray-700 hover:border-gray-400 focus:border-gray-500 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1년">1년</SelectItem>
            <SelectItem value="3년">3년</SelectItem>
            <SelectItem value="5년">5년</SelectItem>
          </SelectContent>
        </Select>

        {/* 오른쪽 드롭다운: 주기 */}
        <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
          <SelectTrigger className="w-[140px] h-[40px] border-gray-300 text-gray-700 hover:border-gray-400 focus:border-gray-500 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="연간">연간</SelectItem>
            <SelectItem value="반기">반기</SelectItem>
            <SelectItem value="분기">분기</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 표 영역 */}
      <div className="relative w-full overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          {/* 헤더 */}
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    'px-6 py-4 text-[15px] font-semibold text-gray-700 whitespace-nowrap',
                    index === 0 ? 'text-left w-[140px]' : 'text-right min-w-[160px]'
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* 바디 */}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group border-b border-gray-200 transition-all duration-200 hover:border-gray-300 hover:bg-blue-50/30"
              >
                {/* 항목 라벨 */}
                <td className="px-6 py-4 text-[15px] font-medium text-gray-700 whitespace-nowrap bg-gray-50/50 group-hover:bg-blue-50/50 transition-colors duration-200">
                  {row.label}
                </td>

                {/* 값들 */}
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-[15px] text-gray-700 text-right whitespace-nowrap transition-colors duration-200"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 데이터가 없을 때 */}
        {data.length === 0 && (
          <div className="flex h-32 items-center justify-center text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

