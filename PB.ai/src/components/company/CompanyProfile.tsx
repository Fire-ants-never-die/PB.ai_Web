import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DynamicTable } from '@/components/tables';
import { useCompanyProfile } from '@/lib/api/hooks/useCompanyData';
import { formatValue } from '@/lib/utils/format';
import type { TableRow } from '@/lib/data/mock/tableData';

interface CompanyProfileProps {
  companyCode: string;
}

export const CompanyProfile = ({ companyCode }: CompanyProfileProps) => {
  const { data, isLoading, isError } = useCompanyProfile(companyCode);

  // 디버깅: API 응답 확인
  React.useEffect(() => {
    if (data) {
      console.log('CompanyProfile API 응답:', data);
      console.log('Profile 배열:', data.profile);
    }
  }, [data]);

  const columns: ColumnDef<TableRow>[] = React.useMemo(
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

  // API 응답을 배열 형식으로 변환하고 티커/고유번호 제외 (모든 hooks는 early return 전에 호출되어야 함)
  const filteredProfile = React.useMemo(() => {
    if (!data?.profile) return [];

    let profileArray: Array<{ label: string; value: string }> = [];

    // profile이 배열인 경우
    if (Array.isArray(data.profile)) {
      // TableRow 또는 ProfileItem을 { label, value } 형식으로 변환
      profileArray = data.profile.map((item: any) => ({
        label: item.label || item.name || '',
        value: item.value || String(item),
      }));
    }
    // profile이 객체인 경우 (동적 키-값 구조)
    else if (typeof data.profile === 'object') {
      profileArray = Object.entries(data.profile).map(([key, value]) => ({
        label: key,
        value: String(value),
      }));
    }

    // 티커, 고유번호, 기업이름, 기업영문, 주식이름, 홈페이지를 제외한 모든 항목 필터링
    return profileArray.filter(
      (item) => {
        const labelLower = item.label?.toLowerCase() || '';
        return (
          labelLower !== '티커' &&
          labelLower !== 'ticker' &&
          labelLower !== '고유번호' &&
          labelLower !== '고유 번호' &&
          labelLower !== 'companycode' &&
          labelLower !== 'company code' &&
          labelLower !== 'company_code' &&
          labelLower !== '기업이름' &&
          labelLower !== '기업 이름' &&
          labelLower !== 'companyname' &&
          labelLower !== 'company name' &&
          labelLower !== 'company_name' &&
          labelLower !== '기업영문' &&
          labelLower !== '기업 영문' &&
          labelLower !== 'companynameeng' &&
          labelLower !== 'company name eng' &&
          labelLower !== 'company_name_eng' &&
          labelLower !== '주식이름' &&
          labelLower !== '주식 이름' &&
          labelLower !== 'stockname' &&
          labelLower !== 'stock name' &&
          labelLower !== 'stock_name' &&
          labelLower !== '홈페이지' &&
          labelLower !== '홈 페이지' &&
          labelLower !== 'homepage' &&
          labelLower !== 'home page' &&
          labelLower !== 'home_page' &&
          labelLower !== 'website' &&
          labelLower !== '웹사이트'
        );
      }
    );
  }, [data?.profile]);

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
      <DynamicTable data={filteredProfile} columns={columns} />
    </div>
  );
};
