import type {
  CompanyInfo,
  StockPrice,
  RevenueData,
  FinancialStatement,
  BalanceSheet,
  CashFlowStatement,
  PerShareMetrics,
  Multiples,
  OwnershipStructure,
  ProfitabilityRatio,
  GrowthMetric,
  StabilityMetric,
  ActivityMetric,
  ValuationIndicator,
  ChatHistory,
} from '@/lib/types';

// Company Information
export const mockCompanyInfo: CompanyInfo = {
  code: '004370',
  name: '농심',
  currentPrice: 454000,
  priceChange: 5000,
  priceChangePercent: 1.11,
  marketCap: 3597000000000, // 3.597조
  outstandingShares: 7924000,
};

// Stock Price History (for charts)
export const mockStockPrices: StockPrice[] = [
  { date: '2021-01', open: 280000, high: 290000, low: 275000, close: 285000, volume: 125000 },
  { date: '2021-02', open: 285000, high: 295000, low: 280000, close: 290000, volume: 130000 },
  { date: '2021-03', open: 290000, high: 310000, low: 285000, close: 305000, volume: 145000 },
  { date: '2021-04', open: 305000, high: 315000, low: 295000, close: 300000, volume: 135000 },
  { date: '2021-05', open: 300000, high: 320000, low: 295000, close: 315000, volume: 155000 },
  { date: '2021-06', open: 315000, high: 330000, low: 310000, close: 325000, volume: 165000 },
  { date: '2021-07', open: 325000, high: 340000, low: 320000, close: 335000, volume: 170000 },
  { date: '2021-08', open: 335000, high: 350000, low: 330000, close: 345000, volume: 175000 },
  { date: '2021-09', open: 345000, high: 355000, low: 335000, close: 340000, volume: 160000 },
  { date: '2021-10', open: 340000, high: 360000, low: 335000, close: 355000, volume: 180000 },
  { date: '2021-11', open: 355000, high: 370000, low: 350000, close: 365000, volume: 185000 },
  { date: '2021-12', open: 365000, high: 380000, low: 360000, close: 375000, volume: 190000 },
  { date: '2022-01', open: 375000, high: 390000, low: 370000, close: 385000, volume: 195000 },
  { date: '2022-02', open: 385000, high: 400000, low: 380000, close: 395000, volume: 200000 },
  { date: '2022-03', open: 395000, high: 410000, low: 390000, close: 405000, volume: 205000 },
  { date: '2022-04', open: 405000, high: 420000, low: 400000, close: 415000, volume: 210000 },
  { date: '2022-05', open: 415000, high: 430000, low: 410000, close: 425000, volume: 215000 },
  { date: '2022-06', open: 425000, high: 440000, low: 420000, close: 435000, volume: 220000 },
  { date: '2022-07', open: 435000, high: 450000, low: 430000, close: 445000, volume: 225000 },
  { date: '2022-08', open: 445000, high: 460000, low: 440000, close: 455000, volume: 230000 },
  { date: '2022-09', open: 455000, high: 470000, low: 450000, close: 465000, volume: 235000 },
  { date: '2022-10', open: 465000, high: 480000, low: 460000, close: 475000, volume: 240000 },
  { date: '2022-11', open: 475000, high: 490000, low: 470000, close: 485000, volume: 245000 },
  { date: '2022-12', open: 485000, high: 500000, low: 480000, close: 495000, volume: 250000 },
  { date: '2023-01', open: 495000, high: 510000, low: 490000, close: 505000, volume: 255000 },
  { date: '2023-02', open: 505000, high: 520000, low: 500000, close: 515000, volume: 260000 },
  { date: '2023-03', open: 515000, high: 520000, low: 505000, close: 510000, volume: 250000 },
  { date: '2023-04', open: 510000, high: 515000, low: 495000, close: 500000, volume: 245000 },
  { date: '2023-05', open: 500000, high: 510000, low: 490000, close: 505000, volume: 240000 },
  { date: '2023-06', open: 505000, high: 515000, low: 500000, close: 510000, volume: 235000 },
  { date: '2023-07', open: 510000, high: 520000, low: 505000, close: 515000, volume: 230000 },
  { date: '2023-08', open: 515000, high: 525000, low: 510000, close: 520000, volume: 225000 },
  { date: '2023-09', open: 520000, high: 530000, low: 515000, close: 525000, volume: 220000 },
  { date: '2023-10', open: 525000, high: 535000, low: 520000, close: 530000, volume: 215000 },
  { date: '2023-11', open: 530000, high: 540000, low: 525000, close: 535000, volume: 210000 },
  { date: '2023-12', open: 535000, high: 545000, low: 530000, close: 540000, volume: 205000 },
  { date: '2024-01', open: 540000, high: 520000, low: 500000, close: 510000, volume: 280000 },
  { date: '2024-02', open: 510000, high: 490000, low: 470000, close: 480000, volume: 290000 },
  { date: '2024-03', open: 480000, high: 470000, low: 450000, close: 460000, volume: 300000 },
  { date: '2024-04', open: 460000, high: 455000, low: 440000, close: 450000, volume: 295000 },
  { date: '2024-05', open: 450000, high: 445000, low: 430000, close: 440000, volume: 285000 },
  { date: '2024-06', open: 440000, high: 450000, low: 435000, close: 445000, volume: 275000 },
  { date: '2024-07', open: 445000, high: 455000, low: 440000, close: 450000, volume: 270000 },
  { date: '2024-08', open: 450000, high: 460000, low: 445000, close: 455000, volume: 265000 },
  { date: '2024-09', open: 455000, high: 465000, low: 450000, close: 460000, volume: 260000 },
  { date: '2024-10', open: 460000, high: 470000, low: 455000, close: 465000, volume: 255000 },
  { date: '2024-11', open: 465000, high: 460000, low: 445000, close: 450000, volume: 265000 },
  { date: '2024-12', open: 450000, high: 458000, low: 448000, close: 454000, volume: 270000 },
];

