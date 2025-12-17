export const IndustryDescription = () => {
  const industryData = [
    { label: '산업명', value: '식료품 제조업(C10)' },
    { label: '평가기준일', value: '2025.06' },
    { label: '산업평가 종합등급', value: '2(양호)' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        5. 산업 설명
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {industryData.map((item, index) => (
              <tr key={index} className={index === 0 ? 'border-t border-b border-gray-300' : 'border-b border-gray-300'}>
                <td className="bg-[#F7F9FB] px-6 py-3 text-[17px] text-[#191B1C] border-r border-gray-300 w-[174px]">
                  {item.label}
                </td>
                <td className="bg-white px-6 py-3 text-[17px] text-[#191B1C]">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
