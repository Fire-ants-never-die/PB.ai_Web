import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Company {
  id: string;
  name: string;
}

const companies: Company[] = [
  { id: '004370', name: '농심' },
  { id: '001450', name: '삼양식품' },
  { id: '005610', name: 'SPC삼립' },
  { id: '007310', name: '오뚜기' },
  { id: '097950', name: 'CJ제일제당' },
];

const companyLogos: Record<string, string> = {
  '004370': '/nongshim_logo.svg',
  '001450': '/samyang_logo.png',
  '005610': '/sampl_logo.png',
  '007310': '/o_logo.png',
  '097950': '/cj_logo.png',
};

interface CompanySearchProps {
  className?: string;
}

export function CompanySearch({ className }: CompanySearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 우선순위 회사 ID (농심, CJ제일제당)
  const priorityCompanyIds = ['004370', '097950']; // 농심, CJ제일제당

  const filteredCompanies = companies
    .filter((company) => company.name.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => {
      const aIsPriority = priorityCompanyIds.includes(a.id);
      const bIsPriority = priorityCompanyIds.includes(b.id);

      // 우선순위 회사가 먼저 오도록
      if (aIsPriority && !bIsPriority) return -1;
      if (!aIsPriority && bIsPriority) return 1;

      // 둘 다 우선순위 회사인 경우, 순서 유지 (농심 -> CJ제일제당)
      if (aIsPriority && bIsPriority) {
        return priorityCompanyIds.indexOf(a.id) - priorityCompanyIds.indexOf(b.id);
      }

      // 둘 다 일반 회사인 경우, 원래 순서 유지
      return 0;
    });

  const handleSelectCompany = (company: Company) => {
    // blur 타이머 취소 (alert로 인한 blur 이벤트 방지)
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }

    // 우선순위 회사가 아닌 경우 준비중 메시지 표시
    if (!priorityCompanyIds.includes(company.id)) {
      alert('해당 기업의 분석 서비스는 준비 중입니다.\n곧 만나보실 수 있습니다.');
      setIsOpen(false);
      setSearchValue('');
      return;
    }

    // 회사 선택 시 CompanyOverview 페이지로 이동하고 회사 ID 전달
    navigate(`/company?code=${company.id}&name=${encodeURIComponent(company.name)}`);
    setIsOpen(false);
    setSearchValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    // blur 타이머가 있다면 취소 (다시 focus 시 드롭다운이 열리도록)
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // 드롭다운 클릭을 위해 약간의 지연
    blurTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      blurTimeoutRef.current = null;
    }, 200);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // 드롭다운 내부 클릭 시 blur 이벤트 방지
    e.preventDefault();
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#58595B] z-10" />
        <Input
          type="text"
          placeholder="분석할 회사를 선택해주세요"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-12 pr-4 text-base focus-visible:ring-2 focus-visible:ring-[#5797F7] focus-visible:border-[#5797F7]"
          style={{
            fontFamily: 'var(--typography-type, "Pretendard GOV")',
            width: '43.625rem',
            height: '3.625rem',
            flexShrink: 0,
            borderRadius: '1.5rem',
            border: '1px solid var(--color-gray-100, #F0F2F4)',
            background: '#FFF',
            boxShadow: '0 4px 8px 0 var(--color-gray-100, #F0F2F4)',
            backdropFilter: 'blur(4px)',
          }}
        />
        <style>{`
          input::placeholder {
            color: var(--color-gray-500, #939597);
            font-family: var(--typography-type, "Pretendard GOV");
            font-size: 1.0625rem;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
          }
        `}</style>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && filteredCompanies.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#D7D9DB] rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          onMouseDown={handleMouseDown}
          style={{
            borderRadius: '0.75rem',
            border: '1px solid #D7D9DB',
            boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {filteredCompanies.map((company, index) => (
            <button
              key={company.id}
              onClick={() => handleSelectCompany(company)}
              onMouseDown={(e) => e.preventDefault()}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#F5F5F6] active:bg-[#EBECED] transition-all duration-150"
              style={{
                fontFamily: 'var(--typography-type, "Pretendard GOV")',
                borderRadius: index === 0 ? '0.75rem 0.75rem 0 0' : index === filteredCompanies.length - 1 ? '0 0 0.75rem 0.75rem' : '0',
                animation: `fadeIn 0.15s ease-out ${index * 0.03}s both`,
              }}
            >
              {/* 로고 */}
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded overflow-hidden">
                <img
                  src={companyLogos[company.id] ?? '/pb_logo.svg'}
                  alt={`${company.name} 로고`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 기업이름(코드) */}
              <div className="flex-1 min-w-0 text-left">
                <div
                  className="truncate"
                  style={{
                    color: 'var(--color-gray-900, #191B1C)',
                    fontFamily: 'var(--typography-type, "Pretendard GOV")',
                    fontSize: '1.0625rem',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%',
                    textAlign: 'left',
                  }}
                >
                  {company.name}({company.id})
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
