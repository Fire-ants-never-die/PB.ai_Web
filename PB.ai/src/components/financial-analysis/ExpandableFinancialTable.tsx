import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatValue, formatNumber } from '@/lib/utils/format';
import type { FinancialRatioItem, TableHeader } from '@/lib/types/company';

interface ExpandableFinancialTableProps {
  items: FinancialRatioItem[];
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
          {headers.slice(1).map((header) => {
            const value = item.values[header.key];
            const displayValue = typeof value === 'number'
              ? formatNumber(value)
              : formatValue(value);

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
