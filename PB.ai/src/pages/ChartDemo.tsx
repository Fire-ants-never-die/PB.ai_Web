import { RevenueBarChart } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 테스트 데이터
const mockRevenueData = [
  { year: '2021', value: 2405000000000 }, // 2.405조
  { year: '2022', value: 2681000000000 }, // 2.681조
  { year: '2023', value: 2924000000000 }, // 2.924조
  { year: '2024', value: 3145000000000 }, // 3.145조
  { year: '2025/06', value: 2367000000000 }, // 2.367조
];

export default function ChartDemo() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">막대 그래프 데모</h1>

      <div className="space-y-8">
        {/* 조 단위 데이터 */}
        <Card>
          <CardHeader>
            <CardTitle>매출액 추이 (조 단위)</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueBarChart data={mockRevenueData} className="h-[400px]" />
          </CardContent>
        </Card>

        {/* 억 단위 데이터 */}
        <Card>
          <CardHeader>
            <CardTitle>매출액 추이 (억 단위)</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueBarChart
              data={[
                { year: '2021', value: 150000000000 }, // 1,500억
                { year: '2022', value: 180000000000 }, // 1,800억
                { year: '2023', value: 220000000000 }, // 2,200억
                { year: '2024', value: 250000000000 }, // 2,500억
                { year: '2025/06', value: 190000000000 }, // 1,900억
              ]}
              className="h-[400px]"
            />
          </CardContent>
        </Card>

        {/* 다양한 년도 */}
        <Card>
          <CardHeader>
            <CardTitle>10년 매출액 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueBarChart
              data={[
                { year: '2015', value: 1200000000000 },
                { year: '2016', value: 1350000000000 },
                { year: '2017', value: 1500000000000 },
                { year: '2018', value: 1680000000000 },
                { year: '2019', value: 1890000000000 },
                { year: '2020', value: 2100000000000 },
                { year: '2021', value: 2405000000000 },
                { year: '2022', value: 2681000000000 },
                { year: '2023', value: 2924000000000 },
                { year: '2024', value: 3145000000000 },
              ]}
              className="h-[400px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* 사용 예제 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>사용 방법</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg bg-muted p-4">
            <code>{`import { RevenueBarChart } from '@/components/charts';

const data = [
  { year: '2021', value: 2405000000000 }, // 원 단위로 전달
  { year: '2022', value: 2681000000000 },
  { year: '2023', value: 2924000000000 },
];

<RevenueBarChart
  data={data}
  className="h-[400px]"
/>`}</code>
          </pre>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>✅ API에서 받은 데이터를 원 단위로 전달하면 자동으로 조/억 단위로 변환</p>
            <p>✅ Y축 스케일 자동 조정</p>
            <p>✅ 호버시 툴팁 표시 (맨 왼쪽/오른쪽 막대는 자동 위치 조정)</p>
            <p>✅ 반응형 디자인</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
