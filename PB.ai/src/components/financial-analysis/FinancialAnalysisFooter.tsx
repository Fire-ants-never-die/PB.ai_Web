export function FinancialAnalysisFooter() {
  return (
    <div
      className="mt-auto pt-8 pb-12 border-t border-[#D7D9DB] -mx-4 lg:-mx-6 px-4 lg:px-6"
      style={{ background: 'var(--color-gray-50, #F7F9FB)' }}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-[15px] font-semibold text-[#191B1C] leading-[150%]">
          참고문헌
        </h3>
        <p className="text-[14px] font-normal text-[#58595B] leading-[150%]">
          본 보고서의 주식가치평가 모델 및 재무비율 분석에 사용된 계산식은{' '}
          <a
            href="https://product.kyobobook.co.kr/detail/S000215818022"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#58595B] hover:text-[#5797F7] transition-colors"
          >
            『취업하려면 재무제표 분석하라(오웅락, 박진하)』
          </a>
          에 제시된 공식과 체계를 참고하여 동일한 형태로 인용하였으며, 변수 정의와 적용 범위를 분석 목적에 맞게 구성하였습니다.
        </p>
      </div>
    </div>
  );
}
