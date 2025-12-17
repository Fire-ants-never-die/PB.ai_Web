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

// 라인 설정 타입
export interface LineConfig {
  dataKey: string;
  name: string;
  color: string;
}

// 차트 데이터 포인트 타입
export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface DynamicLineChartProps {
  data: ChartDataPoint[];
  lines: LineConfig[];
  xAxisKey: string;
  className?: string;
  height?: number;
  showLegend?: boolean;
}

// 커스텀 툴팁
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] p-4 min-w-[160px]">
        <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5] mb-3">
          {label}
        </p>
        <div className="flex flex-col gap-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-[2px]"
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex flex-col">
                <p className="text-[12px] text-[#6B7280] leading-[1.5]">
                  {entry.name}
                </p>
                <p className="text-[14px] font-semibold text-[#191B1C] leading-[1.5]">
                  {typeof entry.value === 'number' ? `$${entry.value.toFixed(2)}` : entry.value}
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

// 커스텀 범례
interface CustomLegendProps {
  lines: LineConfig[];
}

const CustomLegend = ({ lines }: CustomLegendProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {lines.map((line) => (
        <div key={line.dataKey} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: line.color }}
          />
          <span className="text-[13px] text-[#6B7280]">{line.name}</span>
        </div>
      ))}
    </div>
  );
};

export const DynamicLineChart = ({
  data,
  lines,
  xAxisKey,
  className,
  height = 320,
  showLegend = true,
}: DynamicLineChartProps) => {
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
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 60, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#6B7280', fontSize: 13 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            orientation="right"
            domain={['dataMin - 100', 'dataMax + 100']}
            tick={{ fill: '#6B7280', fontSize: 13 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* 동적으로 라인 생성 */}
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: line.color, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* 커스텀 범례 */}
      {showLegend && <CustomLegend lines={lines} />}
    </div>
  );
};
