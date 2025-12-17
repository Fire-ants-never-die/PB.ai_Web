import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { FinancialRatioItem } from '@/lib/data/mock/financialAnalysisData';

interface ExpandableFinancialTableProps {
  items: FinancialRatioItem[];
  className?: string;
}

export function ExpandableFinancialTable({
  items,
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

  const renderRow = (item: FinancialRatioItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.name);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <>
        <tr
          key={item.name}
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
              <span className="font-semibold">{item.name}</span>
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(item.name)}
                  className="flex items-center justify-center w-4 h-4 hover:opacity-70 transition-opacity -mt-0.5"
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
          <td
            className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
            style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
          >
            {typeof item.values.year2023 === 'number'
              ? item.values.year2023.toLocaleString('ko-KR')
              : item.values.year2023}
          </td>
          <td
            className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
            style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
          >
            {typeof item.values.timeSeriesAverage === 'number'
              ? item.values.timeSeriesAverage.toLocaleString('ko-KR')
              : item.values.timeSeriesAverage}
          </td>
          <td
            className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
            style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
          >
            {typeof item.values.industryMedian === 'number'
              ? item.values.industryMedian.toLocaleString('ko-KR')
              : item.values.industryMedian}
          </td>
          <td
            className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
            style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
          >
            {item.values.timeSeriesScore}
          </td>
          <td
            className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%] text-center"
            style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
          >
            {item.values.industryScore}
          </td>
        </tr>
        {hasChildren && isExpanded && item.children && (
          <>
            {item.children.map((child) => (
              <React.Fragment key={child.name}>
                {renderRow(child, level + 1)}
              </React.Fragment>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="relative w-full overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#FCFCFD]" style={{ borderBottom: '1px solid #D7D9DB' }}>
              <th
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                {/* 첫 번째 컬럼은 비어있음 */}
              </th>
              <th
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                2023
              </th>
              <th
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                시계열평균
              </th>
              <th
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                업종중위수
              </th>
              <th
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                시계열점수
              </th>
              <th
                className="px-4 py-3 text-center text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
              >
                업종점수
              </th>
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
