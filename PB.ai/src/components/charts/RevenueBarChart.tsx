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

interface RevenueBarChartProps {
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

// 커스텀 툴팁 컴포넌트
function CustomTooltip({ active, payload, coordinate }: any) {
  if (!active || !payload || !payload[0] || !coordinate) return null;

  const data = payload[0].payload as RevenueData & { displayValue: number };
  const { displayValue, unit } = formatValue(data.value);

  // 차트 컨테이너의 너비를 기준으로 툴팁 위치 조정
  const chartWidth = 800; // 대략적인 차트 너비
  const tooltipWidth = 120; // 툴팁 예상 너비

  // 왼쪽/오른쪽 끝에서는 툴팁이 잘리지 않도록 조정
  let xOffset = 10;
  if (coordinate.x < tooltipWidth / 2) {
    // 왼쪽 끝
    xOffset = 20;
  } else if (coordinate.x > chartWidth - tooltipWidth / 2) {
    // 오른쪽 끝
    xOffset = -tooltipWidth - 10;
  } else {
    // 중간
    xOffset = -(tooltipWidth / 2);
  }

  return (
    <div
      className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg"
      style={{
        position: 'relative',
        left: `${xOffset}px`,
      }}
    >
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{data.year}</p>
        <p className="text-sm font-bold">
          {displayValue.toFixed(1)}
          {unit}
        </p>
      </div>
    </div>
  );
}

export function RevenueBarChart({ data, className }: RevenueBarChartProps) {
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
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--graph-yellow))" stopOpacity={1} />
              <stop offset="100%" stopColor="hsl(var(--graph-yellow))" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />

          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
            position={{ y: 0 }}
            allowEscapeViewBox={{ x: false, y: true }}
          />

          <Bar
            dataKey="displayValue"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: 'hsl(var(--graph-yellow))' }}
        />
        <span className="text-sm text-muted-foreground">매출액</span>
      </div>
    </div>
  );
}
