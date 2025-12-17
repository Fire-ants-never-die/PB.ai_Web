import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DynamicTable } from '@/components/tables';
import { companyProfileData, type TableRow } from '@/lib/data/mock/tableData';

export const CompanyProfile = () => {
  const columns: ColumnDef<TableRow>[] = React.useMemo(
    () => [
      {
        accessorKey: 'label',
        header: '구분',
        cell: ({ getValue }) => (
          <span className="text-[17px] text-gray-700 font-normal whitespace-pre-wrap">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'value',
        header: '내용',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          // 괄호 부분이 있는 경우 처리 (예: "6,082,642주 (25년 7월 29일 기준)")
          const match = value.match(/^(.+?)(\s*\(.+\))$/);
          if (match) {
            return (
              <span className="text-[17px] text-gray-700 font-normal whitespace-pre-wrap">
                {match[1]}
                <span className="text-[12px] ml-2">{match[2]}</span>
              </span>
            );
          }
          return (
            <span className="text-[17px] text-gray-700 font-normal whitespace-pre-wrap">
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
