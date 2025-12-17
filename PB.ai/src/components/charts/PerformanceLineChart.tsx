import { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { cn } from '@/lib/utils';

interface PerformanceDataPoint {
  date: string;
  portfolio: number;
  market: number;
}

interface PerformanceLineChartProps {
  data: PerformanceDataPoint[];
  className?: string;
  showLegend?: boolean;
}

export const PerformanceLineChart = ({
  data,
  className,
  showLegend = true,
}: PerformanceLineChartProps) => {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  // Y축 도메인 계산
  const yDomain = useMemo(() => {
    if (data.length === 0) return [0, 100];

    const allValues = data.flatMap((d) => [d.portfolio, d.market]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;

    return [
      Math.floor(min - padding),
      Math.ceil(max + padding),
    ];
  }, [data]);

  // 커스텀 툴팁
  type CustomTooltipProps = TooltipProps<number, string> & {
    payload?: Array<{
      color?: string;
      name?: string;
      value?: number | string;
      payload?: PerformanceDataPoint;
    }>;
  };

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    const items = payload as CustomTooltipProps['payload'];
    if (active && items && items.length) {
      return (
        <div className="bg-white rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] p-4 min-w-[160px]">
          <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5] mb-3">
            {items[0].payload?.date}
          </p>
          <div className="flex flex-col gap-2">
            {items.map((entry, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-[2px]"
                  style={{ backgroundColor: entry.color }}
                />
                <div className="flex flex-col">
                  <p className="text-[12px] text-[#6B7280] leading-[1.5]">
                    {entry.name === 'portfolio' ? '포트폴리오' : 'S&P 500'}
                  </p>
                  <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5]">
                    ${typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn('w-full', className)}>
      <style>{`
        .recharts-surface:focus {
          outline: none !important;
        }
        .recharts-wrapper:focus {
          outline: none !important;
        }
      `}</style>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 60, left: 8, bottom: 20 }}
        >
          {/* 그리드 */}
          <CartesianGrid
            stroke="#E6E8EB"
            strokeDasharray="2 2"
            vertical={false}
          />

          {/* X축 */}
          <XAxis
            dataKey="date"
            tick={{ fill: '#6B7280', fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />

          {/* Y축 - 오른쪽 */}
          <YAxis
            orientation="right"
            domain={yDomain}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            dx={10}
          />

          {/* 툴팁 */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          {/* 포트폴리오 라인 */}
          <Line
            type="monotone"
            dataKey="portfolio"
            name="portfolio"
            stroke="#5797F7"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              fill: '#5797F7',
              stroke: '#fff',
              strokeWidth: 2,
            }}
            opacity={hoveredLine === 'market' ? 0.3 : 1}
            onMouseEnter={() => setHoveredLine('portfolio')}
            onMouseLeave={() => setHoveredLine(null)}
            animationDuration={800}
            animationEasing="ease-out"
          />

          {/* 시장 라인 */}
          <Line
            type="monotone"
            dataKey="market"
            name="market"
            stroke="#8DD3BB"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              fill: '#8DD3BB',
              stroke: '#fff',
              strokeWidth: 2,
            }}
            opacity={hoveredLine === 'portfolio' ? 0.3 : 1}
            onMouseEnter={() => setHoveredLine('market')}
            onMouseLeave={() => setHoveredLine(null)}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 범례 */}
      {showLegend && (
        <div className="flex items-center justify-center gap-6 mt-4">
          <div
            className="flex items-center gap-2 cursor-pointer transition-opacity"
            style={{ opacity: hoveredLine === 'market' ? 0.5 : 1 }}
            onMouseEnter={() => setHoveredLine('portfolio')}
            onMouseLeave={() => setHoveredLine(null)}
          >
            <div className="w-3 h-3 rounded-[2px] bg-[#5797F7]" />
            <span className="text-[13px] text-[#6B7280]">포트폴리오</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer transition-opacity"
            style={{ opacity: hoveredLine === 'portfolio' ? 0.5 : 1 }}
            onMouseEnter={() => setHoveredLine('market')}
            onMouseLeave={() => setHoveredLine(null)}
          >
            <div className="w-3 h-3 rounded-[2px] bg-[#8DD3BB]" />
            <span className="text-[13px] text-[#6B7280]">S&P 500</span>
          </div>
        </div>
      )}
    </div>
  );
};
