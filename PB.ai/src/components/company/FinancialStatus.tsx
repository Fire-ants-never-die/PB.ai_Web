export const FinancialStatus = () => {
  // Mock data for the table
  const years = ['2019', '2020', '2021', '2022', '2023'];

  const tableData = [
    {
      category: '매출액',
      values: ['22,672', '24,892', '27,197', '30,409', '34,387'],
      bgColor: 'bg-[#F7F9FB]'
    },
    {
      category: '영업이익',
      values: ['1,642', '1,892', '2,123', '2,456', '2,789'],
      bgColor: 'bg-white'
    },
    {
      category: '영업이익률',
      values: ['7.2%', '7.6%', '7.8%', '8.1%', '8.1%'],
      bgColor: 'bg-[#F7F9FB]'
    },
    {
      category: '당기순이익',
      values: ['1,234', '1,456', '1,678', '1,890', '2,123'],
      bgColor: 'bg-white'
    },
    {
      category: '당기순이익률',
      values: ['5.4%', '5.8%', '6.2%', '6.2%', '6.2%'],
      bgColor: 'bg-[#F7F9FB]'
    },
    {
      category: '자산총계',
      values: ['32,456', '34,567', '36,789', '39,012', '41,234'],
      bgColor: 'bg-white'
    },
    {
      category: '부채총계',
      values: ['12,345', '13,456', '14,567', '15,678', '16,789'],
      bgColor: 'bg-[#F7F9FB]'
    },
    {
      category: '자본총계',
      values: ['20,111', '21,111', '22,222', '23,334', '24,445'],
      bgColor: 'bg-white'
    },
    {
      category: '부채비율',
      values: ['61.4%', '63.7%', '65.5%', '67.2%', '68.7%'],
      bgColor: 'bg-[#F7F9FB]'
    },
    {
      category: 'ROE',
      values: ['6.1%', '6.9%', '7.5%', '8.1%', '8.7%'],
      bgColor: 'bg-white'
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-[#191B1C] transition-colors hover:text-[#5797F7] cursor-default">
        3. 재무 현황
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-b border-gray-300">
              <th className="bg-[#F7F9FB] text-left px-6 py-3 text-[13px] text-[#191B1C] font-normal">
                구분 (단위: 억원)
              </th>
              {years.map((year) => (
                <th
                  key={year}
                  className="bg-[#F7F9FB] text-center px-6 py-3 text-[14px] text-[#191B1C] font-normal border-l border-gray-300"
                >
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-300">
                <td className={`${row.bgColor} px-6 py-3 text-[14px] text-[#191B1C] font-normal`}>
                  {row.category}
                </td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${row.bgColor} text-center px-6 py-3 text-[14px] text-[#191B1C] border-l border-gray-300`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
