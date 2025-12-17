import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DynamicTable } from './DynamicTable';
import {
  sampleTableData,
  companyProfileData,
  financialStatusData,
  type TableRow,
} from '@/lib/data/mock/tableData';

/**
 * 기본 표 예시
 */
export const BasicTableExample = () => {
  const columns: ColumnDef<TableRow>[] = React.useMemo(
    () =>
      sampleTableData.columns.map((col) => ({
        accessorKey: col.accessorKey,
        header: col.header,
        cell: col.cell
          ? ({ getValue }) => col.cell!(getValue())
          : ({ getValue }) => getValue(),
      })),
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        재무 지표
      </h2>
      <DynamicTable data={sampleTableData.rows} columns={columns} />
    </div>
  );
};

/**
 * 기업 프로필 표 예시
 */
export const CompanyProfileTableExample = () => {
  const columns: ColumnDef<TableRow>[] = React.useMemo(
    () => [
      {
        accessorKey: 'label',
        header: '구분',
        cell: ({ getValue }) => (
          <span className="text-[17px] text-gray-700 font-normal">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'value',
        header: '내용',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          // 괄호 부분이 있는 경우 처리
          const match = value.match(/^(.+?)(\s*\(.+\))$/);
          if (match) {
            return (
              <span className="text-[17px] text-gray-700 font-normal">
                {match[1]}
                <span className="text-[12px] ml-2">{match[2]}</span>
              </span>
            );
          }
          return (
            <span className="text-[17px] text-gray-700 font-normal">
              {value}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        1. 기업 프로필
      </h2>
      <DynamicTable data={companyProfileData.rows} columns={columns} />
    </div>
  );
};

/**
 * 드롭다운이 포함된 재무 상태 표 예시
 */
export const FinancialStatusTableExample = () => {
  const [selectedYear, setSelectedYear] = React.useState<string>(
    financialStatusData.dropdownOptions[0]
  );

  const columns: ColumnDef<TableRow>[] = React.useMemo(
    () =>
      financialStatusData.columns.map((col) => ({
        accessorKey: col.accessorKey,
        header: col.header,
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <span className="text-[17px] text-gray-700 font-normal">
              {value}
            </span>
          );
        },
      })),
    []
  );

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    // TODO: API 호출하여 해당 연도의 데이터 가져오기
    console.log('선택된 연도:', value);
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        2. 재무 상태
      </h2>
      <DynamicTable
        data={financialStatusData.rows}
        columns={columns}
        showDropdown
        dropdownOptions={financialStatusData.dropdownOptions}
        dropdownLabel="회계 연도:"
        onDropdownChange={handleYearChange}
        defaultDropdownValue={selectedYear}
      />
    </div>
  );
};

/**
 * 모든 예시를 포함한 컴포넌트
 */
export const AllTableExamples = () => {
  return (
    <div className="flex flex-col gap-12 p-6">
      <BasicTableExample />
      <div className="border-t border-gray-200" />
      <CompanyProfileTableExample />
      <div className="border-t border-gray-200" />
      <FinancialStatusTableExample />
    </div>
  );
};
