import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, formatCurrencyKorean, formatWithPercentage } from '@/lib/utils/format';
import type { TableHeader } from '@/lib/types/company';

interface ExpandableFinancialTableProps {
  items: any[]; // FinancialRatioItem과 호환되도록 any 사용
  headers: TableHeader[];
  className?: string;
}

export function ExpandableFinancialTable({
  items,
  headers,
  className,
}: ExpandableFinancialTableProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  // 텍스트를 16자 단위로 줄바꿈하는 함수
  const formatLongText = (text: string): React.ReactNode => {
    if (text.length <= 16) {
      return text;
    }

    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += 16) {
      chunks.push(text.slice(i, i + 16));
    }

    return (
      <>
        {chunks.map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk}
            {index < chunks.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  const renderRow = (item: any, level: number = 0, parentKey: string = '') => {
    const isExpanded = expandedItems.has(item.name);
    const hasChildren = item.children && item.children.length > 0;
    const rowKey = parentKey ? `${parentKey}-${item.name}` : item.name;

    return (
      <React.Fragment key={rowKey}>
        <tr
          className="group transition-colors hover:bg-[#F5F5F6]"
          style={{ borderBottom: '1px solid #D7D9DB' }}
        >
          <td
            className="px-4 py-3 text-[0.875rem] font-semibold text-[#191B1C] leading-[150%] text-left"
            style={{
              fontFamily: 'var(--typography-type, "Pretendard GOV")',
              paddingLeft: level > 0 ? `${16 + level * 24}px` : '16px',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{formatLongText(item.name)}</span>
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(item.name)}
                  className="flex items-center justify-center w-4 h-4 hover:opacity-70 transition-opacity -mt-0.5 flex-shrink-0"
                  aria-label={isExpanded ? '축소' : '확장'}
                >
                  {isExpanded ? (
                    <img src="/minus_square.svg" alt="축소" className="w-4 h-4" />
                  ) : (
                    <img src="/square.svg" alt="확장" className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </td>
          {headers.slice(1).map((header) => {
            const value = item.values[header.key];

            // 하위항목인지 확인 (level > 0이면 하위항목)
            const isChildItem = level > 0;
            // 시계열점수, 업종점수는 %를 붙이지 않음
            const isScoreColumn = header.key === 'timeSeriesScore' || header.key === 'industryScore';
            // 시계열 평균은 소수점 2자리까지만 표시
            const isTimeSeriesAverage = header.key === 'timeSeriesAverage';

            let displayValue: string;

            if (value === null || value === undefined || value === '') {
              displayValue = '-';
            } else if (isChildItem) {
              // 하위항목: ￦ 기호와 조/억 단위로 포맷팅
              displayValue = formatCurrencyKorean(value);
            } else if (isScoreColumn) {
              // 시계열점수, 업종점수: 숫자만 표시 (%, ￦ 없음)
              displayValue = formatNumber(value);
            } else if (isTimeSeriesAverage) {
              // 시계열 평균: 소수점 2자리까지만 표시하고 % 추가
              const numValue = typeof value === 'string'
                ? parseFloat(value.replace(/,/g, '').replace('%', ''))
                : value;
              if (isNaN(numValue)) {
                displayValue = '-';
              } else {
                displayValue = `${numValue.toFixed(2)}%`;
              }
            } else {
              // 상위항목: % 기호 추가
              displayValue = formatWithPercentage(value);
            }

            return (
              <td
                key={header.key}
                className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                {displayValue}
              </td>
            );
          })}
        </tr>
        {hasChildren && isExpanded && item.children && (
          <>
            {item.children.map((child: any) => renderRow(child, level + 1, rowKey))}
          </>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="relative w-full overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#FCFCFD]" style={{ borderBottom: '1px solid #D7D9DB' }}>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                  style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => renderRow(item))}
          </tbody>
        </table>

        {/* 데이터가 없을 때 */}
        {items.length === 0 && (
          <div className="flex h-24 items-center justify-center text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
