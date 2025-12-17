// 재무 데이터 타입
export interface FinancialDataPoint {
  year: string;
  revenue: string;
  totalAssets: string;
  totalLiabilities: string;
  totalEquity: string;
  operatingIncome: string;
  netIncome: string;
}

// 기간별 데이터
export interface PeriodFinancialData {
  annual: FinancialDataPoint[];      // 연간
  semiAnnual: FinancialDataPoint[];  // 반기
  quarterly: FinancialDataPoint[];   // 분기
}

// 전체 재무 데이터 구조
export interface FinancialTableData {
  oneYear: PeriodFinancialData;
  threeYear: PeriodFinancialData;
  fiveYear: PeriodFinancialData;
}

// Mock 데이터 - API로부터 받아올 구조와 동일
export const mockFinancialData: FinancialTableData = {
  // 1년 데이터
  oneYear: {
    annual: [
      {
        year: '2024',
        revenue: '10조 5,234억원',
        totalAssets: '15조 3,456억원',
        totalLiabilities: '7조 8,901억원',
        totalEquity: '7조 4,555억원',
        operatingIncome: '1조 2,345억원',
        netIncome: '8,765억원',
      },
    ],
    semiAnnual: [
      {
        year: '2024 상반기',
        revenue: '5조 2,617억원',
        totalAssets: '15조 1,234억원',
        totalLiabilities: '7조 7,445억원',
        totalEquity: '7조 3,789억원',
        operatingIncome: '6,173억원',
        netIncome: '4,383억원',
      },
      {
        year: '2024 하반기',
        revenue: '5조 2,617억원',
        totalAssets: '15조 3,456억원',
        totalLiabilities: '7조 8,901억원',
        totalEquity: '7조 4,555억원',
        operatingIncome: '6,172억원',
        netIncome: '4,382억원',
      },
    ],
    quarterly: [
      {
        year: '2024 Q1',
        revenue: '2조 6,309억원',
        totalAssets: '14조 9,123억원',
        totalLiabilities: '7조 6,234억원',
        totalEquity: '7조 2,889억원',
        operatingIncome: '3,086억원',
        netIncome: '2,191억원',
      },
      {
        year: '2024 Q2',
        revenue: '2조 6,308억원',
        totalAssets: '15조 1,234억원',
        totalLiabilities: '7조 7,445억원',
        totalEquity: '7조 3,789억원',
        operatingIncome: '3,087억원',
        netIncome: '2,192억원',
      },
      {
        year: '2024 Q3',
        revenue: '2조 6,309억원',
        totalAssets: '15조 2,345억원',
        totalLiabilities: '7조 8,123억원',
        totalEquity: '7조 4,222억원',
        operatingIncome: '3,086억원',
        netIncome: '2,191억원',
      },
      {
        year: '2024 Q4',
        revenue: '2조 6,308억원',
        totalAssets: '15조 3,456억원',
        totalLiabilities: '7조 8,901억원',
        totalEquity: '7조 4,555억원',
        operatingIncome: '3,086억원',
        netIncome: '2,191억원',
      },
    ],
  },
  // 3년 데이터
  threeYear: {
    annual: [
      {
        year: '2024',
        revenue: '10조 5,234억원',
        totalAssets: '15조 3,456억원',
        totalLiabilities: '7조 8,901억원',
        totalEquity: '7조 4,555억원',
        operatingIncome: '1조 2,345억원',
        netIncome: '8,765억원',
      },
      {
        year: '2023',
        revenue: '9조 8,123억원',
        totalAssets: '14조 5,234억원',
        totalLiabilities: '7조 3,456억원',
        totalEquity: '7조 1,778억원',
        operatingIncome: '1조 1,234억원',
        netIncome: '8,123억원',
      },
      {
        year: '2022',
        revenue: '9조 2,456억원',
        totalAssets: '13조 8,901억원',
        totalLiabilities: '6조 9,123억원',
        totalEquity: '6조 9,778억원',
        operatingIncome: '1조 567억원',
        netIncome: '7,456억원',
      },
    ],
    semiAnnual: [
      {
        year: '2024 상반기',
        revenue: '5조 2,617억원',
        totalAssets: '15조 1,234억원',
        totalLiabilities: '7조 7,445억원',
        totalEquity: '7조 3,789억원',
        operatingIncome: '6,173억원',
        netIncome: '4,383억원',
      },
      {
        year: '2024 하반기',
        revenue: '5조 2,617억원',
        totalAssets: '15조 3,456억원',
        totalLiabilities: '7조 8,901억원',
        totalEquity: '7조 4,555억원',
        operatingIncome: '6,172억원',
        netIncome: '4,382억원',
      },
      {
        year: '2023 상반기',
        revenue: '4조 9,062억원',
        totalAssets: '14조 3,123억원',
        totalLiabilities: '7조 2,234억원',
        totalEquity: '7조 889억원',
        operatingIncome: '5,617억원',
        netIncome: '4,062억원',
      },
      {
        year: '2023 하반기',
        revenue: '4조 9,061억원',
        totalAssets: '14조 5,234억원',
        totalLiabilities: '7조 3,456억원',
        totalEquity: '7조 1,778억원',
        operatingIncome: '5,617억원',
        netIncome: '4,061억원',
      },
      {
        year: '2022 상반기',
        revenue: '4조 6,228억원',
        totalAssets: '13조 6,789억원',
        totalLiabilities: '6조 8,012억원',
        totalEquity: '6조 8,777억원',
        operatingIncome: '5,284억원',
        netIncome: '3,728억원',
      },
      {
        year: '2022 하반기',
        revenue: '4조 6,228억원',
        totalAssets: '13조 8,901억원',
        totalLiabilities: '6조 9,123억원',
        totalEquity: '6조 9,778억원',
        operatingIncome: '5,283억원',
        netIncome: '3,728억원',
      },
    ],
    quarterly: [
      // 2024년 분기
      { year: '2024 Q1', revenue: '2조 6,309억원', totalAssets: '14조 9,123억원', totalLiabilities: '7조 6,234억원', totalEquity: '7조 2,889억원', operatingIncome: '3,086억원', netIncome: '2,191억원' },
      { year: '2024 Q2', revenue: '2조 6,308억원', totalAssets: '15조 1,234억원', totalLiabilities: '7조 7,445억원', totalEquity: '7조 3,789억원', operatingIncome: '3,087억원', netIncome: '2,192억원' },
      { year: '2024 Q3', revenue: '2조 6,309억원', totalAssets: '15조 2,345억원', totalLiabilities: '7조 8,123억원', totalEquity: '7조 4,222억원', operatingIncome: '3,086억원', netIncome: '2,191억원' },
      { year: '2024 Q4', revenue: '2조 6,308억원', totalAssets: '15조 3,456억원', totalLiabilities: '7조 8,901억원', totalEquity: '7조 4,555억원', operatingIncome: '3,086억원', netIncome: '2,191억원' },
      // 2023년 분기
      { year: '2023 Q1', revenue: '2조 4,531억원', totalAssets: '14조 1,012억원', totalLiabilities: '7조 1,123억원', totalEquity: '6조 9,889억원', operatingIncome: '2,809억원', netIncome: '2,031억원' },
      { year: '2023 Q2', revenue: '2조 4,531억원', totalAssets: '14조 3,123억원', totalLiabilities: '7조 2,234억원', totalEquity: '7조 889억원', operatingIncome: '2,808억원', netIncome: '2,031억원' },
      { year: '2023 Q3', revenue: '2조 4,531억원', totalAssets: '14조 4,178억원', totalLiabilities: '7조 2,845억원', totalEquity: '7조 1,333억원', operatingIncome: '2,809억원', netIncome: '2,031억원' },
      { year: '2023 Q4', revenue: '2조 4,530억원', totalAssets: '14조 5,234억원', totalLiabilities: '7조 3,456억원', totalEquity: '7조 1,778억원', operatingIncome: '2,808억원', netIncome: '2,030억원' },
      // 2022년 분기
      { year: '2022 Q1', revenue: '2조 3,114억원', totalAssets: '13조 4,678억원', totalLiabilities: '6조 6,901억원', totalEquity: '6조 7,777억원', operatingIncome: '2,642억원', netIncome: '1,864억원' },
      { year: '2022 Q2', revenue: '2조 3,114억원', totalAssets: '13조 6,789억원', totalLiabilities: '6조 8,012억원', totalEquity: '6조 8,777억원', operatingIncome: '2,642억원', netIncome: '1,864억원' },
      { year: '2022 Q3', revenue: '2조 3,114억원', totalAssets: '13조 7,845억원', totalLiabilities: '6조 8,568억원', totalEquity: '6조 9,277억원', operatingIncome: '2,642억원', netIncome: '1,864억원' },
      { year: '2022 Q4', revenue: '2조 3,114억원', totalAssets: '13조 8,901억원', totalLiabilities: '6조 9,123억원', totalEquity: '6조 9,778억원', operatingIncome: '2,641억원', netIncome: '1,864억원' },
    ],
  },
  // 5년 데이터
  fiveYear: {
    annual: [
      { year: '2024', revenue: '10조 5,234억원', totalAssets: '15조 3,456억원', totalLiabilities: '7조 8,901억원', totalEquity: '7조 4,555억원', operatingIncome: '1조 2,345억원', netIncome: '8,765억원' },
      { year: '2023', revenue: '9조 8,123억원', totalAssets: '14조 5,234억원', totalLiabilities: '7조 3,456억원', totalEquity: '7조 1,778억원', operatingIncome: '1조 1,234억원', netIncome: '8,123억원' },
      { year: '2022', revenue: '9조 2,456억원', totalAssets: '13조 8,901억원', totalLiabilities: '6조 9,123억원', totalEquity: '6조 9,778억원', operatingIncome: '1조 567억원', netIncome: '7,456억원' },
      { year: '2021', revenue: '8조 7,234억원', totalAssets: '13조 2,345억원', totalLiabilities: '6조 5,678억원', totalEquity: '6조 6,667억원', operatingIncome: '9,876억원', netIncome: '6,890억원' },
      { year: '2020', revenue: '8조 2,567억원', totalAssets: '12조 6,789억원', totalLiabilities: '6조 2,345억원', totalEquity: '6조 4,444억원', operatingIncome: '9,234억원', netIncome: '6,456억원' },
    ],
    semiAnnual: [
      // 최근 5년의 반기 데이터 (10개)
      { year: '2024 상반기', revenue: '5조 2,617억원', totalAssets: '15조 1,234억원', totalLiabilities: '7조 7,445억원', totalEquity: '7조 3,789억원', operatingIncome: '6,173억원', netIncome: '4,383억원' },
      { year: '2024 하반기', revenue: '5조 2,617억원', totalAssets: '15조 3,456억원', totalLiabilities: '7조 8,901억원', totalEquity: '7조 4,555억원', operatingIncome: '6,172억원', netIncome: '4,382억원' },
      { year: '2023 상반기', revenue: '4조 9,062억원', totalAssets: '14조 3,123억원', totalLiabilities: '7조 2,234억원', totalEquity: '7조 889억원', operatingIncome: '5,617억원', netIncome: '4,062억원' },
      { year: '2023 하반기', revenue: '4조 9,061억원', totalAssets: '14조 5,234억원', totalLiabilities: '7조 3,456억원', totalEquity: '7조 1,778억원', operatingIncome: '5,617억원', netIncome: '4,061억원' },
      { year: '2022 상반기', revenue: '4조 6,228억원', totalAssets: '13조 6,789억원', totalLiabilities: '6조 8,012억원', totalEquity: '6조 8,777억원', operatingIncome: '5,284억원', netIncome: '3,728억원' },
      { year: '2022 하반기', revenue: '4조 6,228억원', totalAssets: '13조 8,901억원', totalLiabilities: '6조 9,123억원', totalEquity: '6조 9,778억원', operatingIncome: '5,283억원', netIncome: '3,728억원' },
      { year: '2021 상반기', revenue: '4조 3,617억원', totalAssets: '13조 234억원', totalLiabilities: '6조 4,567억원', totalEquity: '6조 5,667억원', operatingIncome: '4,938억원', netIncome: '3,445억원' },
      { year: '2021 하반기', revenue: '4조 3,617억원', totalAssets: '13조 2,345억원', totalLiabilities: '6조 5,678억원', totalEquity: '6조 6,667억원', operatingIncome: '4,938억원', netIncome: '3,445억원' },
      { year: '2020 상반기', revenue: '4조 1,284억원', totalAssets: '12조 4,678억원', totalLiabilities: '6조 1,234억원', totalEquity: '6조 3,444억원', operatingIncome: '4,617억원', netIncome: '3,228억원' },
      { year: '2020 하반기', revenue: '4조 1,283억원', totalAssets: '12조 6,789억원', totalLiabilities: '6조 2,345억원', totalEquity: '6조 4,444억원', operatingIncome: '4,617억원', netIncome: '3,228억원' },
    ],
    quarterly: [
      // 최근 5년의 분기 데이터 (20개)
      { year: '2024 Q1', revenue: '2조 6,309억원', totalAssets: '14조 9,123억원', totalLiabilities: '7조 6,234억원', totalEquity: '7조 2,889억원', operatingIncome: '3,086억원', netIncome: '2,191억원' },
      { year: '2024 Q2', revenue: '2조 6,308억원', totalAssets: '15조 1,234억원', totalLiabilities: '7조 7,445억원', totalEquity: '7조 3,789억원', operatingIncome: '3,087억원', netIncome: '2,192억원' },
      { year: '2024 Q3', revenue: '2조 6,309억원', totalAssets: '15조 2,345억원', totalLiabilities: '7조 8,123억원', totalEquity: '7조 4,222억원', operatingIncome: '3,086억원', netIncome: '2,191억원' },
      { year: '2024 Q4', revenue: '2조 6,308억원', totalAssets: '15조 3,456억원', totalLiabilities: '7조 8,901억원', totalEquity: '7조 4,555억원', operatingIncome: '3,086억원', netIncome: '2,191억원' },
      { year: '2023 Q1', revenue: '2조 4,531억원', totalAssets: '14조 1,012억원', totalLiabilities: '7조 1,123억원', totalEquity: '6조 9,889억원', operatingIncome: '2,809억원', netIncome: '2,031억원' },
      { year: '2023 Q2', revenue: '2조 4,531억원', totalAssets: '14조 3,123억원', totalLiabilities: '7조 2,234억원', totalEquity: '7조 889억원', operatingIncome: '2,808억원', netIncome: '2,031억원' },
      { year: '2023 Q3', revenue: '2조 4,531억원', totalAssets: '14조 4,178억원', totalLiabilities: '7조 2,845억원', totalEquity: '7조 1,333억원', operatingIncome: '2,809억원', netIncome: '2,031억원' },
      { year: '2023 Q4', revenue: '2조 4,530억원', totalAssets: '14조 5,234억원', totalLiabilities: '7조 3,456억원', totalEquity: '7조 1,778억원', operatingIncome: '2,808억원', netIncome: '2,030억원' },
      { year: '2022 Q1', revenue: '2조 3,114억원', totalAssets: '13조 4,678억원', totalLiabilities: '6조 6,901억원', totalEquity: '6조 7,777억원', operatingIncome: '2,642억원', netIncome: '1,864억원' },
      { year: '2022 Q2', revenue: '2조 3,114억원', totalAssets: '13조 6,789억원', totalLiabilities: '6조 8,012억원', totalEquity: '6조 8,777억원', operatingIncome: '2,642억원', netIncome: '1,864억원' },
      { year: '2022 Q3', revenue: '2조 3,114억원', totalAssets: '13조 7,845억원', totalLiabilities: '6조 8,568억원', totalEquity: '6조 9,277억원', operatingIncome: '2,642억원', netIncome: '1,864억원' },
      { year: '2022 Q4', revenue: '2조 3,114억원', totalAssets: '13조 8,901억원', totalLiabilities: '6조 9,123억원', totalEquity: '6조 9,778억원', operatingIncome: '2,641억원', netIncome: '1,864억원' },
      { year: '2021 Q1', revenue: '2조 1,809억원', totalAssets: '12조 8,567억원', totalLiabilities: '6조 3,456억원', totalEquity: '6조 5,111억원', operatingIncome: '2,469억원', netIncome: '1,723억원' },
      { year: '2021 Q2', revenue: '2조 1,808억원', totalAssets: '13조 234억원', totalLiabilities: '6조 4,567억원', totalEquity: '6조 5,667억원', operatingIncome: '2,469억원', netIncome: '1,722억원' },
      { year: '2021 Q3', revenue: '2조 1,809억원', totalAssets: '13조 1,290억원', totalLiabilities: '6조 5,123억원', totalEquity: '6조 6,167억원', operatingIncome: '2,469억원', netIncome: '1,723억원' },
      { year: '2021 Q4', revenue: '2조 1,808억원', totalAssets: '13조 2,345억원', totalLiabilities: '6조 5,678억원', totalEquity: '6조 6,667억원', operatingIncome: '2,469억원', netIncome: '1,722억원' },
      { year: '2020 Q1', revenue: '2조 642억원', totalAssets: '12조 2,567억원', totalLiabilities: '6조 123억원', totalEquity: '6조 2,444억원', operatingIncome: '2,309억원', netIncome: '1,614억원' },
      { year: '2020 Q2', revenue: '2조 642억원', totalAssets: '12조 4,678억원', totalLiabilities: '6조 1,234억원', totalEquity: '6조 3,444억원', operatingIncome: '2,308억원', netIncome: '1,614억원' },
      { year: '2020 Q3', revenue: '2조 642억원', totalAssets: '12조 5,734억원', totalLiabilities: '6조 1,790억원', totalEquity: '6조 3,944억원', operatingIncome: '2,309억원', netIncome: '1,614억원' },
      { year: '2020 Q4', revenue: '2조 641억원', totalAssets: '12조 6,789억원', totalLiabilities: '6조 2,345억원', totalEquity: '6조 4,444억원', operatingIncome: '2,308억원', netIncome: '1,614억원' },
    ],
  },
};

// 필드 라벨
export const fieldLabels = {
  year: '년도',
  revenue: '매출액',
  totalAssets: '자산총계',
  totalLiabilities: '부채총계',
  totalEquity: '자본총계',
  operatingIncome: '영업이익',
  netIncome: '순이익',
};
