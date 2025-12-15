---
name: stock-component
description: 주식 컴포넌트 생성 (mock 데이터 자동 분리)
---
Create a new stock market component with complete data separation.

# Instructions

When user provides a component name and description:

1. **Create Component File**: `src/components/{category}/{ComponentName}.tsx`

   - Use TypeScript with strict interfaces
   - Include proper prop types
   - Add JSDoc comments
   - Use Radix UI + Tailwind
2. **Create Type File**: `src/lib/types/{componentName}.types.ts`

   - Export all interfaces
   - Add JSDoc for each field
3. **Create Mock Data**: `src/lib/data/mock/{componentName}.mock.ts`

   - Realistic sample data
   - Export as const
   - Type-safe
4. **Create API Hook**: `src/lib/api/hooks/use{ComponentName}.ts`

   Currently return mock data

   Comment showing API migration path

   Include loading/error states
5. **Update Barrel Exports**: Add to appropriate index.ts files

# Example Structure

# // Component
