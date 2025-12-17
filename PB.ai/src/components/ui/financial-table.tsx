import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { FinancialTableRow } from "@/types/financial-table";

interface FinancialTableProps {
  columns: ColumnDef<FinancialTableRow>[];
  data: FinancialTableRow[];
  className?: string;
}

/**
 * 재사용 가능한 재무 데이터 테이블 컴포넌트
 *
 * @description
 * - TanStack Table 기반의 검증된 테이블 컴포넌트
 * - 동적 컬럼 및 데이터 지원 (API 연동 가능)
 * - 행 hover 시 border-gray-300 효과
 * - 텍스트는 항상 text-gray-700 유지
 *
 * @example
 * ```tsx
 * <FinancialTable columns={columns} data={data} />
 * ```
 */
export const FinancialTable = React.forwardRef<
  HTMLTableElement,
  FinancialTableProps
>(({ columns, data, className }, ref) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full border-collapse", className)}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-gray-200"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-50"
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
              className={cn(
                "border-b border-gray-200 transition-colors",
                "hover:border-gray-300"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm text-gray-700"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

FinancialTable.displayName = "FinancialTable";
