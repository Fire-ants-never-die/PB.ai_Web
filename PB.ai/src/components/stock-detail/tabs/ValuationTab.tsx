import { useValuationIndicators, useStockPrices } from '@/lib/api/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { VALUATION_LABELS } from '@/lib/data/static';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState } from 'react';

interface ValuationTabProps {
  code: string;
}

export function ValuationTab({ code }: ValuationTabProps) {
  const { data: valuationIndicators, isLoading: isValuationLoading } =
    useValuationIndicators(code);
  const { data: stockPrices, isLoading: isPricesLoading } = useStockPrices(code);

  const [targetPrice, setTargetPrice] = useState([524000]);
  const [investmentPeriod, setInvestmentPeriod] = useState([4]);

  if (isValuationLoading || isPricesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  // Calculate average fair value
  const avgFairValue =
    valuationIndicators && valuationIndicators.length > 0
      ? Math.round(
          valuationIndicators.reduce((sum, ind) => sum + ind.fairValue, 0) /
            valuationIndicators.length
        )
      : 0;

  const currentPrice =
    valuationIndicators && valuationIndicators.length > 0
      ? valuationIndicators[0].currentPrice
      : 0;

  // Prepare chart data - last 12 months
  const recentPrices = stockPrices?.slice(-12).map((price) => ({
    date: price.date,
    price: price.close,
    fairValue: avgFairValue,
  }));

  return (
    <div className="space-y-6">
      {/* Stock Price vs Fair Value Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{VALUATION_LABELS.comprehensive}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recentPrices}>
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
                  formatter={(value) => `₩${Number(value).toLocaleString()}`}
                />
                <Legend />
                <ReferenceLine
                  y={currentPrice}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label="현재가"
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="주가"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="fairValue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="적정가"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">
                {VALUATION_LABELS.currentPrice}
              </div>
              <div className="text-2xl font-bold">
                ₩{currentPrice.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">
                {VALUATION_LABELS.fairValue}
              </div>
              <div className="text-2xl font-bold">
                ₩{avgFairValue.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">상승 여력</div>
              <div
                className={`text-2xl font-bold ${
                  avgFairValue > currentPrice
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}
              >
                {avgFairValue > currentPrice ? '+' : ''}
                {(((avgFairValue - currentPrice) / currentPrice) * 100).toFixed(
                  2
                )}
                %
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Models */}
      <Card>
        <CardHeader>
          <CardTitle>가치평가 모델별 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {valuationIndicators?.map((indicator, index) => {
              const upside =
                ((indicator.fairValue - indicator.currentPrice) /
                  indicator.currentPrice) *
                100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{indicator.name}</span>
                    <div className="text-right">
                      <div className="font-semibold">
                        ₩{indicator.fairValue.toLocaleString()}
                      </div>
                      <div
                        className={`text-sm ${
                          upside > 0 ? 'text-red-600' : 'text-blue-600'
                        }`}
                      >
                        {upside > 0 ? '+' : ''}
                        {upside.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${
                        upside > 0 ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.min(
                          Math.abs(
                            ((indicator.fairValue - indicator.range.min) /
                              (indicator.range.max - indicator.range.min)) *
                              100
                          ),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₩{indicator.range.min.toLocaleString()}</span>
                    <span>₩{indicator.range.max.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Investment Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>투자 시뮬레이터</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Target Price Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">목표 가격</label>
              <span className="text-sm font-semibold">
                ₩{targetPrice[0].toLocaleString()}
              </span>
            </div>
            <Slider
              value={targetPrice}
              onValueChange={setTargetPrice}
              min={324000}
              max={679000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₩324,000</span>
              <span>₩679,000</span>
            </div>
          </div>

          {/* Investment Period Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">투자 기간</label>
              <span className="text-sm font-semibold">
                {investmentPeriod[0]}개월
              </span>
            </div>
            <Slider
              value={investmentPeriod}
              onValueChange={setInvestmentPeriod}
              min={1}
              max={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1개월</span>
              <span>12개월</span>
            </div>
          </div>

          {/* Expected Return */}
          <div className="rounded-lg bg-muted p-6">
            <div className="mb-2 text-sm text-muted-foreground">
              예상 수익률
            </div>
            <div
              className={`text-3xl font-bold ${
                targetPrice[0] > currentPrice
                  ? 'text-red-600'
                  : 'text-blue-600'
              }`}
            >
              {targetPrice[0] > currentPrice ? '+' : ''}
              {(((targetPrice[0] - currentPrice) / currentPrice) * 100).toFixed(
                2
              )}
              %
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {investmentPeriod[0]}개월 기준
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            {VALUATION_LABELS.disclaimer}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