// Revenue Data (for bar charts)
export const mockRevenueData: RevenueData[] = [
  { year: '2020', revenue: 2405, operatingIncome: 155, netIncome: 123 },
  { year: '2021', revenue: 2681, operatingIncome: 180, netIncome: 145 },
  { year: '2022', revenue: 2924, operatingIncome: 195, netIncome: 158 },
  { year: '2023', revenue: 3145, operatingIncome: 215, netIncome: 172 },
  { year: '2024E', revenue: 3367, operatingIncome: 235, netIncome: 188 },
];

// Financial Statements (Income Statement)
export const mockFinancialStatements: FinancialStatement[] = [
  {
    period: '2021.12',
    revenue: 2681200000000,
    operatingIncome: 179800000000,
    netIncome: 145200000000,
    eps: 18320,
    operatingMargin: 6.7,
    netMargin: 5.4,
  },
  {
    period: '2022.12',
    revenue: 2924400000000,
    operatingIncome: 194900000000,
    netIncome: 157800000000,
    eps: 19910,
    operatingMargin: 6.7,
    netMargin: 5.4,
  },
  {
    period: '2023.12',
    revenue: 3145200000000,
    operatingIncome: 215300000000,
    netIncome: 172400000000,
    eps: 21750,
    operatingMargin: 6.8,
    netMargin: 5.5,
  },
  {
    period: '2024.12',
    revenue: 3367000000000,
    operatingIncome: 235100000000,
    netIncome: 188200000000,
    eps: 23750,
    operatingMargin: 7.0,
    netMargin: 5.6,
  },
  {
    period: '2025/6',
    revenue: 1683500000000,
    operatingIncome: 117550000000,
    netIncome: 94100000000,
    eps: 11875,
    operatingMargin: 7.0,
    netMargin: 5.6,
  },
];

// Balance Sheet Data
export const mockBalanceSheets: BalanceSheet[] = [
  {
    period: '2021.12',
    totalAssets: 4567000000000,
    currentAssets: 1890000000000,
    nonCurrentAssets: 2677000000000,
    totalLiabilities: 1234000000000,
    currentLiabilities: 890000000000,
    nonCurrentLiabilities: 344000000000,
    equity: 3333000000000,
    debtRatio: 37.02,
    currentRatio: 212.36,
  },
  {
    period: '2022.12',
    totalAssets: 4892000000000,
    currentAssets: 2015000000000,
    nonCurrentAssets: 2877000000000,
    totalLiabilities: 1345000000000,
    currentLiabilities: 945000000000,
    nonCurrentLiabilities: 400000000000,
    equity: 3547000000000,
    debtRatio: 37.92,
    currentRatio: 213.23,
  },
  {
    period: '2023.12',
    totalAssets: 5234000000000,
    currentAssets: 2156000000000,
    nonCurrentAssets: 3078000000000,
    totalLiabilities: 1456000000000,
    currentLiabilities: 1012000000000,
    nonCurrentLiabilities: 444000000000,
    equity: 3778000000000,
    debtRatio: 38.54,
    currentRatio: 213.04,
  },
  {
    period: '2024.12',
    totalAssets: 5589000000000,
    currentAssets: 2301000000000,
    nonCurrentAssets: 3288000000000,
    totalLiabilities: 1567000000000,
    currentLiabilities: 1089000000000,
    nonCurrentLiabilities: 478000000000,
    equity: 4022000000000,
    debtRatio: 38.96,
    currentRatio: 211.30,
  },
];

