import { useMemo } from 'react';
import { DynamicTable } from '@/components/tables/DynamicTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { TableRow } from '@/lib/data/mock/tableData';

// 재무 데이터 인터페이스
export interface FinancialYearData {
  year: string;
  revenue: number; // 매출액
  totalAssets: number; // 자산 총계
  totalLiabilities: number; // 부채 총계
  totalEquity: number; // 자본 총계
  operatingIncome: number; // 영업이익
  netIncome: number; // 순이익
}

interface FinancialDataTableProps {
  data: FinancialYearData[];
  className?: string;
}

// 숫자를 억 원 단위로 포맷 (null이면 "-")
function formatToEok(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '-';
  }
  const eok = value / 100000000;
  return `￦${eok.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}억`;
}

export function FinancialDataTable({ data, className }: FinancialDataTableProps) {
  // TanStack Table용 컬럼 정의
  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        accessorKey: 'year',
        header: '년도',
        cell: ({ row }) => {
          const year = row.original.year;
          if (!year) return '-';
          // "2025"로 오면 "2025/06"으로 표시
          return year === '2025' ? '2025/06' : year;
        },
      },
      {
        accessorKey: 'revenue',
        header: '매출액',
        cell: ({ row }) => formatToEok(row.original.revenue as number),
      },
      {
        accessorKey: 'totalAssets',
        header: '자산 총계',
        cell: ({ row }) => formatToEok(row.original.totalAssets as number),
      },
      {
        accessorKey: 'totalLiabilities',
        header: '부채 총계',
        cell: ({ row }) => formatToEok(row.original.totalLiabilities as number),
      },
      {
        accessorKey: 'totalEquity',
        header: '자본 총계',
        cell: ({ row }) => formatToEok(row.original.totalEquity as number),
      },
      {
        accessorKey: 'operatingIncome',
        header: '영업이익',
        cell: ({ row }) => formatToEok(row.original.operatingIncome as number),
      },
      {
        accessorKey: 'netIncome',
        header: '순이익',
        cell: ({ row }) => formatToEok(row.original.netIncome as number),
      },
    ],
    []
  );

  // TableRow 형식으로 데이터 변환
  const tableData: TableRow[] = data.map((item) => ({
    year: item.year,
    revenue: item.revenue,
    totalAssets: item.totalAssets,
    totalLiabilities: item.totalLiabilities,
    totalEquity: item.totalEquity,
    operatingIncome: item.operatingIncome,
    netIncome: item.netIncome,
  }));

  return (
    <DynamicTable
      data={tableData}
      columns={columns}
      className={className}
    />
  );
}
