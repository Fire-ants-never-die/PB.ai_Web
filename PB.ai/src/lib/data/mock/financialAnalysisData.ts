// 재무 분석 데이터 구조 정의

export interface FinancialRatioValue {
  year2023: string | number;
  timeSeriesAverage: string | number;
  industryMedian: string | number;
  timeSeriesScore: number;
  industryScore: number;
}

export interface FinancialRatioItem {
  name: string;
  values: FinancialRatioValue;
  children?: FinancialRatioItem[]; // 하위 항목 (확장 가능)
}

export interface FinancialAnalysisSection {
  title: string;
  items: FinancialRatioItem[];
}

// 재무 비율 판정 데이터
export interface FinancialRatioJudgmentData {
  indicator: string;
  stability: string;
  leverage: string;
  investmentProfitability: string;
  salesMargin: string;
  growth: string;
  activity: string;
}

// Mock 데이터
export const financialRatioJudgmentData: FinancialRatioJudgmentData[] = [
  {
    indicator: '지표 점수',
    stability: '0.667',
    leverage: '-0.333',
    investmentProfitability: '0.833',
    salesMargin: '0.667',
    growth: '0.5',
    activity: '-0.167',
  },
  {
    indicator: '지표 판정',
    stability: '99%',
    leverage: '67%',
    investmentProfitability: '99%',
    salesMargin: '99%',
    growth: '99%',
    activity: '67%',
  },
];

