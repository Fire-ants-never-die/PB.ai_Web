import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// 샘플 데이터 생성 함수
const generateChartData = () => {
  const years = ['2021', '2022', '2023', '2024', '2025'];
  const data = [];

  for (let i = 0; i < 50; i++) {
    const year = 2021 + Math.floor(i / 10);
    const month = (i % 10) * 1.2;

    data.push({
      date: `${year}`,
      실제주가: 300000 + Math.random() * 150000 + Math.sin(i * 0.3) * 50000,
      PB예상: 300000 + i * 1200 + Math.random() * 10000,
      PO예상: 280000 + i * 1100 + Math.random() * 8000,
      isToday: i === 40, // 현재 시점 표시
    });
  }

  return data;
};

interface StockPriceComparisonChartProps {
  className?: string;
}

export function StockPriceComparisonChart({
  className,
}: StockPriceComparisonChartProps) {
  const [period, setPeriod] = useState('5년');
  const [interval, setInterval] = useState('연간');

  const chartData = generateChartData();

  // 최신 가격 가져오기
  const latestData = chartData[chartData.length - 1];

  // Y축 포맷 함수
  const formatYAxis = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  // 툴팁 포맷 함수
  const formatTooltip = (value: number) => {
    return `₩${value.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`;
  };

  // 커스텀 범례
  const CustomLegend = () => {
    return (
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm">
            실제주가{' '}
            <span className="font-semibold text-red-500">
              ₩{latestData.실제주가.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-sm">
            PB(예){' '}
            <span className="font-semibold text-yellow-600">
              ₩{latestData.PB예상.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm">
            PO(예){' '}
            <span className="font-semibold text-green-600">
              ₩{latestData.PO예상.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        {/* 드롭다운 메뉴 */}
        <div className="flex items-center gap-3 mb-6">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1년">1년</SelectItem>
              <SelectItem value="3년">3년</SelectItem>
              <SelectItem value="5년">5년</SelectItem>
              <SelectItem value="10년">10년</SelectItem>
            </SelectContent>
          </Select>

          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="일간">일간</SelectItem>
              <SelectItem value="주간">주간</SelectItem>
              <SelectItem value="월간">월간</SelectItem>
              <SelectItem value="연간">연간</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 차트 */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 80, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                domain={[200000, 500000]}
                ticks={[200000, 250000, 300000, 350000, 400000, 450000, 500000]}
              />
              <Tooltip
                formatter={formatTooltip}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                }}
              />

              {/* 현재 시점 참조선 */}
              <ReferenceLine
                x="2025"
                stroke="#94a3b8"
                strokeDasharray="5 5"
                strokeWidth={1}
              />

              {/* 라인들 */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="실제주가"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="PB예상"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="PO예상"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 커스텀 범례 */}
        <CustomLegend />
      </CardContent>
    </Card>
  );
}