// Cash Flow Statements
export const mockCashFlowStatements: CashFlowStatement[] = [
  {
    period: '2021.12',
    operatingCashFlow: 289000000000,
    investingCashFlow: -156000000000,
    financingCashFlow: -78000000000,
    freeCashFlow: 133000000000,
    capitalExpenditure: 156000000000,
  },
  {
    period: '2022.12',
    operatingCashFlow: 312000000000,
    investingCashFlow: -167000000000,
    financingCashFlow: -89000000000,
    freeCashFlow: 145000000000,
    capitalExpenditure: 167000000000,
  },
  {
    period: '2023.12',
    operatingCashFlow: 335000000000,
    investingCashFlow: -178000000000,
    financingCashFlow: -95000000000,
    freeCashFlow: 157000000000,
    capitalExpenditure: 178000000000,
  },
  {
    period: '2024.12',
    operatingCashFlow: 358000000000,
    investingCashFlow: -189000000000,
    financingCashFlow: -102000000000,
    freeCashFlow: 169000000000,
    capitalExpenditure: 189000000000,
  },
];

// Per Share Metrics
export const mockPerShareMetrics: PerShareMetrics[] = [
  {
    period: '2021.12',
    eps: 18320,
    bps: 420585,
    cfps: 36475,
    sps: 338305,
    dps: 3650,
  },
  {
    period: '2022.12',
    eps: 19910,
    bps: 447577,
    cfps: 39370,
    sps: 368973,
    dps: 4050,
  },
  {
    period: '2023.12',
    eps: 21750,
    bps: 476758,
    cfps: 42262,
    sps: 396841,
    dps: 4450,
  },
  {
    period: '2024.12',
    eps: 23750,
    bps: 507565,
    cfps: 45173,
    sps: 424976,
    dps: 4850,
  },
  {
    period: '2025/6',
    eps: 11875,
    bps: 519440,
    cfps: 22587,
    sps: 212488,
    dps: 2425,
  },
];

// Multiples
export const mockMultiples: Multiples[] = [
  {
    period: '2021.12',
    per: 19.41,
    pbr: 0.86,
    psr: 0.73,
    pcr: 9.48,
    evEbitda: 9.28,
    evSales: 0.73,
  },
  {
    period: '2022.12',
    per: 18.70,
    pbr: 0.91,
    psr: 0.69,
    pcr: 9.34,
    evEbitda: 9.58,
    evSales: 0.70,
  },
  {
    period: '2023.12',
    per: 14.40,
    pbr: 0.99,
    psr: 0.73,
    pcr: 8.64,
    evEbitda: 7.63,
    evSales: 0.73,
  },
  {
    period: '2024.12',
    per: 14.46,
    pbr: 0.83,
    psr: 0.66,
    pcr: 8.13,
    evEbitda: 7.96,
    evSales: 0.66,
  },
];

// Ownership Structure
export const mockOwnershipStructure: OwnershipStructure[] = [
  { category: '대주주', percentage: 38.2, year: '2023' },
  { category: '외국인', percentage: 15.6, year: '2023' },
  { category: '기관', percentage: 28.3, year: '2023' },
  { category: '개인', percentage: 16.4, year: '2023' },
  { category: '자기주식', percentage: 1.5, year: '2023' },
];

// Profitability Ratios
export const mockProfitabilityRatios: ProfitabilityRatio[] = [
  {
    category: '매출총이익률',
    ratio2023: 32.45,
    comparisonYear: 31.89,
    industryAvg: 28.76,
    yearChange: 0.56,
    industryChange: 3.69,
  },
  {
    category: '영업이익률',
    ratio2023: 6.84,
    comparisonYear: 6.67,
    industryAvg: 5.23,
    yearChange: 0.17,
    industryChange: 1.61,
  },
  {
    category: '순이익률',
    ratio2023: 5.48,
    comparisonYear: 5.40,
    industryAvg: 3.87,
    yearChange: 0.08,
    industryChange: 1.61,
  },
  {
    category: '총자산순이익률(ROA)',
    ratio2023: 3.29,
    comparisonYear: 3.23,
    industryAvg: 2.45,
    yearChange: 0.06,
    industryChange: 0.84,
  },
  {
    category: '자기자본이익률(ROE)',
    ratio2023: 4.56,
    comparisonYear: 4.09,
    industryAvg: 3.12,
    yearChange: 0.47,
    industryChange: 1.44,
  },
  {
    category: '투하자본수익률(ROIC)',
    ratio2023: 3.87,
    comparisonYear: 3.65,
    industryAvg: 2.78,
    yearChange: 0.22,
    industryChange: 1.09,
  },
];

