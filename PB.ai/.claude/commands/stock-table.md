---
name: stock-table
description: 정렬/필터 가능한 데이터 테이블 생성
---
Create sortable, filterable data table with hover effects.

# Requirements

1. **Features**:

   - Column sorting (asc/desc)
   - Row hover effects
   - Responsive design
   - Pagination
2. **Styling**:

   - Tailwind classes
   - Hover: `hover:bg-gray-50 transition-colors`
   - Borders: `border-b border-gray-200`
3. **Performance**:

   - Virtual scrolling if > 100 rows
   - Memoize sort functions

# Component Pattern

```tsx
'use client';
import { useState, useMemo } from 'react';

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    // Sorting logic
  }, [data, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {/* Header */}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {/* Row content */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

Make it reusable and type-safe!
