# Figma 디자인 구현 가이드

## 📋 개요

이 가이드는 Figma MCP 서버를 사용하여 디자인을 코드로 변환하는 방법을 설명합니다.

## 🎯 구현된 컴포넌트

### 1. FinancialChart (재무 차트)

**위치**: `src/components/charts/FinancialChart.tsx`

**Figma 디자인**: [PB.ai 디자인](https://www.figma.com/design/gkqUGBQOeUC1OnMRsNOXQ0/PB.ai-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=788-14767)

**특징**: 막대 그래프 + 선 그래프 조합 (순이익 & 순이익률)

### 2. RevenueChart (매출액 차트)

**위치**: `src/components/charts/RevenueChart.tsx`

**Figma 디자인**: [PB.ai 디자인](https://www.figma.com/design/gkqUGBQOeUC1OnMRsNOXQ0/PB.ai-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=788-14746)

**특징**: 단순 막대 그래프 (매출액 데이터, 노란색 계열)

## 🔧 MCP 서버 설정

### 1. MCP 설정 파일 위치
```
~/.cursor/mcp.json
```

### 2. 현재 설정된 서버

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "bunx",
      "args": [
        "cursor-talk-to-figma-mcp@latest",
        "--server=vps.sonnylab.com"
      ]
    },
    "Figma": {
      "url": "https://mcp.figma.com/mcp",
      "headers": {}
    }
  }
}
```

### 3. 서버 역할

- **TalkToFigma**: Figma 디자인을 직접 조작하고 편집
- **Figma**: Figma 디자인을 가져오고 코드 생성

## 🚀 사용 방법

### 1. Figma URL로 디자인 가져오기

Cursor에서 다음과 같이 입력:

```
Implement this design from Figma.
@https://www.figma.com/design/[fileKey]/[fileName]?node-id=[nodeId]
```

**실제 예시**:
```
Implement this design from Figma.
@https://www.figma.com/design/gkqUGBQOeUC1OnMRsNOXQ0/PB.ai-디자인?node-id=788-14767
```

### 2. AI가 자동으로 수행하는 작업

1. ✅ Figma 디자인 스크린샷 가져오기
2. ✅ 디자인 컨텍스트 분석 (색상, 레이아웃, 타이포그래피)
3. ✅ 프로젝트 기술 스택 확인 (React, Tailwind, Recharts 등)
4. ✅ 프로젝트 스타일에 맞는 코드 생성
5. ✅ 컴포넌트 파일 생성
6. ✅ 사용 예제 및 문서 작성

## 📦 생성된 파일

```
src/
└── components/
    └── charts/
        ├── FinancialChart.tsx    # 재무 차트 (막대 + 선)
        ├── RevenueChart.tsx      # 매출액 차트 (막대)
        ├── index.ts              # Export 파일
        └── README.md             # 컴포넌트 문서
```

## 🎨 구현된 기능

### FinancialChart 컴포넌트 (재무 차트)

- ✅ **막대 그래프**: 순이익 데이터 (파란색 그라디언트)
- ✅ **선 그래프**: 순이익률 (분홍색 라인)
- ✅ **인터랙티브 툴팁**: 호버 시 데이터 표시
- ✅ **레퍼런스 라인**: 호버 위치 강조
- ✅ **범례**: 데이터 타입 표시
- ✅ **반응형 디자인**: 모든 화면 크기 대응

### RevenueChart 컴포넌트 (매출액 차트)

- ✅ **막대 그래프**: 매출액 데이터 (노란색 그라디언트)
- ✅ **자동 단위 변환**: 억원 → 조원 자동 변환
- ✅ **인터랙티브 툴팁**: 호버 시 데이터 표시
- ✅ **레퍼런스 라인**: 호버 위치 강조
- ✅ **범례**: 데이터 타입 표시
- ✅ **반응형 디자인**: 모든 화면 크기 대응

## 💻 개발 서버 실행

터미널에서 다음 명령어 실행:

```bash
cd /Applications/Github/PB.ai_Web/PB.ai
npm run dev
```

그 다음 브라우저에서:
```
http://localhost:5173/performance
```

## 📝 컴포넌트 사용 예제

### 기본 사용

```tsx
import { FinancialChart } from '@/components/charts';

function MyPage() {
  return <FinancialChart />;
}
```

### 커스텀 데이터 사용

```tsx
import { FinancialChart, RevenueChart } from '@/components/charts';

