import { useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface NetIncomeData {
  year: string;
  netIncome: number; // 순이익 (원 단위)
  netIncomeRate: number; // 순이익률 (퍼센트)
}

interface NetIncomeChartProps {
  data: NetIncomeData[];
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

  const data = payload[0].payload as NetIncomeData & { displayNetIncome: number };
  const { displayValue, unit } = formatValue(data.netIncome);

  return (
    <div
      className="flex flex-col gap-1 items-start justify-center px-2 py-2"
      style={{
        borderRadius: '0.5rem',
        border: '1px solid rgba(0, 0, 0, 0.50)',
        backgroundColor: 'rgba(255, 255, 255, 0.50)',
        boxShadow: '0 2px 4px 0 rgba(107, 109, 111, 0.40)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <p
        className="text-[12px] text-center text-[#58595B] leading-normal"
        style={{ fontFamily: '"Pretendard GOV", sans-serif' }}
      >
        {data.year === '2025' ? '2025/06' : data.year}
      </p>
      <div className="flex flex-col gap-0.5">
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-1 items-center overflow-clip p-1">
            <div className="relative shrink-0 w-4 h-4">
              <div className="absolute left-2 top-2 w-px h-px">
                <div className="absolute bg-[#5797F7] border border-[rgba(0,0,0,0.25)] left-[-4px] top-[-4px] w-2 h-2" />
              </div>
            </div>
            <p
              className="text-[13px] text-[#58595B] leading-[1.5]"
              style={{ fontFamily: '"Pretendard GOV", sans-serif', fontWeight: 400 }}
            >
              순이익
            </p>
          </div>
          <p
            className="text-[13px] text-center text-[#191B1C] leading-[1.5]"
            style={{ fontFamily: '"Pretendard GOV", sans-serif', fontWeight: 400 }}
          >
            ￦{displayValue.toFixed(0)}{unit}
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-1 items-center overflow-clip p-1">
            <div className="relative shrink-0 w-4 h-4">
              <div className="absolute left-2 top-2 w-px h-px">
                <div
                  className="absolute left-[-6px] top-[-1px] w-3 h-0.5"
                  style={{ backgroundColor: '#FF46A6' }}
                />
              </div>
            </div>
            <p
              className="text-[13px] text-[#58595B] leading-[1.5]"
              style={{ fontFamily: '"Pretendard GOV", sans-serif', fontWeight: 400 }}
            >
              순이익률
            </p>
          </div>
          <p
            className="text-[13px] text-center text-[#191B1C] leading-[1.5]"
            style={{ fontFamily: '"Pretendard GOV", sans-serif', fontWeight: 400 }}
          >
            {data.netIncomeRate.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}

// 커스텀 범례
function CustomLegend() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-sm bg-[#5797F7]" />
        <span className="text-sm text-[#58595B]">순이익</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-0.5 w-4 bg-[#FF46A6]" />
        <span className="text-sm text-[#58595B]">순이익률</span>
      </div>
    </div>
  );
}

export function NetIncomeChart({ data, className }: NetIncomeChartProps) {
  // 데이터의 최대값을 기준으로 Y축 스케일 결정
  const { chartData, yAxisConfig } = useMemo(() => {
    if (!data || data.length === 0) {
      return { chartData: [], yAxisConfig: { unit: '원', divisor: 1 } };
    }

    const maxValue = Math.max(...data.map((d) => d.netIncome));
    const { unit } = formatValue(maxValue);

    // Y축에 표시할 값으로 변환
    const divisor = unit === '조' ? 1000000000000 : unit === '억' ? 100000000 : 1;

    const chartData = data.map((item) => ({
      ...item,
      displayNetIncome: item.netIncome / divisor,
    }));

    return {
      chartData,
      yAxisConfig: { unit, divisor },
    };
  }, [data]);

  // Y축 틱 포맷터
  const leftYAxisTickFormatter = (value: number) => {
    return `${value}%`;
  };

  const rightYAxisTickFormatter = (value: number) => {
    return `${value}${yAxisConfig.unit}`;
  };

  // X축 틱 포맷터 - "2025"를 "2025/06"으로 변환
  const xAxisTickFormatter = (value: string) => {
    return value === '2025' ? '2025/06' : value;
  };

  return (
    <div className={className}>
      <style>{`
        .recharts-surface,
        .recharts-surface *,
        .recharts-wrapper,
        .recharts-wrapper * {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        .recharts-surface:focus,
        .recharts-surface *:focus,
        .recharts-surface path:focus,
        .recharts-surface g:focus,
        .recharts-rectangle:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <ComposedChart
          data={chartData}
          margin={{ top: 7.33, right: 9.773, left: 1.222, bottom: 7.33 }}
          barSize={32}
          barGap={2.44}
        >
          <defs>
            <linearGradient id="blueBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5797F7" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#5797F7" stopOpacity={0.8} />
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
            tickFormatter={xAxisTickFormatter}
            tick={{ fill: '#58595B', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#D7D9DB' }}
          />

          {/* 왼쪽 Y축 - 순이익률 */}
          <YAxis
            yAxisId="left"
            width={8}
            tickFormatter={leftYAxisTickFormatter}
            tick={{ fill: '#58595B', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#D7D9DB' }}
            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
          />

          {/* 오른쪽 Y축 - 순이익 */}
          <YAxis
            yAxisId="right"
            orientation="right"
            width={40}
            tickFormatter={rightYAxisTickFormatter}
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
            yAxisId="right"
            dataKey="displayNetIncome"
            fill="url(#blueBarGradient)"
            radius={[8, 8, 0, 0]}
          />

          <Line
            yAxisId="left"
            type="linear"
            dataKey="netIncomeRate"
            stroke="#FF46A6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#FF46A6' }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-2">
        <CustomLegend />
      </div>
    </div>
  );
}
