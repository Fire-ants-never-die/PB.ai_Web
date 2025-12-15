---
name: stock-chart
description: 인터랙티브 주식 차트 생성 (Recharts)
---
Create interactive stock chart with advanced hover interactions.

# Reference Pattern

Use the following interaction pattern from the reference code:
[레퍼런스 코드 붙여넣기]

# Requirements

1. **Chart Library**: Recharts
2. **Interactions**:

   - Custom tooltip (semi-transparent)
   - Crosshair on hover
   - Smooth animations
   - Multiple data series support
3. **Customization**:

   - Theme colors from Tailwind
   - Responsive sizing
   - Dark mode support
4. **Performance**:

   - Memoize expensive calculations
   - Virtualize if > 1000 data points

# Component Structure

```tsx
'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStockChartData } from '@/lib/api/hooks/useStockChartData';

export function StockChart() {
  const { data, isLoading } = useStockChartData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
        {/* Tooltip content */}
      </div>
    );
  };

  if (isLoading) return <ChartSkeleton />;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        {/* Chart configuration */}
      </LineChart>
    </ResponsiveContainer>
  );
}
```

Include loading states and error handling!