function MyPage() {
  // 재무 차트 데이터
  const financialData = [
    { period: '2023', netIncome: 1700, netIncomeRate: 3.8 },
    { period: '2024', netIncome: 2600, netIncomeRate: 4.5 },
    { period: '2025/06', netIncome: 2300, netIncomeRate: 4.2 },
  ];

  // 매출액 차트 데이터 (억원 단위)
  const revenueData = [
    { period: '2023', revenue: 25000 }, // 2.5조
    { period: '2024', revenue: 27000 }, // 2.7조
    { period: '2025/06', revenue: 24000 }, // 2.4조
  ];

  return (
    <>
      <FinancialChart
        data={financialData}
        className="w-full h-[500px]"
      />
      <RevenueChart
        data={revenueData}
        className="w-full h-[500px]"
      />
    </>
  );
}
```

### Performance 페이지에 추가됨

`src/pages/Performance.tsx` 파일에 이미 추가되어 있습니다:

```tsx
import { FinancialChart } from '@/components/charts/FinancialChart';
import { RevenueChart } from '@/components/charts/RevenueChart';

// ...

{/* 재무 차트 */}
<div className="lg:col-span-3">
  <div className="bg-card rounded-lg p-6 shadow">
    <h2 className="text-xl font-semibold mb-4">재무 성과 분석</h2>
    <FinancialChart />
  </div>
</div>

{/* 매출액 차트 */}
<div className="lg:col-span-3">
  <div className="bg-card rounded-lg p-6 shadow">
    <h2 className="text-xl font-semibold mb-4">매출액 추이</h2>
    <RevenueChart />
  </div>
</div>
```

## 🎯 주요 포인트

### Figma에서 코드로 자동 변환

1. **디자인 토큰 추출**: 색상, 폰트, 간격 등
2. **레이아웃 분석**: Flexbox, Grid 구조
3. **인터랙션 파악**: 호버, 클릭 등

### 프로젝트 스타일 자동 적용

- Figma에서 생성된 Tailwind CSS → 프로젝트의 Tailwind 테마 적용
- 임시 HTML → Recharts 라이브러리로 변환
- 디자인 시스템 변수 자동 매핑

## 🔄 다른 Figma 디자인 가져오기

같은 방법으로 다른 디자인도 가져올 수 있습니다:

```
# 버튼 컴포넌트 가져오기
@https://www.figma.com/design/[fileKey]/[fileName]?node-id=[buttonNodeId]

# 카드 컴포넌트 가져오기
@https://www.figma.com/design/[fileKey]/[fileName]?node-id=[cardNodeId]

# 전체 페이지 가져오기
@https://www.figma.com/design/[fileKey]/[fileName]?node-id=[pageNodeId]
```

## 🐛 문제 해결

### MCP 서버 연결 실패

1. Cursor 재시작
2. `~/.cursor/mcp.json` 파일 확인
3. Figma 로그인 상태 확인

### 디자인이 제대로 변환되지 않음

1. 노드 ID가 정확한지 확인
2. 디자인이 공개 상태인지 확인
3. 더 구체적인 프롬프트 사용

### 스타일이 일치하지 않음

- `tailwind.config.js`에서 테마 색상 조정
- CSS 변수 확인 (`index.css`)
- 컴포넌트 파일에서 직접 색상 수정

## 📚 참고 자료

- [Recharts 문서](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Figma API](https://www.figma.com/developers/api)

## 📁 생성된 파일 요약

1. `/src/components/charts/FinancialChart.tsx` - 재무 차트 컴포넌트
2. `/src/components/charts/RevenueChart.tsx` - 매출액 차트 컴포넌트
3. `/src/components/charts/index.ts` - Export 파일
4. `/src/components/charts/README.md` - 컴포넌트 상세 문서
5. `/src/pages/Performance.tsx` - 업데이트됨 (두 차트 추가)
6. `/FIGMA_IMPLEMENTATION_GUIDE.md` - 전체 가이드

## 🎨 차트 비교

| 특징 | FinancialChart | RevenueChart |
|------|----------------|--------------|
| 그래프 타입 | 막대 + 선 | 막대 |
| 색상 | 파란색 + 분홍색 | 노란색 |
| 데이터 | 순이익 & 순이익률 | 매출액 |
| Y축 위치 | 오른쪽 | 왼쪽 |
| 단위 | 억원 & % | 조원 |
| Figma 노드 | 788:14767 | 788:14746 |

## 🎉 완료!

이제 Figma 디자인을 Cursor에서 `@Figma URL` 형식으로 멘션하면 자동으로 코드로 변환됩니다!
