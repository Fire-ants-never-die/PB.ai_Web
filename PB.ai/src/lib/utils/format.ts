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

/**
 * 숫자를 조/억 단위로 포맷팅 (￦ 기호 포함)
 * 예: ￦3조 2,347억, ￦2,311억
 */
export function formatCurrencyKorean(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  // 문자열인 경우 숫자로 변환 시도
  let numValue: number;
  if (typeof value === 'string') {
    // 이미 "억"이나 "조"가 포함된 문자열인 경우 파싱
    if (value.includes('억') || value.includes('조')) {
      // "15,234억" 또는 "3조 2,347억" 형식을 파싱
      let jo = 0;
      let eok = 0;

      // 조 단위 추출
      const joMatch = value.match(/(\d+(?:,\d+)*)\s*조/);
      if (joMatch) {
        jo = parseFloat(joMatch[1].replace(/,/g, ''));
      }

      // 억 단위 추출
      const eokMatch = value.match(/(\d+(?:,\d+)*)\s*억/);
      if (eokMatch) {
        eok = parseFloat(eokMatch[1].replace(/,/g, ''));
      }

      // 파싱된 값으로 포맷팅
      if (jo > 0 && eok > 0) {
        return `￦${jo}조 ${eok.toLocaleString('ko-KR')}억`;
      } else if (jo > 0) {
        return `￦${jo}조`;
      } else if (eok > 0) {
        return `￦${eok.toLocaleString('ko-KR')}억`;
      } else {
        // 파싱 실패 시 원본에 ￦만 추가
        return `￦${value}`;
      }
    }
    // 숫자 문자열인 경우 (원 단위로 가정)
    numValue = parseFloat(value.replace(/,/g, ''));
  } else {
    numValue = value;
  }

  if (isNaN(numValue)) {
    return '-';
  }

  const jo = Math.floor(numValue / 1000000000000); // 조
  const eok = Math.floor((numValue % 1000000000000) / 100000000); // 억

  if (jo > 0 && eok > 0) {
    return `￦${jo}조 ${eok.toLocaleString('ko-KR')}억`;
  } else if (jo > 0) {
    return `￦${jo}조`;
  } else if (eok > 0) {
    return `￦${eok.toLocaleString('ko-KR')}억`;
  } else {
    // 억 미만인 경우 원 단위로 표시
    const won = numValue;
    return `￦${won.toLocaleString('ko-KR')}원`;
  }
}

/**
 * 숫자 값에 % 기호 추가 (이미 %가 있으면 그대로 반환)
 */
export function formatWithPercentage(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  // 문자열인 경우
  if (typeof value === 'string') {
    // 이미 %가 포함되어 있으면 그대로 반환
    if (value.includes('%')) {
      return value;
    }
    // 숫자 문자열인 경우
    const numValue = parseFloat(value.replace(/,/g, ''));
    if (isNaN(numValue)) {
      return '-';
    }
    return `${numValue.toLocaleString('ko-KR')}%`;
  }

  // 숫자인 경우
  return `${value.toLocaleString('ko-KR')}%`;
}
