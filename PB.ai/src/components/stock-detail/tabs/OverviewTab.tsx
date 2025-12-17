import { useCompanyInfo, useStockPrices, useRevenueData } from '@/lib/api/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { OVERVIEW_LABELS } from '@/lib/data/static';

interface OverviewTabProps {
  code: string;
}

export function OverviewTab({ code }: OverviewTabProps) {
  const { isLoading: isCompanyLoading } = useCompanyInfo(code);
  const { data: stockPrices, isLoading: isPricesLoading } = useStockPrices(code);
  const { data: revenueData, isLoading: isRevenueLoading } = useRevenueData(code);

  if (isCompanyLoading || isPricesLoading || isRevenueLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }

  // Prepare chart data for stock prices
  const stockChartData = stockPrices?.map((price) => ({
    date: price.date,
    price: price.close,
    average: price.close * 0.98, // Mock average line
  }));

  // Prepare chart data for revenue
  const revenueChartData = revenueData?.map((data) => ({
    year: data.year,
    revenue: data.revenue / 100, // Convert to 억
    operatingIncome: data.operatingIncome / 10, // Convert to 십억
  }));

  return (
    <div className="space-y-6">
      {/* Stock Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle>종합분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockChartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => {
                    const [year, month] = value.split('-');
                    return `${year}.${month}`;
                  }}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `₩${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`₩${Number(value).toLocaleString()}`, '주가']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  name="실제주가"
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={0}
                  name="평균주가추이"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue and Operating Income Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{OVERVIEW_LABELS.revenueAnalysis}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `${value}억`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${Number(value).toFixed(0)}억원`, '매출액']}
                  />
                  <Bar dataKey="revenue" fill="#f59e0b" name="매출액" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Operating Income Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{OVERVIEW_LABELS.profitAnalysis}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `${value}십억`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [
                      `${Number(value).toFixed(0)}십억원`,
                      '영업이익',
                    ]}
                  />
                  <Bar dataKey="operatingIncome" fill="#3b82f6" name="영업이익" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Cap Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>{OVERVIEW_LABELS.explanation}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {OVERVIEW_LABELS.marketCapDefinition}
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="font-mono text-sm">{OVERVIEW_LABELS.formula}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{OVERVIEW_LABELS.calculation}</h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">{OVERVIEW_LABELS.period}</span>
                <span className="text-muted-foreground">{OVERVIEW_LABELS.value}</span>
              </div>
              <div className="flex justify-between">
                <span>2024.12</span>
                <span className="font-semibold">₩3.4조</span>
              </div>
              <div className="flex justify-between">
                <span>2023.12</span>
                <span className="font-semibold">₩3.4조</span>
              </div>
              <div className="flex justify-between">
                <span>2022.12</span>
                <span className="font-semibold">₩3.1조</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {OVERVIEW_LABELS.note}
          </p>
          <p className="text-sm text-muted-foreground">
            {OVERVIEW_LABELS.checkpoints}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