// Growth Metrics
export const mockGrowthMetrics: GrowthMetric[] = [
  {
    category: '매출액증가율',
    ratio2023: 7.55,
    comparisonYear: 9.08,
    industryAvg: 5.43,
    yearChange: -1.53,
    industryChange: 2.12,
  },
  {
    category: '영업이익증가율',
    ratio2023: 10.47,
    comparisonYear: 8.40,
    industryAvg: 6.23,
    yearChange: 2.07,
    industryChange: 4.24,
  },
  {
    category: '순이익증가율',
    ratio2023: 9.25,
    comparisonYear: 8.66,
    industryAvg: 5.89,
    yearChange: 0.59,
    industryChange: 3.36,
  },
  {
    category: '자산증가율',
    ratio2023: 6.99,
    comparisonYear: 7.11,
    industryAvg: 5.67,
    yearChange: -0.12,
    industryChange: 1.32,
  },
  {
    category: 'EPS증가율',
    ratio2023: 9.24,
    comparisonYear: 8.68,
    industryAvg: 5.87,
    yearChange: 0.56,
    industryChange: 3.37,
  },
];

// Stability Metrics
export const mockStabilityMetrics: StabilityMetric[] = [
  {
    category: '유동비율',
    ratio2023: 213.04,
    comparisonYear: 213.23,
    industryAvg: 178.45,
    yearChange: -0.19,
    industryChange: 34.59,
  },
  {
    category: '당좌비율',
    ratio2023: 156.78,
    comparisonYear: 157.34,
    industryAvg: 125.67,
    yearChange: -0.56,
    industryChange: 31.11,
  },
  {
    category: '부채비율',
    ratio2023: 38.54,
    comparisonYear: 37.92,
    industryAvg: 56.78,
    yearChange: 0.62,
    industryChange: -18.24,
  },
  {
    category: '자기자본비율',
    ratio2023: 72.19,
    comparisonYear: 72.51,
    industryAvg: 63.82,
    yearChange: -0.32,
    industryChange: 8.37,
  },
  {
    category: '이자보상배율',
    ratio2023: 45.67,
    comparisonYear: 42.34,
    industryAvg: 28.90,
    yearChange: 3.33,
    industryChange: 16.77,
  },
];

// Activity Metrics
export const mockActivityMetrics: ActivityMetric[] = [
  {
    category: '총자산회전율',
    ratio2023: 0.60,
    comparisonYear: 0.60,
    industryAvg: 0.63,
    yearChange: 0.0,
    industryChange: -0.03,
  },
  {
    category: '매출채권회전율',
    ratio2023: 12.34,
    comparisonYear: 11.67,
    industryAvg: 9.87,
    yearChange: 0.67,
    industryChange: 2.47,
  },
  {
    category: '재고자산회전율',
    ratio2023: 8.45,
    comparisonYear: 8.23,
    industryAvg: 7.12,
    yearChange: 0.22,
    industryChange: 1.33,
  },
  {
    category: '고정자산회전율',
    ratio2023: 1.02,
    comparisonYear: 1.02,
    industryAvg: 0.95,
    yearChange: 0.0,
    industryChange: 0.07,
  },
];

// Valuation Indicators
export const mockValuationIndicators: ValuationIndicator[] = [
  {
    name: '유사기업 이용법(PER)',
    currentPrice: 454000,
    fairValue: 579000,
    range: { min: 524000, max: 634000 },
  },
  {
    name: '초과이익할인법(AE법)',
    currentPrice: 454000,
    fairValue: 546000,
    range: { min: 491000, max: 601000 },
  },
  {
    name: '경제적부가가치(EVA)',
    currentPrice: 454000,
    fairValue: 512000,
    range: { min: 457000, max: 567000 },
  },
  {
    name: '현금흐름할인(DCF)',
    currentPrice: 454000,
    fairValue: 489000,
    range: { min: 434000, max: 544000 },
  },
  {
    name: '연금초과할인법(DCF)',
    currentPrice: 454000,
    fairValue: 523000,
    range: { min: 468000, max: 578000 },
  },
  {
    name: '주정오자율분석',
    currentPrice: 454000,
    fairValue: 495000,
    range: { min: 440000, max: 550000 },
  },
];