// 유동성 분석 데이터
export const liquidityAnalysisData: FinancialAnalysisSection = {
  title: '3.1. 유동성 분석',
  items: [
    {
      name: '유동비율',
      values: {
        year2023: '203.85%',
        timeSeriesAverage: '199.85%',
        industryMedian: '152.60%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
      children: [
        {
          name: '유동자산',
          values: {
            year2023: '15,234억',
            timeSeriesAverage: '14,567억',
            industryMedian: '12,345억',
            timeSeriesScore: 1,
            industryScore: 1,
          },
        },
        {
          name: '유동부채',
          values: {
            year2023: '7,467억',
            timeSeriesAverage: '7,289억',
            industryMedian: '8,091억',
            timeSeriesScore: 1,
            industryScore: 1,
          },
        },
      ],
    },
    {
      name: '당좌비율',
      values: {
        year2023: '156.23%',
        timeSeriesAverage: '152.45%',
        industryMedian: '128.90%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '현금비율',
      values: {
        year2023: '89.45%',
        timeSeriesAverage: '87.23%',
        industryMedian: '75.60%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '순운전자본대차비율',
      values: {
        year2023: '103.62%',
        timeSeriesAverage: '102.56%',
        industryMedian: '95.30%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '비유동비율',
      values: {
        year2023: '234.56%',
        timeSeriesAverage: '228.90%',
        industryMedian: '210.45%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '비유동장기적합률',
      values: {
        year2023: '187.34%',
        timeSeriesAverage: '182.67%',
        industryMedian: '165.78%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
  ],
};

// 레버리지 분석 데이터
export const leverageAnalysisData: FinancialAnalysisSection = {
  title: '3.2. 레버리지 분석',
  items: [
    {
      name: '부채비율',
      values: {
        year2023: '34.56%',
        timeSeriesAverage: '36.78%',
        industryMedian: '45.67%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '차입금의존도',
      values: {
        year2023: '12.34%',
        timeSeriesAverage: '13.45%',
        industryMedian: '18.90%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '이자보상비율',
      values: {
        year2023: '15.67',
        timeSeriesAverage: '14.23',
        industryMedian: '12.45',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '순부채비율',
      values: {
        year2023: '8.90%',
        timeSeriesAverage: '9.56%',
        industryMedian: '12.34%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '총차입금/EBITDA',
      values: {
        year2023: '0.45',
        timeSeriesAverage: '0.48',
        industryMedian: '0.67',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '순차입금/EBITDA',
      values: {
        year2023: '0.23',
        timeSeriesAverage: '0.25',
        industryMedian: '0.34',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
  ],
};

// 투자수익성 분석 데이터
export const investmentProfitabilityData: FinancialAnalysisSection = {
  title: '4.1. 투자수익성 분석',
  items: [
    {
      name: '총자산세전이익률',
      values: {
        year2023: '8.45%',
        timeSeriesAverage: '8.12%',
        industryMedian: '7.23%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '총자산순이익률 (ROA)',
      values: {
        year2023: '6.78%',
        timeSeriesAverage: '6.45%',
        industryMedian: '5.67%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '기업회계이익률',
      values: {
        year2023: '7.89%',
        timeSeriesAverage: '7.56%',
        industryMedian: '6.78%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '기업순이익률',
      values: {
        year2023: '6.12%',
        timeSeriesAverage: '5.89%',
        industryMedian: '5.23%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자기자본세전이익률',
      values: {
        year2023: '12.34%',
        timeSeriesAverage: '11.89%',
        industryMedian: '10.45%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자기자본이익률 (ROE)',
      values: {
        year2023: '9.87%',
        timeSeriesAverage: '9.45%',
        industryMedian: '8.67%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자본금회전율',
      values: {
        year2023: '1.23',
        timeSeriesAverage: '1.19',
        industryMedian: '1.12',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자본순이익률',
      values: {
        year2023: '8.90%',
        timeSeriesAverage: '8.56%',
        industryMedian: '7.89%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
  ],
};

// 판매마진 분석 데이터
export const salesMarginData: FinancialAnalysisSection = {
  title: '4.2. 판매마진 분석',
  items: [
    {
      name: '매출액세전이익률',
      values: {
        year2023: '9.12%',
        timeSeriesAverage: '8.89%',
        industryMedian: '8.12%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '매출액순이익률',
      values: {
        year2023: '7.34%',
        timeSeriesAverage: '7.12%',
        industryMedian: '6.45%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '매출액판관비율',
      values: {
        year2023: '12.45%',
        timeSeriesAverage: '12.78%',
        industryMedian: '13.56%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: 'EBIT대매출액',
      values: {
        year2023: '8.90%',
        timeSeriesAverage: '8.67%',
        industryMedian: '7.89%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: 'EBITDA대매출액',
      values: {
        year2023: '11.23%',
        timeSeriesAverage: '11.01%',
        industryMedian: '10.34%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
  ],
};

// 성장성 분석 데이터
export const growthAnalysisData: FinancialAnalysisSection = {
  title: '5. 성장성 분석',
  items: [
    {
      name: '총자산증가율',
      values: {
        year2023: '8.45%',
        timeSeriesAverage: '7.89%',
        industryMedian: '6.78%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '유형자산증가율',
      values: {
        year2023: '5.67%',
        timeSeriesAverage: '5.23%',
        industryMedian: '4.56%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '유동자산증가율',
      values: {
        year2023: '12.34%',
        timeSeriesAverage: '11.89%',
        industryMedian: '10.45%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자기자본증가율',
      values: {
        year2023: '9.87%',
        timeSeriesAverage: '9.45%',
        industryMedian: '8.67%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '매출액증가율',
      values: {
        year2023: '11.23%',
        timeSeriesAverage: '10.78%',
        industryMedian: '9.56%',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
  ],
};

// 활동성 분석 데이터
export const activityAnalysisData: FinancialAnalysisSection = {
  title: '6. 활동성 분석',
  items: [
    {
      name: '총자산회전율',
      values: {
        year2023: '0.89',
        timeSeriesAverage: '0.87',
        industryMedian: '0.82',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자기자본회전율',
      values: {
        year2023: '1.23',
        timeSeriesAverage: '1.19',
        industryMedian: '1.12',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '자본금회전율',
      values: {
        year2023: '2.34',
        timeSeriesAverage: '2.28',
        industryMedian: '2.15',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '경영자산회전율',
      values: {
        year2023: '1.45',
        timeSeriesAverage: '1.41',
        industryMedian: '1.34',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '비유동자산회전율',
      values: {
        year2023: '2.67',
        timeSeriesAverage: '2.61',
        industryMedian: '2.48',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '유형자산회전율',
      values: {
        year2023: '3.12',
        timeSeriesAverage: '3.05',
        industryMedian: '2.89',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '재고자산회전율',
      values: {
        year2023: '8.45',
        timeSeriesAverage: '8.23',
        industryMedian: '7.89',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '제품회전율',
      values: {
        year2023: '9.12',
        timeSeriesAverage: '8.89',
        industryMedian: '8.45',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
    {
      name: '매출채권회전율',
      values: {
        year2023: '12.34',
        timeSeriesAverage: '12.01',
        industryMedian: '11.45',
        timeSeriesScore: 1,
        industryScore: 1,
      },
    },
  ],
};
