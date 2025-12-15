# Stock Market MVP Project

## Project Overview

A high-performance stock market dashboard MVP with real-time charts, data tables, and AI chat integration.

## Tech Stack

- **Framework**: Next.js 14 + TypeScript + App Router
- **Styling**: Tailwind CSS v3
- **UI Components**: Radix UI
- **Charts**: Recharts
- **State**: Zustand
- **Drag & Drop**: react-draggable
- **API**: Mock data with migration-ready structure

## Architecture Principles

1. **Data Separation**: All mock data in `/lib/data/mock/`
2. **Type Safety**: Strict TypeScript, all interfaces in `/lib/types/`
3. **API Layer**: Hooks in `/lib/api/hooks/` - easy API migration
4. **Component Structure**: Atomic design pattern
5. **Performance**: Code splitting, lazy loading, memoization

## File Structure

src/
├── app/
│   ├── (stock)/
│   │   ├── layout.tsx              # 메인 레이아웃 (사이드바 + 탭)
│   │   ├── overview/page.tsx       # 탭 1: 기업 overview
│   │   ├── financials/page.tsx     # 탭 2: 재무현황분석
│   │   ├── indicators/page.tsx     # 탭 3: 투자지표
│   │   ├── valuation/page.tsx      # 탭 4: 주식가치평가
│   │   └── chat-history/page.tsx   # 탭 5: 채팅 (대화목록)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             # 사이드바 (토글 가능)
│   │   ├── TabNavigation.tsx       # 5개 탭 네비게이션
│   │   ├── MainContainer.tsx       # 중앙 정렬 컨테이너
│   │   └── ChatWidget.tsx          # 플로팅 채팅 위젯 (탭 1-4에서 사용)
│   ├── overview/                   # 탭 1 컴포넌트들(just 예시임)
│   │   ├── CompanyHeader.tsx
│   │   ├── StockPriceChart.tsx
│   │   ├── KeyMetrics.tsx
│   │   └── NewsSection.tsx
│   ├── financials/                 # 탭 2 컴포넌트들(just 예시임)
│   │   ├── IncomeStatement.tsx
│   │   ├── BalanceSheet.tsx
│   │   ├── CashFlow.tsx
│   │   └── FinancialCharts.tsx
│   ├── indicators/                 # 탭 3 컴포넌트들(just 예시임)
│   │   ├── ValuationMetrics.tsx
│   │   ├── ProfitabilityRatios.tsx
│   │   ├── GrowthIndicators.tsx
│   │   └── ComparisonTable.tsx
│   ├── valuation/                  # 탭 4 컴포넌트들(just 예시임)
│   │   ├── DCFCalculator.tsx
│   │   ├── PEGAnalysis.tsx
│   │   ├── FairValueChart.tsx
│   │   └── SensitivityTable.tsx
│   └── chat/                       # 탭 5 컴포넌트들(just 예시임)
│       ├── ChatHistoryList.tsx
│       ├── ChatSessionCard.tsx
│       └── ChatSearchBar.tsx
├── lib/
│   ├── data/
│   │   ├── static/                 # 고정 데이터
│   │   │   ├── labels.ts           # 레이블, 제목 등
│   │   │   ├── categories.ts       # 카테고리, 섹션명
│   │   │   └── ui-config.ts        # UI 설정값
│   │   └── mock/                   # 동적(변동) 데이터
│   │       ├── overview.mock.ts    # 주가, 차트 데이터
│   │       ├── financials.mock.ts  # 재무제표 숫자
│   │       ├── indicators.mock.ts  # 투자지표 숫자
│   │       ├── valuation.mock.ts   # 가치평가 숫자
│   │       └── chat.mock.ts        # 채팅 대화 내역
│   ├── api/
│   │   └── hooks/
│   │       ├── useOverviewData.ts
│   │       ├── useFinancials.ts
│   │       ├── useIndicators.ts
│   │       ├── useValuation.ts
│   │       └── useChatHistory.ts
│   ├── types/
│   │   ├── overview.types.ts
│   │   ├── financials.types.ts
│   │   ├── indicators.types.ts
│   │   ├── valuation.types.ts
│   │   └── chat.types.ts
│   └── store/
│       ├── useLayoutStore.ts       # 사이드바/채팅 상태 관리
│       └── useTabStore.ts          # 현재 탭 상태

## Key Requirements

1. **Responsive Layout**

   - Sidebar toggle (240px → 0px)
   - Content center-aligned regardless of sidebar state
   - Mobile-first approach
2. **Chart Interactions**

   - Hover tooltips with semi-transparent background
   - Crosshair on hover
   - Smooth animations
   - Real-time data updates
3. **Data Tables**

   - Sortable columns
   - Row hover effects (bg-gray-50 → bg-gray-100)
   - Responsive design
   - Pagination
4. **AI Chat Widget**

   - Draggable position
   - Persistent state (localStorage)
   - Minimize/maximize animations
   - Stay within viewport bounds
5. **Data Structure**

   - Mock data completely separated from UI
   - Type-safe interfaces
   - Easy API migration path
   - Dynamic data binding

## Reference Code Patterns

[여기에 레퍼런스 코드 붙여넣기]

## Coding Standards

-
- Use 'use client' only when necessary
- Prefer server components
- ESLint + Prettier enforced
- All components must have TypeScript interfaces
- Props destructuring required
- Named exports preferred

## Performance Targets

- Initial Load: < 3s
- Chart Render: < 100ms
- Table Sort: < 50ms
- Chat Toggle: < 200ms

## Notes

- Always separate mock data from components
- All API calls through hooks
- Mobile responsive is critical
- Accessibility: WCAG 2.1 AA minimum
