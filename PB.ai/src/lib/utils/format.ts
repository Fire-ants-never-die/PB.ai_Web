// 데이터 포맷팅 유틸리티 함수들

/**
 * 값이 null/undefined이면 "-"로 표시
 */
export function formatValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
}

/**
 * 숫자 값을 한국어 포맷으로 변환 (null이면 "-")
 */
export function formatNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return '-';
  }

  return numValue.toLocaleString('ko-KR');
}

/**
 * 퍼센트 값 포맷팅 (null이면 "-")
 */
export function formatPercentage(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return '-';
  }

  // 이미 %가 포함되어 있으면 그대로 반환
  if (typeof value === 'string' && value.includes('%')) {
    return value;
  }

  return `${numValue}%`;
}

/**
 * 통화 값 포맷팅 (null이면 "-")
 */
export function formatCurrency(value: number | null | undefined, unit: string = '원'): string {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${value.toLocaleString('ko-KR')}${unit}`;
}
