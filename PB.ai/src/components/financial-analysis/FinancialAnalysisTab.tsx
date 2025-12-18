import { useState } from 'react';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { NetIncomeChart } from '@/components/charts/NetIncomeChart';
import { FinancialDataTable } from '@/components/company/FinancialDataTable';
import { FinancialHealth } from '@/components/company/FinancialHealth';
import { FinancialRatioJudgmentTable } from './FinancialRatioJudgmentTable';
import { ExpandableFinancialTable } from './ExpandableFinancialTable';
import { FinancialAnalysisFooter } from './FinancialAnalysisFooter';
import {
  useFinancialOverview,
  useFinancialRatioJudgment,
  useFinancialAnalysisDetails,
} from '@/lib/api/hooks/useCompanyData';

interface FinancialAnalysisTabProps {
  companyCode: string;
}

export function FinancialAnalysisTab({ companyCode }: FinancialAnalysisTabProps) {
  const { data: overviewData, isLoading: overviewLoading } = useFinancialOverview(companyCode);
  const { data: ratioJudgmentData, isLoading: ratioLoading } = useFinancialRatioJudgment(companyCode);
  const { data: analysisDetailsData, isLoading: analysisLoading } = useFinancialAnalysisDetails(companyCode);
  type SectionKey =
    | 'financialStatus'
    | 'ratioJudgment'
    | 'stability'
    | 'profitability'
    | 'growth'
    | 'activity';

  const [openedSections, setOpenedSections] = useState<Record<SectionKey, boolean>>({
    financialStatus: false,
    ratioJudgment: false,
    stability: false,
    profitability: false,
    growth: false,
    activity: false,
  });

  const toggleSection = (key: SectionKey) => {
    setOpenedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const infoBoxStyle = {
    display: 'flex',
    padding: '0.5rem',
    flexDirection: 'column' as const,
    alignItems: 'center',
    alignSelf: 'stretch' as const,
    borderRadius: '0.625rem',
    background: 'var(--color-gray-50, #F7F9FB)',
  };

  // 하드코딩된 섹션 설명 텍스트
  const sectionDescriptions = {
    financialStatus: '농심의 기업의 재무상황을 종합적으로 보여주는 자료입니다. 한 해 동안 벌어들인 매출액, 보유하고 있는 자산의 규모, 갚아야 할 부채, 주주의 몫인 자본, 그리고 본업에서 발생한 영업이익과 최종적으로 남은 순이익을 알 수 있습니다.',
    ratioJudgment: '농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다. 농심은 필수소비재 섹터 내에서 재무 안정성과 수익성이 뛰어난 기업으로 평가됩니다. 전반적인 재무 건전성 점수는 0.855로 \'안전 구간\'에 위치하며, 업계 평균을 상회하는 안정성을 보여주고 있습니다.',
    stability: '안정성 분석은 기업의 재무 구조가 얼마나 건전한지를 보여주는 지표입니다. 재무상태표의 자산·부채·자본 관계를 바탕으로 평가하며, 기업의 단기지급 능력인 유동성 분석과 자본조달구조에 대한 대응능력인 레버리지 분석으로 구분됩니다.',
    profitability: '수익성 분석은 일정기간 동안 기업의 경영성과를 나타내는 지표입니다. 투자된 자산 또는 자본 대비 창출한 이익의 정도를 의미하는 투자수익성 분석과 매출에 상응하여 창출한 이익의 정도를 나타내는 판매마진 분석으로 분류됩니다.',
    growth: '성장성 지표는 기업의 규모와 경영성과가 전년도와 비교하여 얼마나 증가하였는가를 나타내는 지표입니다. 이를 통해 기업의 미래 경쟁력과 수익 창출 능력을 간접적으로 알 수 있어요.',
    activity: '활동성 분석은 기업이 보유한 자산이나 자본을 얼마나 효율적으로 활용하고 있는지를 보여주는 지표입니다. 일반적으로 효율성 비율 또는 회전율이라고 부릅니다. 매출액은 투하된 자산이나 자본을 통해 만들어지는 가장 핵심적인 성과물이기 때문에, 활동성 지표는 투하 자산이나 자본 대비 얼마만큼의 매출을 창출했는지를 배수로 측정합니다.',
  };

  if (overviewLoading || ratioLoading || analysisLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-gray-500">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (!overviewData || !ratioJudgmentData || !analysisDetailsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-red-500">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-12 pb-0">
      {/* 1. 재무 상황 */}
      <div className="flex flex-col gap-2" style={{ marginTop: '0rem' }}>
        <button
          type="button"
          aria-expanded={openedSections.financialStatus}
          onClick={() => toggleSection('financialStatus')}
          className="text-left text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-pointer"
        >
          1. 재무 상황
        </button>
        {openedSections.financialStatus && (
          <div style={{ marginTop: '0rem', ...infoBoxStyle }}>
            {sectionDescriptions.financialStatus}
          </div>
        )}

        {/* 차트 두 개 나란히 배치 */}
        <div className="flex items-start gap-3">
          {/* 왼쪽: 매출액 차트 */}
          <div
            className="flex justify-between items-start"
            style={{
              width: '24.06419rem',
              height: '22.51825rem',
              padding: '0.45813rem 0.61081rem 0.45813rem 0.07638rem'
            }}
          >
            <RevenueChart
              data={overviewData.revenueChart}
              className="w-full h-full"
            />
          </div>

          {/* 오른쪽: 순이익&순이익률 차트 */}
          <div
            className="flex justify-between items-start"
            style={{
              width: '24.06419rem',
              height: '22.51825rem',
              padding: '0.45813rem 0.61081rem 0.45813rem 0.07638rem'
            }}
          >
            <NetIncomeChart
              data={overviewData.netIncomeChart}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 재무 데이터 표 */}
        <div className="mt-6">
          <FinancialDataTable data={overviewData.financialTable} />
        </div>
      </div>

      {/* 2. 재무 비율 판정 */}
      <div className="flex flex-col gap-2" style={{ marginTop: '0rem' }}>
        <button
          type="button"
          aria-expanded={openedSections.ratioJudgment}
          onClick={() => toggleSection('ratioJudgment')}
          className="text-left text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-pointer"
        >
          2. 재무 비율 판정
        </button>
        {openedSections.ratioJudgment && (
          <div style={{ marginTop: '0rem', ...infoBoxStyle }}>
            농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다. 농심은
            필수소비재 섹터 내에서 재무 안정성과 수익성이 뛰어난 기업으로 평가됩니다. 전반적인 재무
            건전성 점수는 0.855로 ‘안전 구간’에 위치하며, 업계 평균을 상회하는 안정성을 보여주고
            있습니다.
          </div>
        )}
        <FinancialHealth companyCode={companyCode} hideTitle={true} hideDescription={true} />

        {/* 재무 비율 판정 표 */}
        <div className="mt-0">
          <FinancialRatioJudgmentTable data={ratioJudgmentData.ratioJudgmentTable} />
        </div>
      </div>

      {/* 3. 안정성 분석 */}
      <div className="flex flex-col gap-2" style={{ marginBottom: '0rem' }}>
        <button
          type="button"
          aria-expanded={openedSections.stability}
          onClick={() => toggleSection('stability')}
          className="text-left text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-pointer"
        >
          3. 안정성 분석
        </button>
        {openedSections.stability && (
          <div style={{ marginTop: '0rem', ...infoBoxStyle }}>
            {sectionDescriptions.stability}
          </div>
        )}

        {/* 안정성 분석 하위 섹션들 */}
        {analysisDetailsData.sections.find(s => s.id === 'stability')?.subsections.map((subsection, idx) => (
          <div key={idx} className="flex flex-col gap-6" style={{ marginTop: '0.6rem' }}>
            {subsection.title && (
              <h3 className="text-xl font-semibold text-[#191B1C]">
                {subsection.title}
              </h3>
            )}
            <ExpandableFinancialTable
              items={subsection.items}
              headers={subsection.tableHeaders}
            />
          </div>
        ))}
      </div>

      {/* 4. 수익성 분석 */}
      <div className="flex flex-col gap-2" style={{ marginTop: '0rem' }}>
        <button
          type="button"
          aria-expanded={openedSections.profitability}
          onClick={() => toggleSection('profitability')}
          className="text-left text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-pointer"
        >
          4. 수익성 분석
        </button>
        {openedSections.profitability && (
          <div style={{ marginTop: '0rem', ...infoBoxStyle }}>
            {sectionDescriptions.profitability}
          </div>
        )}

        {/* 수익성 분석 하위 섹션들 */}
        {analysisDetailsData.sections.find(s => s.id === 'profitability')?.subsections.map((subsection, idx) => (
          <div key={idx} className="flex flex-col gap-6" style={{ marginTop: '0.6rem' }}>
            {subsection.title && (
              <h3 className="text-xl font-semibold text-[#191B1C]">
                {subsection.title}
              </h3>
            )}
            <ExpandableFinancialTable
              items={subsection.items}
              headers={subsection.tableHeaders}
            />
          </div>
        ))}
      </div>

      {/* 5. 성장성 분석 */}
      <div className="flex flex-col gap-2" style={{ marginTop: '0rem' }}>
        <button
          type="button"
          aria-expanded={openedSections.growth}
          onClick={() => toggleSection('growth')}
          className="text-left text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-pointer"
        >
          5. 성장성 분석
        </button>
        {openedSections.growth && (
          <div style={{ marginTop: '0rem', ...infoBoxStyle }}>
            {sectionDescriptions.growth}
          </div>
        )}

        {/* 성장성 분석 하위 섹션들 */}
        {analysisDetailsData.sections.find(s => s.id === 'growth')?.subsections.map((subsection, idx) => (
          <div key={idx} className="flex flex-col gap-6" style={{ marginTop: idx === 0 ? '0rem' : '0.6rem' }}>
            {subsection.title && (
              <h3 className="text-xl font-semibold text-[#191B1C]">
                {subsection.title}
              </h3>
            )}
            <ExpandableFinancialTable
              items={subsection.items}
              headers={subsection.tableHeaders}
            />
          </div>
        ))}
      </div>

      {/* 6. 활동성 분석 */}
      <div className="flex flex-col gap-2" style={{ marginTop: '0rem' }}>
        <button
          type="button"
          aria-expanded={openedSections.activity}
          onClick={() => toggleSection('activity')}
          className="text-left text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-pointer"
        >
          6. 활동성 분석
        </button>
        {openedSections.activity && (
          <div style={{ marginTop: '0rem', ...infoBoxStyle }}>
            {sectionDescriptions.activity}
          </div>
        )}

        {/* 활동성 분석 하위 섹션들 */}
        {analysisDetailsData.sections.find(s => s.id === 'activity')?.subsections.map((subsection, idx) => (
          <div key={idx} className="flex flex-col gap-6" style={{ marginTop: idx === 0 ? '0rem' : '0.6rem' }}>
            {subsection.title && (
              <h3 className="text-xl font-semibold text-[#191B1C]">
                {subsection.title}
              </h3>
            )}
            <ExpandableFinancialTable
              items={subsection.items}
              headers={subsection.tableHeaders}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <FinancialAnalysisFooter />
    </div>
  );
}
