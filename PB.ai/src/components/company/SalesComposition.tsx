import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const SalesComposition = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const salesData = [
    { name: '라면', value: 81.8, percentage: '81.8%', color: '#5797F7' },
    { name: '기타', value: 18.4, percentage: '18.4%', color: '#FFA353' },
    { name: '스낵', value: 14.4, percentage: '14.4%', color: '#8DD3BB' },
    { name: '매출 에누리등', value: 14.5, percentage: '-14.5%', color: '#FFD666' }, // Use positive value for chart
  ];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        2. 매출 산업 구성
      </h2>
      <div className="bg-[#F7F9FB] rounded-[10px] p-8 flex items-center justify-between">
        {/* Donut Chart */}
        <div className="relative flex items-center justify-center" style={{ width: '213px', height: '208px' }}>
          <ResponsiveContainer width={213} height={208}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius={66}
                outerRadius={104}
                paddingAngle={0}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {salesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={hoveredIndex === null ? 1 : hoveredIndex === index ? 1 : 0.5}
                    style={{
                      filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-1">
            <p className="text-[0.9375rem] text-[#58595B] leading-[150%] font-normal">총 매출액</p>
            <p className="text-[1.5rem] text-[#191B1C] leading-[150%] font-bold">34,387억</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col w-[228px]">
          {salesData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 h-8 px-0 py-1.5 cursor-pointer transition-all duration-300 hover:bg-white/50 rounded"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="w-3 h-3 rounded-sm shrink-0 transition-transform duration-300"
                style={{
                  backgroundColor: item.color,
                  transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)'
                }}
              />
              <p className="flex-1 text-[15px] text-[#191B1C] leading-[1.5] font-normal">
                {item.name}
              </p>
              <p className="flex-1 text-[15px] text-[#191B1C] text-right leading-[1.5] font-normal">
                {item.percentage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
