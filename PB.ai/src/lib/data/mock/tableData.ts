import type React from 'react';

// 표 데이터 타입 정의
export interface TableColumn {
  accessorKey: string;
  header: string;
  cell?: (value: any) => React.ReactNode;
}

export interface TableRow {
  [key: string]: any;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
}

// 예시 데이터 - API로부터 받아올 구조와 동일하게 구성
export const sampleTableData: TableData = {
  columns: [
    { accessorKey: 'name', header: '항목' },
    { accessorKey: 'value', header: '값' },
    { accessorKey: 'change', header: '변동' },
    { accessorKey: 'percentage', header: '비율' },
  ],
  rows: [
    { name: '매출액', value: '10조 5,234억원', change: '+1,234억원', percentage: '12.5%' },
    { name: '영업이익', value: '1조 2,345억원', change: '+234억원', percentage: '23.4%' },
    { name: '당기순이익', value: '8,765억원', change: '+123억원', percentage: '15.6%' },
    { name: '자산총계', value: '15조 3,456억원', change: '+2,345억원', percentage: '18.2%' },
    { name: '부채총계', value: '7조 8,901억원', change: '+456억원', percentage: '6.1%' },
    { name: '자본총계', value: '7조 4,555억원', change: '+1,889억원', percentage: '25.3%' },
  ],
};

// 기업 프로필 데이터
export const companyProfileData: TableData = {
  columns: [
    { accessorKey: 'label', header: '구분' },
    { accessorKey: 'value', header: '내용' },
  ],
  rows: [
    { label: '시가총액', value: '2조 3,266억원' },
    { label: '상장일자', value: '1976년 6월 30일' },
    { label: '설립일자', value: '1965년' },
    { label: '종업원수', value: '5,401명' },
    { label: '대표 이사', value: '이병학' },
    { label: '발행주식수', value: '6,082,642주 (25년 7월 29일 기준)' },
    { label: '주요 계열사/관계사', value: '농심홀딩스, 농심켈로그, 농심엔지니어링, 태경농산, 호텔농심' },
  ],
};

// 재무 상태 데이터 (드롭다운 포함)
export interface FinancialDataWithDropdown {
  columns: TableColumn[];
  rows: TableRow[];
  dropdownOptions: string[];
}

export const financialStatusData: FinancialDataWithDropdown = {
  dropdownOptions: ['2024년', '2023년', '2022년', '2021년', '2020년'],
  columns: [
    { accessorKey: 'category', header: '항목' },
    { accessorKey: 'q1', header: 'Q1' },
    { accessorKey: 'q2', header: 'Q2' },
    { accessorKey: 'q3', header: 'Q3' },
    { accessorKey: 'q4', header: 'Q4' },
  ],
  rows: [
    { category: '매출액', q1: '2조 5,123억원', q2: '2조 6,789억원', q3: '2조 7,456억원', q4: '2조 8,866억원' },
    { category: '영업이익', q1: '3,456억원', q2: '3,678억원', q3: '3,789억원', q4: '3,422억원' },
    { category: '영업이익률', q1: '13.7%', q2: '13.7%', q3: '13.8%', q4: '11.8%' },
    { category: '순이익', q1: '2,345억원', q2: '2,567억원', q3: '2,678억원', q4: '2,175억원' },
    { category: 'EPS', q1: '3,856원', q2: '4,221원', q3: '4,402원', q4: '3,577원' },
  ],
};
