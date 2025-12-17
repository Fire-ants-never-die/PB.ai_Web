/**
 * 재무 테이블 데이터 타입 정의
 * API로부터 동적으로 받아올 데이터 구조
 */

export interface FinancialTableRow {
  [key: string]: string | number;
}

export interface FinancialTableColumn {
  id: string;
  header: string;
  accessorKey: string;
}

export interface FinancialTableData {
  columns: FinancialTableColumn[];
  rows: FinancialTableRow[];
}
