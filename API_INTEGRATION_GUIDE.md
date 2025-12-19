# API 연동 가이드

## 개요
이 프로젝트는 API 명세서(`API_SPECIFICATION.md`)에 맞춰 백엔드 API와 연동되도록 구성되어 있습니다.
현재는 Mock 데이터를 사용하고 있으며, 백엔드 API가 준비되면 환경변수만 변경하면 바로 실제 API를 사용할 수 있습니다.

## 환경 설정

### 1. 환경변수 파일 생성

프로젝트 루트에 `.env` 파일을 생성하세요:

```bash
# .env 파일
VITE_API_BASE_URL=/api/v1
VITE_USE_MOCK_DATA=true
```

### 2. 환경변수 설명

- **`VITE_API_BASE_URL`**: API 베이스 URL
  - 개발 환경: `/api/v1` (프록시 사용)
  - 프로덕션: `https://api.your-domain.com/v1`

- **`VITE_USE_MOCK_DATA`**: Mock 데이터 사용 여부
  - `true`: Mock 데이터 사용 (백엔드 준비 전)
  - `false`: 실제 API 호출 (백엔드 준비 완료 후)

## Mock 데이터에서 실제 API로 전환

### 단계 1: 백엔드 API 준비 확인
`API_SPECIFICATION.md`에 정의된 7개 엔드포인트가 모두 구현되었는지 확인하세요:
- `GET /companies/{code}/profile`
- `GET /companies/{code}/sales-composition`
- `GET /companies/{code}/financial-overview`
- `GET /companies/{code}/financial-health`
- `GET /companies/{code}/industry-description`
- `GET /companies/{code}/financial-ratio-judgment`
- `GET /companies/{code}/financial-analysis-details`

### 단계 2: 환경변수 변경
`.env` 파일에서 `VITE_USE_MOCK_DATA`를 `false`로 변경:

```bash
VITE_API_BASE_URL=https://api.your-domain.com/v1
VITE_USE_MOCK_DATA=false
```

### 단계 3: 개발 서버 재시작
```bash
npm run dev
```

## 파일 구조

```
src/
├── lib/
│   ├── api/
│   │   ├── companyApi.ts              # API 호출 함수들
│   │   └── hooks/
│   │       └── useCompanyData.ts      # React Query Hooks
│   └── types/
│       └── company.ts                  # API 타입 정의
├── components/
│   ├── company/
│   │   ├── CompanyProfile.tsx         # 기업 프로필 (1.1)
│   │   ├── SalesComposition.tsx       # 매출 산업구성 (1.2)
│   │   ├── FinancialHealth.tsx        # 재무건전성 (1.4)
│   │   └── IndustryDescription.tsx    # 산업 설명 (1.5)
│   └── financial-analysis/
│       ├── FinancialAnalysisTab.tsx   # 재무현황분석 메인
│       ├── FinancialRatioJudgmentTable.tsx  # 재무 비율 판정 (2.2)
│       └── ExpandableFinancialTable.tsx     # 확장 가능한 표 (2.3)
└── pages/
    └── CompanyOverview.tsx             # 메인 페이지
```

## API 응답 확인

### 개발자 도구에서 확인
1. 브라우저 개발자 도구 열기 (F12)
2. Network 탭으로 이동
3. 페이지 새로고침
4. API 호출 확인:
   - Mock 모드: 호출 없음 (로컬 데이터 사용)
   - API 모드: `/api/v1/companies/...` 호출 확인

### React Query DevTools
개발 환경에서 자동으로 활성화됩니다:
- 화면 하단에 React Query 아이콘 표시
- 클릭하여 쿼리 상태, 캐시, 에러 확인 가능

## 하드코딩된 데이터

다음 데이터들은 프론트엔드에서 하드코딩되어 있습니다 (API로 받지 않음):

### 1. 기업 로고 및 타이틀 이미지
위치: `src/pages/CompanyOverview.tsx`

```typescript
const getCompanyAssets = (code: string) => {
  const assetMap: Record<string, { logo: string; title: string }> = {
    '001234': { logo: '/nongshim_logo.svg', title: '/nongshim_title.png' },
    'cj': { logo: '/cj_logo.png', title: '/cj_logo.png' },
    // 추가 기업들 매핑
  };
  return assetMap[code] || { logo: '/nongshim_logo.svg', title: '/nongshim_title.png' };
};
```

### 2. 섹션 설명 텍스트
위치: `src/components/financial-analysis/FinancialAnalysisTab.tsx`

```typescript
const sectionDescriptions = {
  financialStatus: '농심의 기업의 재무상황을 종합적으로...',
  ratioJudgment: '농심의 재무건전성은 필수소비재 섹터...',
  stability: '안정성 분석은 기업의 재무 구조가...',
  profitability: '수익성 분석은 일정기간 동안...',
  growth: '성장성 지표는 기업의 규모와...',
  activity: '활동성 분석은 기업이 보유한...',
};
```

## 트러블슈팅

### CORS 에러 발생 시
프로덕션 환경에서 CORS 에러가 발생하면 백엔드에서 CORS 설정이 필요합니다:

```javascript
// 백엔드 예시 (Express.js)
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### API 응답 형식 불일치 시
1. `API_SPECIFICATION.md` 확인
2. 백엔드 응답 형식 수정
3. 또는 프론트엔드에서 데이터 변환 로직 추가:

```typescript
// src/lib/api/companyApi.ts
export async function fetchCompanyProfile(companyCode: string): Promise<CompanyProfile> {
  const response = await fetchApi<any>(`/companies/${companyCode}/profile`);

  // 필요시 데이터 변환
  return {
    companyCode: response.code,
    companyName: response.name,
    profile: response.data.map(item => ({
      label: item.key,
      value: item.val
    }))
  };
}
```

### 로딩 상태가 너무 길 때
`src/lib/api/hooks/useCompanyData.ts`에서 Mock 데이터 지연 시간 조정:

```typescript
await new Promise(resolve => setTimeout(resolve, 300)); // 300ms로 변경
```

## 테스트

### Mock 데이터로 전체 기능 테스트
```bash
# .env
VITE_USE_MOCK_DATA=true

npm run dev
```

### 실제 API로 테스트
```bash
# .env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:8000/api/v1  # 백엔드 로컬 서버

npm run dev
```

## 배포

### 프로덕션 빌드
```bash
# .env.production
VITE_API_BASE_URL=https://api.your-domain.com/v1
VITE_USE_MOCK_DATA=false

npm run build
```

### 배포 체크리스트
- [ ] 환경변수 설정 확인 (`.env.production`)
- [ ] Mock 데이터 비활성화 (`VITE_USE_MOCK_DATA=false`)
- [ ] API Base URL 설정 (프로덕션 서버 URL)
- [ ] 백엔드 API 엔드포인트 모두 정상 작동 확인
- [ ] CORS 설정 확인
- [ ] 빌드 테스트 (`npm run build`)
- [ ] 프리뷰 테스트 (`npm run preview`)

## 추가 정보

- API 명세서: `API_SPECIFICATION.md`
- 백엔드 문의: 백엔드 팀에 문의
- 프론트엔드 이슈: GitHub Issues에 등록
