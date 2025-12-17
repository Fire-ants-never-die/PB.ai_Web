import { ColumnDef } from "@tanstack/react-table";
import type { FinancialTableRow } from "@/types/financial-table";

/**
 * 재무 데이터 - 하드코딩된 샘플 데이터
 *
 * @description
 * 실제 환경에서는 API로부터 받아올 데이터입니다.
 * 현재는 개발 및 테스트 목적으로 하드코딩되어 있습니다.
 *
 * TODO: API 연동 시 이 파일의 데이터를 제거하고 API 응답으로 대체
 */

/**
 * 테이블 컬럼 정의
 * API 응답에 따라 동적으로 생성 가능
 */
export const financialColumns: ColumnDef<FinancialTableRow>[] = [
  {
    accessorKey: "date",
    header: "년도",
  },
  {
    accessorKey: "revenue",
    header: "매출액",
  },
  {
    accessorKey: "totalAssets",
    header: "자산 총계",
  },
  {
    accessorKey: "totalLiabilities",
    header: "부채 총계",
  },
  {
    accessorKey: "totalEquity",
    header: "자본 총계",
  },
  {
    accessorKey: "operatingIncome",
    header: "영업이익",
  },
  {
    accessorKey: "netIncome",
    header: "순이익",
  },
];

/**
 * 테이블 데이터
 * API 응답에 따라 동적으로 생성 가능
 */
export const financialData: FinancialTableRow[] = [
  {
    date: "2024.12",
    revenue: "₩3.4조",
    totalAssets: "₩35,974억",
    totalLiabilities: "₩9,248억",
    totalEquity: "₩26,725억",
    operatingIncome: "₩1,630억",
    netIncome: "₩1,576억",
  },
  {
    date: "2023.12",
    revenue: "₩3.4조",
    totalAssets: "₩32,347억",
    totalLiabilities: "₩7,939억",
    totalEquity: "₩24,408억",
    operatingIncome: "₩2,120억",
    netIncome: "₩1,714억",
  },
  {
    date: "2022.12",
    revenue: "₩3.1조",
    totalAssets: "₩30,347억",
    totalLiabilities: "₩7,193억",
    totalEquity: "₩23,153억",
    operatingIncome: "₩1,121억",
    netIncome: "₩1,160억",
  },
  {
    date: "2021.12",
    revenue: "₩3.1조",
    totalAssets: "₩28,999억",
    totalLiabilities: "₩6,991억",
    totalEquity: "₩22,007억",
    operatingIncome: "₩1,061억",
    netIncome: "₩996억",
  },
  {
    date: "2020.12",
    revenue: "₩3.1조",
    totalAssets: "₩27,255억",
    totalLiabilities: "₩6,765억",
    totalEquity: "₩20,489억",
    operatingIncome: "₩1,603억",
    netIncome: "₩1,490억",
  },
];
