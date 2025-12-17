import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RevenueData {
  year: string;
  value: number; // 원 단위로 받음
}

interface RevenueChartProps {
  data: RevenueData[];
  className?: string;
}

// 값을 적절한 단위로 변환하는 함수
function formatValue(value: number): { displayValue: number; unit: string } {
  const trillion = 1000000000000; // 1조
  const billion = 100000000; // 1억

  if (value >= trillion) {
    return { displayValue: value / trillion, unit: '조' };
  } else if (value >= billion) {
    return { displayValue: value / billion, unit: '억' };
  }
  return { displayValue: value, unit: '원' };
}

// 커스텀 툴팁 컴포넌트 - Figma 디자인 적용
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload as RevenueData & { displayValue: number };
  const { displayValue, unit } = formatValue(data.value);

  return (
    <div
      className="flex flex-col gap-1 items-start justify-center px-2 py-2 rounded-lg border border-[rgba(231,233,235,0.5)] shadow-[0px_2px_4px_0px_rgba(107,109,111,0.4)]"
      style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p
        className="text-[12px] text-center text-[#58595B] leading-normal"
        style={{ fontFamily: '"Pretendard GOV", sans-serif' }}
      >
        {data.year}
      </p>
      <div className="flex gap-1.5 items-center justify-center">
        <div className="flex gap-1 items-center overflow-clip p-1">
          <div className="relative shrink-0 w-4 h-4">
            <div className="absolute left-2 top-2 w-px h-px">
              <div className="absolute bg-[#FFB302] border border-[rgba(0,0,0,0.25)] left-[-4px] top-[-4px] w-2 h-2" />
            </div>
          </div>
          <p
            className="text-[13px] text-[#58595B] leading-[1.5]"
            style={{ fontFamily: '"Pretendard GOV", sans-serif', fontWeight: 400 }}
          >
            매출액
          </p>
        </div>
        <p
          className="text-[13px] text-center text-[#191B1C] leading-[1.5]"
          style={{ fontFamily: '"Pretendard GOV", sans-serif', fontWeight: 400 }}
        >
          ￦{displayValue.toFixed(0)}{unit}
        </p>
      </div>
    </div>
  );
}

export function RevenueChart({ data, className }: RevenueChartProps) {
  // 데이터의 최대값을 기준으로 Y축 스케일 결정
  const { chartData, yAxisConfig } = useMemo(() => {
    if (!data || data.length === 0) {
      return { chartData: [], yAxisConfig: { unit: '원', divisor: 1 } };
    }

    const maxValue = Math.max(...data.map((d) => d.value));
    const { unit } = formatValue(maxValue);

    // Y축에 표시할 값으로 변환
    const divisor = unit === '조' ? 1000000000000 : unit === '억' ? 100000000 : 1;

    const chartData = data.map((item) => ({
      ...item,
      displayValue: item.value / divisor,
    }));

    return {
      chartData,
      yAxisConfig: { unit, divisor },
    };
  }, [data]);

  // Y축 틱 포맷터
  const yAxisTickFormatter = (value: number) => {
    return `${value}${yAxisConfig.unit}`;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 7.33, right: 9.773, left: 1.222, bottom: 7.33 }}
          barSize={32}
          barGap={2.44}
        >
          <defs>
            <linearGradient id="yellowBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--graph-yellow))" stopOpacity={1} />
              <stop offset="100%" stopColor="hsl(var(--graph-yellow))" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#D7D9DB"
            vertical={true}
            horizontal={true}
          />

          <XAxis
            dataKey="year"
            tick={{ fill: '#58595B', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#D7D9DB' }}
          />

          <YAxis
            width={40}
            tickFormatter={yAxisTickFormatter}
            tick={{ fill: '#58595B', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#D7D9DB' }}
            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
            position={{ y: 60 }}
            allowEscapeViewBox={{ x: false, y: false }}
            wrapperStyle={{
              zIndex: 1000,
              pointerEvents: 'none'
            }}
          />

          <Bar
            dataKey="displayValue"
            fill="url(#yellowBarGradient)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: 'hsl(var(--graph-yellow))' }}
        />
        <span className="text-sm text-muted-foreground">매출액</span>
      </div>
    </div>
  );
}
