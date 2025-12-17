# 동적 표 컴포넌트 (DynamicTable)

TanStack Table을 사용한 검증된 동적 표 컴포넌트입니다.

## 특징

- ✅ **검증된 라이브러리**: TanStack Table (React Table) 사용
- ✅ **동적 데이터**: API로부터 받아올 수 있는 유연한 구조
- ✅ **데이터 분리**: 하드코딩 데이터는 별도 파일로 분리
- ✅ **Hover 효과**: Row hover 시 border-gray-300, 텍스트는 gray-700 유지
- ✅ **드롭다운 지원**: 선택적 드롭다운 기능 포함

## 설치

```bash
npm install @tanstack/react-table
```

## 사용법

### 기본 사용

```typescript
import { DynamicTable } from '@/components/tables';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: '이름',
  },
  {
    accessorKey: 'value',
    header: '값',
  },
];

const data = [
  { name: '항목1', value: '값1' },
  { name: '항목2', value: '값2' },
];

<DynamicTable data={data} columns={columns} />
```

### 드롭다운 포함

```typescript
<DynamicTable
  data={data}
  columns={columns}
  showDropdown
  dropdownOptions={['2024년', '2023년', '2022년']}
  dropdownLabel="회계 연도:"
  onDropdownChange={(value) => console.log(value)}
  defaultDropdownValue="2024년"
/>
```

### 커스텀 셀 렌더링

```typescript
const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'value',
    header: '값',
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <span className="font-bold text-blue-600">
          {value}
        </span>
      );
    },
  },
];
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | - | 표에 표시할 데이터 배열 |
| `columns` | `ColumnDef<any>[]` | - | TanStack Table 컬럼 정의 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `showDropdown` | `boolean` | `false` | 드롭다운 표시 여부 |
| `dropdownOptions` | `string[]` | `[]` | 드롭다운 옵션 목록 |
| `dropdownLabel` | `string` | - | 드롭다운 레이블 |
| `onDropdownChange` | `(value: string) => void` | - | 드롭다운 변경 핸들러 |
| `defaultDropdownValue` | `string` | - | 드롭다운 기본값 |

## 데이터 구조

데이터는 `src/lib/data/mock/tableData.ts`에 정의되어 있습니다.

```typescript
export interface TableColumn {
  accessorKey: string;
  header: string;
  cell?: (value: any) => React.ReactNode;
}

export interface TableRow {
  [key: string]: any;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
}
```

## 예시

- `BasicTableExample`: 기본 표 예시
- `CompanyProfileTableExample`: 기업 프로필 표 예시
- `FinancialStatusTableExample`: 드롭다운이 포함된 재무 상태 표 예시

자세한 예시는 `src/components/tables/TableExamples.tsx`를 참고하세요.

## API 연동

API로부터 데이터를 받아오는 경우:

```typescript
const [data, setData] = useState([]);

useEffect(() => {
  fetch('/api/company-data')
    .then(res => res.json())
    .then(apiData => {
      setData(apiData.rows);
    });
}, []);

<DynamicTable data={data} columns={columns} />
```

## 스타일링

- Row hover: `border-gray-300`
- 텍스트 색상: `text-gray-700` (hover 시에도 유지)
- 헤더 구분선: `border-gray-300`
- 일반 구분선: `border-gray-200`
