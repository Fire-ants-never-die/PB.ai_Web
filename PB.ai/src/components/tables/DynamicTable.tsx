import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { TableRow } from '@/lib/data/mock/tableData';

export interface DynamicTableProps {
  data: TableRow[];
  columns: ColumnDef<TableRow>[];
  className?: string;
  showDropdown?: boolean;
  dropdownOptions?: string[];
  dropdownLabel?: string;
  onDropdownChange?: (value: string) => void;
  defaultDropdownValue?: string;
}

/**
 * 동적 표 컴포넌트
 * - TanStack Table을 사용한 검증된 표 구현
 * - API로부터 받아올 데이터 구조를 지원
 * - Row hover 시 border-gray-300, 텍스트는 gray-700 유지
 * - 드롭다운 기능 포함
 */
export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  columns,
  className,
  showDropdown = false,
  dropdownOptions = [],
  dropdownLabel,
  onDropdownChange,
  defaultDropdownValue,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    defaultDropdownValue || dropdownOptions[0] || ''
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
    onDropdownChange?.(value);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* 드롭다운 영역 */}
      {showDropdown && dropdownOptions.length > 0 && (
        <div className="mb-4 flex items-center gap-3">
          {dropdownLabel && (
            <span className="text-[15px] font-medium text-gray-700">
              {dropdownLabel}
            </span>
          )}
          <Select value={selectedValue} onValueChange={handleDropdownChange}>
            <SelectTrigger className="w-[180px] border-gray-300 text-gray-700 hover:border-gray-400 focus:border-gray-500">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 표 영역 */}
      <div className="relative w-full overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#FCFCFD]" style={{ borderBottom: '1px solid #D7D9DB' }}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-[0.8125rem] font-normal text-[#58595B] leading-[150%]"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group transition-colors hover:bg-[#F5F5F6]"
                style={{ borderBottom: '1px solid #D7D9DB' }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-[0.875rem] font-normal text-[#191B1C] leading-[150%]"
                    style={{ fontFamily: 'var(--typography-type, "Pretendard GOV")' }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 데이터가 없을 때 */}
        {table.getRowModel().rows.length === 0 && (
          <div className="flex h-24 items-center justify-center text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
