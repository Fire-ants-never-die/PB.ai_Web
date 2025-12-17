
import { PageLayout } from '@/components/layout/PageLayout';
import { DynamicLineChart, type LineConfig } from '@/components/charts/DynamicLineChart';

// 하드코딩 데이터 - 2개 라인 (이 데이터를 수정해서 테스트하세요!)
type PerfPoint = { date: string; portfolio: number; market: number };
type ThreeLinePoint = { date: string; line1: number; line2: number; line3: number };

const performanceData: PerfPoint[] = [
  { date: 'Jan 1', portfolio: 10000, market: 10000 },
  { date: 'Jan 2', portfolio: 10200, market: 10100 },
  { date: 'Jan 3', portfolio: 10400, market: 10050 },
  { date: 'Jan 4', portfolio: 10300, market: 10200 },
  { date: 'Jan 5', portfolio: 10500, market: 10150 },
  { date: 'Jan 6', portfolio: 10600, market: 10300 },
  { date: 'Jan 7', portfolio: 10550, market: 10250 },
  { date: 'Jan 8', portfolio: 10700, market: 10400 },
  { date: 'Jan 9', portfolio: 10800, market: 10350 },
  { date: 'Jan 10', portfolio: 10750, market: 10500 },
  { date: 'Jan 11', portfolio: 10900, market: 10450 },
  { date: 'Jan 12', portfolio: 11000, market: 10600 },
  { date: 'Jan 13', portfolio: 10950, market: 10550 },
  { date: 'Jan 14', portfolio: 11100, market: 10700 },
  { date: 'Jan 15', portfolio: 11200, market: 10650 },
];

// 하드코딩 데이터 - 3개 라인 (이 데이터를 수정해서 테스트하세요!)
const threeLineData: ThreeLinePoint[] = [
  { date: 'Jan 1', line1: 10000, line2: 10000, line3: 10000 },
  { date: 'Jan 2', line1: 10200, line2: 10100, line3: 10150 },
  { date: 'Jan 3', line1: 10400, line2: 10050, line3: 10300 },
  { date: 'Jan 4', line1: 10300, line2: 10200, line3: 10250 },
  { date: 'Jan 5', line1: 10500, line2: 10150, line3: 10400 },
  { date: 'Jan 6', line1: 10600, line2: 10300, line3: 10500 },
  { date: 'Jan 7', line1: 10550, line2: 10250, line3: 10450 },
  { date: 'Jan 8', line1: 10700, line2: 10400, line3: 10600 },
  { date: 'Jan 9', line1: 10800, line2: 10350, line3: 10700 },
  { date: 'Jan 10', line1: 10750, line2: 10500, line3: 10650 },
  { date: 'Jan 11', line1: 10900, line2: 10450, line3: 10800 },
  { date: 'Jan 12', line1: 11000, line2: 10600, line3: 10900 },
  { date: 'Jan 13', line1: 10950, line2: 10550, line3: 10850 },
  { date: 'Jan 14', line1: 11100, line2: 10700, line3: 11000 },
  { date: 'Jan 15', line1: 11200, line2: 10650, line3: 11100 },
];

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

const monthlyReturns: Array<{ month: string; value: number }> =
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => ({
    month,
    value: (Math.random() * 6) - 2,
  }));

const Performance = () => {

  // Calculate performance metrics
  const initialPortfolio = Number(performanceData[0].portfolio);
  const currentPortfolio = Number(performanceData[performanceData.length - 1].portfolio);
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
