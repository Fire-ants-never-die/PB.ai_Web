// 예상 질문 데이터
// 각 탭별로 예상 질문을 정의

export interface ChatQuestion {
  id: string;
  text: string;
}

// 탭 > 섹션(칩 라벨) > 질문 목록
export type SectionQuestions = Record<string, ChatQuestion[]>;
export type TabSectionQuestions = Record<string, SectionQuestions>;

export const chatQuestions: TabSectionQuestions = {
  overview: {
    '기업 프로필': [
      { id: 'overview-profile-1', text: '회사 설립 연도와 주요 연혁을 알려줘.' },
      { id: 'overview-profile-2', text: '주요 사업 구조와 수익원 비중을 요약해줘.' },
      { id: 'overview-profile-3', text: '최근 3년간 핵심 전략 변화가 있었나?' },
    ],
    '매출 산업 구성': [
      { id: 'overview-sales-1', text: '품목별 매출 비중 변화 추이를 보여줘.' },
      { id: 'overview-sales-2', text: '주력 품목이 전체 매출에 미치는 영향은?' },
      { id: 'overview-sales-3', text: '산업 내 경쟁사 대비 매출 구조 차이를 알려줘.' },
    ],
    '재무 현황': [
      { id: 'overview-fin-1', text: '최근 3년 매출/영업이익/순이익 추이를 요약해줘.' },
      { id: 'overview-fin-2', text: '매출 성장률과 이익률 변동의 주요 요인이 뭐야?' },
      { id: 'overview-fin-3', text: '현금흐름 안정성을 간단히 평가해줘.' },
    ],
    '재무건전성': [
      { id: 'overview-health-1', text: '부채비율과 이자보상배수를 통해 안정성을 평가해줘.' },
      { id: 'overview-health-2', text: '유동비율/당좌비율 추이를 알려줘.' },
      { id: 'overview-health-3', text: '레버리지 수준이 업계 평균 대비 어떤가?' },
    ],
    '산업 설명': [
      { id: 'overview-industry-1', text: '해당 산업의 성장 요인과 리스크를 요약해줘.' },
      { id: 'overview-industry-2', text: '경쟁 구도와 시장 점유율 변화를 알려줘.' },
      { id: 'overview-industry-3', text: '규제나 원자재 가격이 실적에 미치는 영향은?' },
    ],
  },
  financial: {
    '손익계산서': [
      { id: 'financial-pl-1', text: '매출총이익률과 영업이익률 개선/악화 요인을 분석해줘.' },
      { id: 'financial-pl-2', text: '판매관리비 비중 추이와 효율성을 평가해줘.' },
    ],
    '재무상태표': [
      { id: 'financial-bs-1', text: '자산 대비 부채 구조가 안정적인지 알려줘.' },
      { id: 'financial-bs-2', text: '유동/비유동 자산 비중과 위험 요소를 설명해줘.' },
    ],
    '현금흐름표': [
      { id: 'financial-cf-1', text: '영업/투자/재무 현금흐름 패턴을 요약해줘.' },
      { id: 'financial-cf-2', text: '잉여현금흐름(FCF) 추이와 변동 이유를 알려줘.' },
    ],
    '연도별 대주주 현황': [
      { id: 'financial-owner-1', text: '대주주 지분 변동이 경영 안정성에 미치는 영향은?' },
      { id: 'financial-owner-2', text: '외국인/기관/개인 비중 변화가 실적과 상관있나?' },
    ],
  },
  investment: {
    '투자지표': [
      { id: 'invest-1', text: 'ROE/ROA 추이와 업계 평균 대비 강점을 알려줘.' },
      { id: 'invest-2', text: '배당성향과 배당 성장률을 분석해줘.' },
    ],
    '수익성 분석': [
      { id: 'invest-3', text: '영업이익률/순이익률이 동종업계 대비 어떤가?' },
    ],
    '성장성 분석': [
      { id: 'invest-4', text: '매출/이익 성장률 추이와 향후 전망을 알려줘.' },
    ],
    '안정성 분석': [
      { id: 'invest-5', text: '부채비율과 이자보상배수로 안정성을 평가해줘.' },
    ],
    '활동성 분석': [
      { id: 'invest-6', text: '회전율 지표(재고/매출채권)로 효율성을 평가해줘.' },
    ],
  },
  valuation: {
    '종합분석': [
      { id: 'val-1', text: '현재 주가가 공정가치 대비 할인/프리미엄인지 알려줘.' },
      { id: 'val-2', text: '멀티플과 DCF 결과를 종합한 적정가 범위를 제시해줘.' },
    ],
    '유사기업 이용법(PER)': [
      { id: 'val-3', text: 'PER 비교군과 적용 멀티플 근거를 설명해줘.' },
    ],
    '초과이익할인법(AE법)': [
      { id: 'val-4', text: 'AE법에서 사용한 가정(성장률/할인율)을 알려줘.' },
    ],
    '경제적부가가치(EVA)': [
      { id: 'val-5', text: 'EVA 추이와 자본비용 대비 성과를 요약해줘.' },
    ],
    '현금흐름할인(DCF)': [
      { id: 'val-6', text: 'DCF 주요 입력(할인율, 성장률)과 민감도 결과를 알려줘.' },
    ],
  },
};

// 답변 후 표시할 추가 질문 chips
export const followUpQuestions: ChatQuestion[] = [
  { id: 'followup-1', text: '더 자세히 설명해줘' },
  { id: 'followup-2', text: '관련 데이터를 보여줘' },
  { id: 'followup-3', text: '비교 분석을 해줘' },
  { id: 'followup-4', text: '향후 전망은 어때?' },
];
