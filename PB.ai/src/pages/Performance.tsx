
import { PageLayout } from '@/components/layout/PageLayout';
import { DynamicLineChart, type LineConfig, type ChartDataPoint } from '@/components/charts/DynamicLineChart';

// Generate mock performance data - 2개 라인
const generatePerformanceData = () => {
  const baseValue = 10000;
  const volatility = 1.5;
  const days = 30;
  const portfolioValues = [baseValue];
  const marketValues = [baseValue];

  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  for (let i = 1; i < days; i++) {
    const portfolioChange = (Math.random() - 0.45) * volatility;
    const marketChange = (Math.random() - 0.5) * (volatility * 0.8);

    portfolioValues.push(
      parseFloat((portfolioValues[i-1] * (1 + portfolioChange / 100)).toFixed(2))
    );

    marketValues.push(
      parseFloat((marketValues[i-1] * (1 + marketChange / 100)).toFixed(2))
    );
  }

  return dates.map((date, i) => ({
    date,
    portfolio: portfolioValues[i],
    market: marketValues[i]
  }));
};

// Generate mock performance data - 3개 라인
const generateThreeLineData = () => {
  const baseValue = 10000;
  const volatility = 1.5;
  const days = 30;
  const values1 = [baseValue];
  const values2 = [baseValue];
  const values3 = [baseValue];

  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  for (let i = 1; i < days; i++) {
    const change1 = (Math.random() - 0.45) * volatility;
    const change2 = (Math.random() - 0.5) * (volatility * 0.8);
    const change3 = (Math.random() - 0.48) * (volatility * 0.9);

    values1.push(parseFloat((values1[i-1] * (1 + change1 / 100)).toFixed(2)));
    values2.push(parseFloat((values2[i-1] * (1 + change2 / 100)).toFixed(2)));
    values3.push(parseFloat((values3[i-1] * (1 + change3 / 100)).toFixed(2)));
  }

  return dates.map((date, i) => ({
    date,
    line1: values1[i],
    line2: values2[i],
    line3: values3[i]
  }));
};

const performanceData = generatePerformanceData();
const threeLineData = generateThreeLineData();

// 2개 라인 설정
const twoLinesConfig: LineConfig[] = [
  { dataKey: 'portfolio', name: 'Your Portfolio', color: '#EF4444' }, // color/danger/500
  { dataKey: 'market', name: 'S&P 500', color: '#A855F7' }, // NodeColor_purple
];

// 3개 라인 설정
const threeLinesConfig: LineConfig[] = [
  { dataKey: 'line1', name: 'Portfolio A', color: '#EF4444' }, // color/danger/500
  { dataKey: 'line2', name: 'Portfolio B', color: '#A855F7' }, // NodeColor_purple
  { dataKey: 'line3', name: 'Portfolio C', color: '#3B82F6' }, // blue-500
];

const monthlyReturns = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
  (month) => ({
    month,
    value: (Math.random() * 6) - 2,
  })
);

const Performance = () => {

  // Calculate performance metrics
  const initialPortfolio = performanceData[0].portfolio;
  const currentPortfolio = performanceData[performanceData.length - 1].portfolio;
  const totalReturn = ((currentPortfolio - initialPortfolio) / initialPortfolio) * 100;

  // Mock sector allocation data
  const sectorAllocation = [
    { name: 'Technology', value: 45 },
    { name: 'Healthcare', value: 20 },
    { name: 'Financials', value: 15 },
    { name: 'Consumer', value: 10 },
    { name: 'Energy', value: 5 },
    { name: 'Other', value: 5 }
  ];

  return (
    <PageLayout title="Performance">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2개 라인 차트 */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Performance (2 Lines)</h2>
            <div className="h-80">
              <DynamicLineChart
                data={performanceData}
                lines={twoLinesConfig}
                xAxisKey="date"
                showLegend
              />
            </div>
          </div>
        </div>

        {/* 3개 라인 차트 */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Comparison (3 Lines)</h2>
            <div className="h-80">
              <DynamicLineChart
                data={threeLineData}
                lines={threeLinesConfig}
                xAxisKey="date"
                showLegend
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Return</p>
                <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Initial Investment</p>
                <p className="text-xl font-bold">${initialPortfolio.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-xl font-bold">${currentPortfolio.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absolute Return</p>
                <p className={`text-xl font-bold ${(currentPortfolio - initialPortfolio) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${(currentPortfolio - initialPortfolio).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sector Allocation</h2>
            <div className="space-y-4">
              {sectorAllocation.map((sector) => (
                <div key={sector.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{sector.name}</span>
                    <span className="font-medium">{sector.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${sector.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Returns (%)</h2>
            <div className="grid grid-cols-3 gap-2">
              {monthlyReturns.map(({ month, value }) => (
                <div key={month} className="text-center p-2">
                  <p className="text-xs text-muted-foreground">{month}</p>
                  <p className={`text-sm font-medium ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {value >= 0 ? '+' : ''}{value.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Performance;
