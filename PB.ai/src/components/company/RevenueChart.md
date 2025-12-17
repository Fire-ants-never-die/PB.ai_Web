# RevenueChart 컴포넌트 사용 가이드

## 개요
`RevenueChart`는 연도별 매출액을 시각화하는 막대 그래프 컴포넌트입니다. Recharts 라이브러리를 기반으로 구축되었으며, 동적 데이터와 자동 스케일링을 지원합니다.

## 주요 기능

### 1. 동적 데이터 처리
- 가로축(X축): 년도 값이 자동으로 정렬됩니다.
- 세로축(Y축): 매출액 값에 따라 자동으로 스케일이 조정됩니다.
- `2025/06` 같은 월별 데이터도 지원합니다.

### 2. 자동 스케일링
- 최대 매출액에 따라 세로축 범위를 자동 계산합니다.
- 0.5조 단위로 눈금을 표시합니다.
- 데이터가 변경되어도 자동으로 적응합니다.

### 3. 인터랙티브 기능
- **Hover 효과**: 막대에 마우스를 올리면 색상이 변경됩니다.
  - 기본 색상: `#F5CC84` (graph_yellow)
  - Hover 색상: `#EAAB3C` (graph_Yellow)
- **툴팁**: 각 막대에 마우스를 올리면 상세 정보가 표시됩니다.
  - 년도
  - 매출액 (억원 단위)

## 사용 방법

### 기본 사용
```typescript
import { RevenueChart } from '@/components/company/RevenueChart';

function MyComponent() {
  // API로부터 받은 데이터
  const revenueData = {
    "2021": 1900000000000,  // 1.9조원
    "2022": 2200000000000,  // 2.2조원
    "2023": 2800000000000,  // 2.8조원
    "2024": 2700000000000,  // 2.7조원
    "2025/06": 2400000000000, // 2.4조원
  };

  return <RevenueChart data={revenueData} />;
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `Record<string, number>` | Yes | 년도를 키로, 매출액(원 단위)을 값으로 하는 객체 |

### 데이터 형식

#### 입력 데이터
- **키(년도)**: 문자열 형식 (예: `"2024"`, `"2025/06"`)
- **값(매출액)**: 숫자 형식, 원(KRW) 단위 (예: `1500000000000`은 1.5조원)

#### 예시
```typescript
const data = {
  "2021": 1900000000000,  // 1조 9천억원
  "2022": 2200000000000,  // 2조 2천억원
  "2023": 2800000000000,  // 2조 8천억원
  "2024": 2700000000000,  // 2조 7천억원
  "2025/06": 2400000000000, // 2조 4천억원 (2025년 6월까지)
};
```

## API 연동 예시

### 1. React Query 사용
```typescript
import { useQuery } from '@tanstack/react-query';
import { RevenueChart } from '@/components/company/RevenueChart';

function CompanyRevenue({ companyId }: { companyId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['revenue', companyId],
    queryFn: async () => {
      const response = await fetch(`/api/companies/${companyId}/revenue`);
      return response.json();
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  return <RevenueChart data={data} />;
}
```

### 2. 일반 fetch 사용
```typescript
import { useState, useEffect } from 'react';
import { RevenueChart } from '@/components/company/RevenueChart';

function CompanyRevenue({ companyId }: { companyId: string }) {
  const [data, setData] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch(`/api/companies/${companyId}/revenue`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [companyId]);

  if (!data) return <div>로딩 중...</div>;

  return <RevenueChart data={data} />;
}
```

## 커스터마이징

### 차트 높이 변경
```typescript
// RevenueChart.tsx 내부의 h-[400px] 값을 수정
<div className="w-full h-[500px]">  // 400px → 500px
```

### 색상 변경
`tailwind.config.js`에서 색상을 수정할 수 있습니다:
```javascript
colors: {
  graph_yellow: "#F5CC84",  // 기본 색상
  graph_Yellow: "#EAAB3C",  // Hover 색상
}
```

### 막대 너비 조정
`RevenueChart.tsx`에서 `maxBarSize` prop을 수정:
```typescript
<Bar
  dataKey="revenue"
  maxBarSize={80}  // 60 → 80
  ...
/>
```

## 스타일링

### 컨테이너 스타일
```typescript
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <RevenueChart data={revenueData} />
</div>
```

### 전체 페이지 레이아웃
```typescript
<div className="flex flex-col gap-8">
  <h2 className="text-2xl font-semibold text-[#191B1C]">
    연도별 매출액
  </h2>
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <RevenueChart data={revenueData} />
  </div>
</div>
```

## 주의사항

1. **데이터 단위**: 반드시 원(KRW) 단위로 데이터를 전달해야 합니다.
2. **년도 형식**: 문자열 형식으로 전달해야 합니다.
3. **빈 데이터**: 빈 객체를 전달하면 그래프가 표시되지 않습니다.
4. **숫자 형식**: 매출액은 숫자(number) 타입이어야 합니다.

## 트러블슈팅

### 그래프가 표시되지 않음
- 데이터 형식을 확인하세요.
- 컨테이너에 높이가 지정되어 있는지 확인하세요.

### 스케일이 이상함
- 데이터 값이 너무 작거나 큰지 확인하세요.
- 원(KRW) 단위인지 확인하세요.

### 툴팁이 표시되지 않음
- Recharts의 Tooltip 컴포넌트가 올바르게 임포트되었는지 확인하세요.
