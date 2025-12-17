import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
  Cell,
  CartesianGrid,
  ComposedChart,
  Line,
} from 'recharts';
import { useMemo, useState } from 'react';

interface RevenueData {
  year: string;
  revenue: number;
}

interface RevenueChartProps {
  data: Record<string, number>; // { "2024": 1500000000000, "2023": 2800000000000 }
}

// 숫자를 조 단위로 포맷팅
const formatToTrillion = (value: number): string => {
  const trillion = value / 1000000000000;
  return `${trillion.toFixed(1)}조`;
};

// 억 단위로 포맷팅
const formatToEok = (value: number): string => {
  const eok = value / 100000000;
  return `${Math.round(eok).toLocaleString()}억원`;
};

// 세로축 눈금 계산
const calculateYAxisTicks = (maxValue: number): number[] => {
  const trillion = maxValue / 1000000000000;
  const roundedMax = Math.ceil(trillion * 2) / 2; // 0.5조 단위로 올림
  const stepCount = Math.ceil(roundedMax / 0.5);
  const ticks: number[] = [];

  for (let i = 0; i <= stepCount; i++) {
    ticks.push((i * 0.5) * 1000000000000);
  }

  return ticks;
};

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 데이터 변환 및 정렬
  const chartData: RevenueData[] = useMemo(
    () =>
      Object.entries(data)
        .map(([year, revenue]) => ({
          year,
          revenue,
        }))
        .sort((a, b) => {
          // 년도 정렬 (2025/06 같은 형식 고려)
          const yearA = parseInt(a.year.split('/')[0]);
          const yearB = parseInt(b.year.split('/')[0]);
          return yearA - yearB;
        }),
    [data]
  );

  // 최대값 계산
  const maxRevenue = chartData.length > 0 ? Math.max(...chartData.map((d) => d.revenue)) : 0;
  const yAxisTicks = maxRevenue ? calculateYAxisTicks(maxRevenue) : [0, 0.5 * 1_000_000_000_000];
  const yAxisDomain: [number, number] = [0, yAxisTicks[yAxisTicks.length - 1] || 1];

  // 커스텀 툴팁 - 각 막대 높이 중간에 고정
  const CustomTooltip = ({ active, payload, coordinate, viewBox }: TooltipProps<number, string>) => {
    if (
      active &&
      payload &&
      payload.length &&
      coordinate &&
      viewBox &&
      typeof payload[0].value === 'number'
    ) {
      const value = payload[0].value;
      const chartHeight = viewBox.height;
      const barHeight = (value / yAxisDomain[1]) * chartHeight;
      const midY = viewBox.y + chartHeight - barHeight / 2;
      const x = coordinate.x;

      return (
        <div
          className="bg-white rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] p-4 min-w-[140px]"
          style={{
            position: 'absolute',
            top: midY,
            left: x,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5]">
              {payload[0].payload.year}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-[2px] bg-graph_yellow"></div>
              <div className="flex flex-col">
                <p className="text-[12px] text-[#6B7280] leading-[1.5]">매출액</p>
                <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5]">
                  {formatToEok(value)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[450px] bg-white rounded-lg p-6 relative">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 60, left: 8, bottom: 70 }}
          barCategoryGap="28%"
        >
          <CartesianGrid stroke="#E6E8EB" strokeDasharray="2 2" />

          <XAxis
            dataKey="year"
            tick={{ fill: '#6B7280', fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />

          <YAxis
            orientation="right"
            ticks={yAxisTicks}
            domain={yAxisDomain}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatToTrillion}
            dx={10}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(234,171,60,0.08)' }}
            allowEscapeViewBox={{ x: true, y: true }}
          />

          <Bar
            dataKey="revenue"
            radius={[12, 12, 4, 4]}
            maxBarSize={56}
            animationDuration={900}
            animationBegin={0}
            animationEasing="ease-out"
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={hoveredIndex === index ? '#EAAB3C' : '#F5CC84'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 범례 - 그래프 내부 하단 중앙 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded">
          <div className="w-3 h-3 rounded-[2px] bg-graph_yellow"></div>
          <span className="text-[13px] text-[#6B7280]">매출액</span>
        </div>
      </div>
    </div>
  );
};

// 막대 + 꺾은선 조합 버전
export const RevenueComboChart = ({ data }: RevenueChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chartData: RevenueData[] = useMemo(
    () =>
      Object.entries(data)
        .map(([year, revenue]) => ({
          year,
          revenue,
        }))
        .sort((a, b) => {
          const yearA = parseInt(a.year.split('/')[0]);
          const yearB = parseInt(b.year.split('/')[0]);
          return yearA - yearB;
        }),
    [data]
  );

  const maxRevenue = chartData.length > 0 ? Math.max(...chartData.map((d) => d.revenue)) : 0;
  const yAxisTicks = maxRevenue ? calculateYAxisTicks(maxRevenue) : [0, 0.5 * 1_000_000_000_000];
  const yAxisDomain: [number, number] = [0, yAxisTicks[yAxisTicks.length - 1] || 1];

  const CustomTooltip = ({ active, payload, coordinate, viewBox }: TooltipProps<number, string>) => {
    if (
      active &&
      payload &&
      payload.length &&
      coordinate &&
      viewBox &&
      typeof payload[0].value === 'number'
    ) {
      const value = payload[0].value;
      const chartHeight = viewBox.height;
      const barHeight = (value / yAxisDomain[1]) * chartHeight;
      const midY = viewBox.y + chartHeight - barHeight / 2;
      const x = coordinate.x;

      return (
        <div
          className="bg-white rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] p-4 min-w-[140px]"
          style={{
            position: 'absolute',
            top: midY,
            left: x,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5]">
              {payload[0].payload.year}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-[2px] bg-graph_yellow"></div>
              <div className="flex flex-col">
                <p className="text-[12px] text-[#6B7280] leading-[1.5]">매출액</p>
                <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5]">
                  {formatToEok(value)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[450px] bg-white rounded-lg p-6 relative">
      <style>{`
        .recharts-surface:focus {
          outline: none !important;
        }
        .recharts-wrapper:focus {
          outline: none !important;
        }
      `}</style>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 60, left: 8, bottom: 70 }}
          barCategoryGap="28%"
        >
          <CartesianGrid stroke="#E6E8EB" strokeDasharray="2 2" />

          <XAxis
            dataKey="year"
            tick={{ fill: '#6B7280', fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />

          <YAxis
            orientation="right"
            ticks={yAxisTicks}
            domain={yAxisDomain}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatToTrillion}
            dx={10}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(234,171,60,0.08)' }}
            allowEscapeViewBox={{ x: true, y: true }}
          />

          <Bar
            dataKey="revenue"
            radius={[12, 12, 4, 4]}
            maxBarSize={56}
            animationDuration={900}
            animationBegin={0}
            animationEasing="ease-out"
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-bar-${index}`}
                fill={hoveredIndex === index ? '#EAAB3C' : '#F5CC84'}
              />
            ))}
          </Bar>

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#5797F7"
            strokeWidth={2}
            dot={{ r: 3, fill: '#5797F7', stroke: '#5797F7' }}
            activeDot={{ r: 4, fill: '#EAAB3C', stroke: '#EAAB3C' }}
            isAnimationActive
            animationDuration={700}
            animationEasing="ease-out"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded">
          <div className="w-3 h-3 rounded-[2px] bg-graph_yellow"></div>
          <span className="text-[13px] text-[#6B7280]">매출액</span>
        </div>
      </div>
    </div>
  );
};
