/**
 * FinancialTable 사용 예제 컴포넌트
 *
 * @description
 * 이 컴포넌트는 FinancialTable의 사용 방법을 보여주는 예제입니다.
 * 실제 사용 시에는 하드코딩된 데이터 대신 API로부터 받아온 데이터를 사용합니다.
 *
 * @example
 * ```tsx
 * // API 연동 예시
 * const { data } = useQuery({
 *   queryKey: ['financial-data'],
 *   queryFn: fetchFinancialData
 * });
 *
 * <FinancialTable
 *   columns={data.columns}
 *   data={data.rows}
 * />
 * ```
 */

import { FinancialTable } from "@/components/ui/financial-table";
import { financialColumns, financialData } from "@/data/financial-data";

export function FinancialTableExample() {
  return (
    <div className="w-full p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">재무 정보</h2>
        <p className="text-sm text-gray-600 mt-1">
          최근 5개년 재무 데이터
        </p>
      </div>

      <FinancialTable
        columns={financialColumns}
        data={financialData}
        className="shadow-sm rounded-lg overflow-hidden border border-gray-200"
      />

      <div className="mt-4 text-xs text-gray-500">
        * 현재는 하드코딩된 데이터를 표시하고 있습니다.
        실제 환경에서는 API로부터 데이터를 받아옵니다.
      </div>
    </div>
  );
}
