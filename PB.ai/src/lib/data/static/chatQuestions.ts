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
      { id: 'overview-profile-1', text: '대표이사의 경영 실적 평가 및 이슈에 대해서 설명해줘' },
      { id: 'overview-profile-2', text: '주요 계열사와의 관계를 설명해줘' },
      { id: 'overview-profile-3', text: '회사의 규모에 대해서 설명해줘' },
      { id: 'overview-profile-4', text: '회사 종업원 복지수준 및 인사 평가는 어떻게 하고 있는지 확인해줘' },
      { id: 'overview-profile-5', text: '1년간 시가총액의 변동 수준을 알려줘' },
    ],
    '매출 산업 구성': [
      { id: 'overview-sales-1', text: '산업 내 경쟁사 대비 매출 구조 차이를 알려줘' },
      { id: 'overview-sales-2', text: '품목별 매출 비중 변화를 알려줘' },
    ],
    '재무 현황': [
      { id: 'overview-fin-1', text: '자산, 부채, 자본의 구성이 기업의 장기적인 가치에 어떤 영향을 주는지 설명해줘.' },
      { id: 'overview-fin-2', text: '현재의 매출과 이익 항목들이 미래에도 지속될 수 있는 구조인지, 주요 성장 동력이 무엇인지 알려줘.' },
      { id: 'overview-fin-3', text: '최근 매출, 영업이익, 순이익의 변화 추이가 어떻게 나타나고 있으며 그 구체적인 원인이 무엇인지 확인해줘.' },
      { id: 'overview-fin-4', text: '현재 표상의 부채비율과 자본구조가 업계의 일반적인 기준과 비교했을 때 어느 정도 수준인지 알려줘.' },
      { id: 'overview-fin-5', text: '전체 항목 중에서 기업의 현 상태를 파악하기 위해 가장 주목해서 봐야 할 핵심 지표가 무엇인지 설명해줘.' },
    ],
    '재무건전성': [
      { id: 'overview-health-1', text: '재무 비율 종합 점수는 어떤 계산 방식으로 나온 값인지, 그리고 이 점수가 어느 정도 수준이면 재무 구조가 양호하다고 보는지 설명해줘.' },
      { id: 'overview-health-2', text: '유동성 지표 점수는 무엇을 어떻게 평가한 결과인지, 사용된 유동성 비율의 수준을 함께 설명해줘.' },
      { id: 'overview-health-3', text: '현재 부채 구조가 얼마나 안정적인 상태인지 설명해줘' },
      { id: 'overview-health-4', text: '투자수익성과 판매마진 지표 점수는 어떤 수익성 비율을 기준으로 평가한 것인지, 이 수익성 수준을 동종 업계와 비교해서 설명해줘.' },
      { id: 'overview-health-5', text: '이 회사의 효율성과 성장성을 각각 어떤 수준으로 볼 수 있는지 설명해줘' },
    ],
    '산업 설명': [
      { id: 'overview-industry-1', text: '해당 산업의 성장 요인과 리스크를 요약해줘' },
      { id: 'overview-industry-2', text: '경쟁 구도와 시장 점유율 변화를 알려줘' },
      { id: 'overview-industry-3', text: '원자재 가격의 현황이 어떤지 알려줘' },
      { id: 'overview-industry-4', text: '산업의 수출 전망이 어떤지 분석해줘' },
    ],
  },
  financial: {
    '재무상황': [
      { id: 'financial-status-1', text: '자산, 부채, 자본의 구성이 기업의 장기적인 가치에 어떤 영향을 주는지 설명해줘.' },
      { id: 'financial-status-2', text: '현재의 매출과 이익 항목들이 미래에도 지속될 수 있는 구조인지, 주요 성장 동력이 무엇인지 알려줘.' },
      { id: 'financial-status-3', text: '최근 매출, 영업이익, 순이익의 변화 추이가 어떻게 나타나고 있으며 그 구체적인 원인이 무엇인지 확인해줘.' },
      { id: 'financial-status-4', text: '현재 표상의 부채비율과 자본구조가 업계의 일반적인 기준과 비교했을 때 어느 정도 수준인지 알려줘.' },
      { id: 'financial-status-5', text: '전체 항목 중에서 기업의 현 상태를 파악하기 위해 가장 주목해서 봐야 할 핵심 지표가 무엇인지 설명해줘.' },
    ],
    '재무 비율 판정': [
      { id: 'financial-ratio-1', text: '재무 비율 종합 점수는 어떤 계산 방식으로 나온 값인지, 그리고 이 점수가 어느 정도 수준이면 재무 구조가 양호하다고 보는지 설명해줘.' },
      { id: 'financial-ratio-2', text: '유동성 지표 점수는 무엇을 어떻게 평가한 결과인지, 사용된 유동성 비율의 수준을 함께 설명해줘.' },
      { id: 'financial-ratio-3', text: '현재 부채 구조가 얼마나 안정적인 상태인지 설명해줘' },
      { id: 'financial-ratio-4', text: '투자수익성과 판매마진 지표 점수는 어떤 수익성 비율을 기준으로 평가한 것인지, 이 수익성 수준을 동종 업계와 비교해서 설명해줘.' },
      { id: 'financial-ratio-5', text: '이 회사의 효율성과 성장성을 각각 어떤 수준으로 볼 수 있는지 설명해줘' },
    ],
    '안정성 분석': [
      { id: 'financial-stability-1', text: '표에 나온 유동비율이 업종 평균 대비 안정적인 수준인지, 이 지표가 경영상 어떤 의미인지 설명해줘.' },
      { id: 'financial-stability-2', text: '현금비율을 보고 실제 현금 동원력에 어떤 이슈가 있는지 설명해줘.' },
      { id: 'financial-stability-3', text: '자기자본비율이라는 지표가 외부의 경제적 위기 상황에서 기업의 경영 안정성을 평가할 때 왜 중요한지 확인해줘.' },
      { id: 'financial-stability-4', text: '차입금 의존도라는 지표를 통해 기업이 외부 자금에 얼마나 의존하고 있는지, 그리고 이것이 재무적 독립성과 어떤 관계가 있는지 설명해줘.' },
      { id: 'financial-stability-5', text: '레버리지 분석에 포함된 전체적인 지표들이 기업의 신용 등급이나 투자자가 평가하는 기업 가치에 어떤 영향을 주는지 알려줘.' },
    ],
    '수익성 분석': [
      { id: 'financial-profit-1', text: '총자산순이익률(ROA) 지표가 기업이 보유한 전체 자산 대비 수익을 얼마나 효율적으로 창출하고 있는지를 어떻게 나타내는지 설명해줘.' },
      { id: 'financial-profit-2', text: '자기자본순이익률(ROE) 지표를 통해 주주의 투자 자본이 실제 이익으로 연결되는 과정과 이것이 주주 가치에 미치는 영향을 알려줘.' },
      { id: 'financial-profit-3', text: '매출액순이익률 및 매출액영업이익률 지표가 기업의 판매 전략과 원가 관리 효율성을 판단하는 데 어떤 기준이 되는지 설명해줘.' },
      { id: 'financial-profit-4', text: '수익성 분석에서 EBIT(이자 및 세금 차감 전 이익)와 EBITDA 지표를 별도로 확인하는 것이 기업의 순수한 영업 활동 성과를 파악하는 데 왜 중요한지 확인해줘.' },
      { id: 'financial-profit-5', text: '표에 나열된 다양한 투자수익성 지표들이 기업의 장기적인 재투자 능력과 지속 가능한 성장 가능성을 어떻게 보여주는지 알려줘.' },
    ],
    '성장성 분석': [
      { id: 'financial-growth-1', text: '총자산증가율이라는 지표가 기업의 외형적 규모 확장과 전체적인 투자 활동 수준을 어떻게 대변하는지 설명해줘.' },
      { id: 'financial-growth-2', text: '유형자산증가율 지표를 통해 기업이 미래의 생산 능력을 확충하기 위해 설비나 시설에 얼마나 투자하고 있는지 확인해줘.' },
      { id: 'financial-growth-3', text: '유동자산증가율의 변화가 기업의 원재료 확보나 매출 채권 관리 등 실제 영업 활동의 역동성과 어떤 관계가 있는지 알려줘.' },
      { id: 'financial-growth-4', text: '자기자본증가율 지표가 기업이 벌어들인 이익을 내부적으로 얼마나 잘 축적하여 기초 체력을 다지고 있는지 보여주는지 설명해줘.' },
      { id: 'financial-growth-5', text: '매출액증가율이라는 지표를 통해 기업의 제품이나 서비스가 시장에서 얼마나 잘 받아들여지고 있으며, 시장 점유율을 확대하고 있는지 확인해줘.' },
    ],
    '활동성 분석': [
      { id: 'financial-activity-1', text: '총자산회전율 지표가 기업이 보유한 전체 자산을 활용하여 매출을 얼마나 역동적으로 창출하고 있는지 그 효율성을 어떻게 나타내는지 설명해줘.' },
      { id: 'financial-activity-2', text: '재고자산회전율 및 제품회전율 지표를 통해 기업의 재고가 수익으로 연결되는 속도와 물류 관리의 효율성을 어떻게 판단할 수 있는지 확인해줘.' },
      { id: 'financial-activity-3', text: '매출채권회전율 지표가 외상 매출금의 회수 속도와 관련하여 기업의 현금 흐름 안정성에 어떤 의미를 갖는지 알려줘.' },
      { id: 'financial-activity-4', text: '유형자산회전율과 비유동자산회전율 지표를 통해 생산 설비나 장기 자산들이 매출 기여도 측면에서 얼마나 효과적으로 운용되고 있는지 설명해줘.' },
      { id: 'financial-activity-5', text: '자기자본회전율 및 자본금회전율 지표가 투자된 자본 대비 영업 활동이 얼마나 활발하게 이루어지고 있는지를 보여주는 기준에 대해 알려줘.' },
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
