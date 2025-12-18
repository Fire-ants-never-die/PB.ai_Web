import { useIndustryDescription } from '@/lib/api/hooks/useCompanyData';
import { formatValue } from '@/lib/utils/format';

interface IndustryDescriptionProps {
  companyCode: string;
}

export const IndustryDescription = ({ companyCode }: IndustryDescriptionProps) => {
  const { data, isLoading, isError } = useIndustryDescription(companyCode);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          5. 산업 설명
        </h2>
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
          5. 산업 설명
        </h2>
        <div className="flex items-center justify-center h-48">
          <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        5. 산업 설명
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className={index === 0 ? 'border-t border-b border-gray-300' : 'border-b border-gray-300'}>
                <td className="bg-[#F7F9FB] px-6 py-3 text-[17px] text-[#191B1C] border-r border-gray-300 w-[174px]">
                  {formatValue(item.label)}
                </td>
                <td className="bg-white px-6 py-3 text-[17px] text-[#191B1C]">
                  {formatValue(item.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
