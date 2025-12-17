import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CompanySearch } from '@/components/company/CompanySearch';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 페이드인 애니메이션
    setIsVisible(true);
  }, []);

  return (
    <PageLayout title="">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        {/* 메인 텍스트 */}
        <h1
          className="text-center mb-[5.31rem] transition-opacity duration-700 ease-out"
          style={{
            color: 'var(--color-gray-900, #191B1C)',
            fontFamily: 'var(--typography-type, "Pretendard GOV")',
            fontSize: '2.25rem',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '150%',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          어떤 회사를 분석해볼까요?
        </h1>

        {/* 검색 필드 */}
        <div
          className="transition-opacity duration-700 ease-out delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
          }}
        >
          <CompanySearch />
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