// Chat History
export const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: '미래에도 이익과 매출 상승세…',
    preview: '미래에도 이익과 매출 상승세가 계속될까요?',
    timestamp: new Date('2024-12-14T10:30:00'),
    messages: [
      {
        id: '1-1',
        type: 'user',
        content: '미래에도 이익과 매출 상승세가 계속될까요?',
        timestamp: new Date('2024-12-14T10:30:00'),
      },
      {
        id: '1-2',
        type: 'assistant',
        content: '농심의 경우 최근 3년간 매출과 이익이 꾸준히 증가하고 있습니다. 2021년 2,681억원에서 2023년 3,145억원으로 매출이 증가했으며, 영업이익도 같은 기간 179억원에서 215억원으로 증가했습니다. 향후에도 이러한 상승세가 지속될 것으로 예상됩니다.',
        timestamp: new Date('2024-12-14T10:30:15'),
      },
    ],
  },
  {
    id: '2',
    title: '현재 부채비율과 자본구조가…',
    preview: '현재 부채비율과 자본구조가 안정적인가요?',
    timestamp: new Date('2024-12-13T15:20:00'),
    messages: [
      {
        id: '2-1',
        type: 'user',
        content: '현재 부채비율과 자본구조가 안정적인가요?',
        timestamp: new Date('2024-12-13T15:20:00'),
      },
      {
        id: '2-2',
        type: 'assistant',
        content: '농심의 부채비율은 38.54%로 업계 평균 56.78%보다 낮아 매우 안정적입니다. 또한 자기자본비율은 72.19%로 높은 편이며, 유동비율도 213.04%로 단기 지급능력도 우수합니다.',
        timestamp: new Date('2024-12-13T15:20:12'),
      },
    ],
  },
  {
    id: '3',
    title: '최근 3~5년간 매출·영업이…',
    preview: '최근 3~5년간 매출·영업이익 추세는 어떤가요?',
    timestamp: new Date('2024-12-12T09:15:00'),
    messages: [
      {
        id: '3-1',
        type: 'user',
        content: '최근 3~5년간 매출·영업이익 추세는 어떤가요?',
        timestamp: new Date('2024-12-12T09:15:00'),
      },
      {
        id: '3-2',
        type: 'assistant',
        content: '2020년부터 2024년까지의 데이터를 보면:\n- 매출: 2,405억(2020) → 3,367억(2024E), 연평균 8.8% 증가\n- 영업이익: 155억(2020) → 235억(2024E), 연평균 11.0% 증가\n\n매출과 영업이익 모두 지속적인 상승 추세를 보이고 있습니다.',
        timestamp: new Date('2024-12-12T09:15:18'),
      },
    ],
  },
  {
    id: '4',
    title: '전체 주지 중에서 가장 주목…',
    preview: '전체 주요 지표 중에서 가장 주목해야 할 것은?',
    timestamp: new Date('2024-12-11T14:45:00'),
    messages: [
      {
        id: '4-1',
        type: 'user',
        content: '전체 주요 지표 중에서 가장 주목해야 할 것은?',
        timestamp: new Date('2024-12-11T14:45:00'),
      },
      {
        id: '4-2',
        type: 'assistant',
        content: '농심의 경우 다음 지표들이 특히 주목할 만합니다:\n\n1. 영업이익률 (6.84%): 업계 평균 5.23%보다 높아 수익성이 우수\n2. ROE (4.56%): 전년 대비 개선되어 자본 효율성 증가\n3. 부채비율 (38.54%): 업계 평균보다 낮아 재무 안정성 우수\n4. 매출채권회전율 (12.34회): 업계 평균보다 높아 자금 회수 능력 우수',
        timestamp: new Date('2024-12-11T14:45:20'),
      },
    ],
  },
  {
    id: '5',
    title: '시가시가총액이 뭐예요? 왜…',
    preview: '시가총액이 뭐예요? 왜 중요한가요?',
    timestamp: new Date('2024-12-10T11:00:00'),
    messages: [
      {
        id: '5-1',
        type: 'user',
        content: '시가총액이 뭐예요? 왜 중요한가요?',
        timestamp: new Date('2024-12-10T11:00:00'),
      },
      {
        id: '5-2',
        type: 'assistant',
        content: '시가총액(Market Capitalization)은 기업이 발행한 주식 전체의 시장가치를 말합니다.\n\n계산 방법:\n시가총액 = 현재주가 × 보통주 발행주식수\n\n농심의 경우:\n- 현재 주가: 454,000원\n- 발행 주식수: 7,924,000주\n- 시가총액: 약 3.597조원\n\n시가총액은 기업의 크기와 가치를 한눈에 보여주는 지표로, 투자 판단의 중요한 기준이 됩니다.',
        timestamp: new Date('2024-12-10T11:00:25'),
      },
    ],
  },
];
