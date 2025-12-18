import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DynamicTable } from '@/components/tables';
import { useCompanyProfile } from '@/lib/api/hooks/useCompanyData';
import { formatValue } from '@/lib/utils/format';
import type { ProfileItem } from '@/lib/types/company';

interface CompanyProfileProps {
  companyCode: string;
}

export const CompanyProfile = ({ companyCode }: CompanyProfileProps) => {
  const { data, isLoading, isError } = useCompanyProfile(companyCode);

  const columns: ColumnDef<ProfileItem>[] = React.useMemo(
    () => [
      {
        accessorKey: 'label',
        header: '구분',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <span className="text-[17px] text-gray-700 font-normal whitespace-pre-wrap">
              {formatValue(value)}
            </span>
          );
        },
      },
      {
        accessorKey: 'value',
        header: '내용',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const formattedValue = formatValue(value);

          // null이면 "-" 표시
          if (formattedValue === '-') {
            return (
              <span className="text-[17px] text-gray-700 font-normal whitespace-pre-wrap">
                -
              </span>
            );
          }

          // 괄호 부분이 있는 경우 처리 (예: "6,082,642주 (25년 7월 29일 기준)")
          const match = formattedValue.match(/^(.+?)(\s*\(.+\))$/);
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
              {formattedValue}
            </span>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          1. 기업 프로필
        </h2>
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          1. 기업 프로필
        </h2>
        <div className="flex items-center justify-center h-48">
          <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        1. 기업 프로필
      </h2>
      <DynamicTable data={data.profile} columns={columns} />
    </div>
  );
};
