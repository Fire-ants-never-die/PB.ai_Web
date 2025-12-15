
import { PageLayout } from '../components/layout/PageLayout';

const Portfolio = () => {
  const portfolioData = {
    totalValue: 125847.32,
    dayChange: 2847.65,
    dayChangePercent: 2.31,
    totalGainLoss: 18394.22,
    totalGainLossPercent: 17.12
  };

  const holdings = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 15,
    price: 187.06,
    value: 2805.90,
    gainLoss: 544.65,
    gainLossPercent: 24.09
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 8,
    price: 378.85,
    value: 3030.80,
    gainLoss: -127.20,
    gainLossPercent: -4.03
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 12,
    price: 138.21,
    value: 1658.52,
    gainLoss: 298.44,
    gainLossPercent: 21.95
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 6,
    price: 151.94,
    value: 911.64,
    gainLoss: 87.32,
    gainLossPercent: 10.59
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 4,
    price: 248.50,
    value: 994.00,
    gainLoss: -156.80,
    gainLossPercent: -13.64
  }];


  const allocation = [
  { sector: 'Technology', percentage: 68.5, value: 86229.71 },
  { sector: 'Consumer Discretionary', percentage: 15.2, value: 19128.79 },
  { sector: 'Healthcare', percentage: 8.3, value: 10445.33 },
  { sector: 'Financial Services', percentage: 5.1, value: 6418.01 },
  { sector: 'Energy', percentage: 2.9, value: 3649.57 }];


  return (
    <PageLayout title="Portfolio">
      <div className="container mx-auto pt-[32px] pl-[0px] pr-[24px] pb-[32px]">
        <div className="mb-8">
          <p className="text-gray-600">Track your investments and portfolio performance</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg pt-[24px] pl-[0px] pr-[0px] pb-[24px]">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioData.totalValue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg pt-[24px] pl-[0px] pr-[0px] pb-[24px]">
            <div>
              <p className="text-sm font-medium text-gray-600">Day Change</p>
              <p className={`text-2xl font-bold ${portfolioData.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(portfolioData.dayChange).toLocaleString()}
              </p>
              <p className={`text-sm ${portfolioData.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioData.dayChange >= 0 ? '+' : '-'}{portfolioData.dayChangePercent}%
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg pt-[24px] pl-[0px] pr-[0px] pb-[24px]">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${portfolioData.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(portfolioData.totalGainLoss).toLocaleString()}
              </p>
              <p className={`text-sm ${portfolioData.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioData.totalGainLoss >= 0 ? '+' : '-'}{portfolioData.totalGainLossPercent}%
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg pt-[24px] pl-[0px] pr-[0px] pb-[24px]">
            <div>
              <p className="text-sm font-medium text-gray-600">Holdings</p>
              <p className="text-2xl font-bold text-gray-900">{holdings.length}</p>
              <p className="text-sm text-gray-500">Positions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg pt-[24px] pl-[0px] pr-[0px] pb-[24px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Holdings</h2>
              <div className="overflow-x-auto pl-[0px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Symbol</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Name</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">Shares</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">Price</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">Value</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">Gain/Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) =>
                    <tr key={holding.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900 text-sm">{holding.symbol}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{holding.name}</td>
                        <td className="py-3 px-4 text-right text-gray-900 text-sm">{holding.shares}</td>
                        <td className="py-3 px-4 text-right text-gray-900 text-sm">${holding.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-gray-900 text-sm">${holding.value.toLocaleString()}</td>
                        <td className={`py-3 px-4 text-right font-medium text-sm ${
                      holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`
                      }>
                          ${Math.abs(holding.gainLoss).toFixed(2)} ({holding.gainLoss >= 0 ? '+' : '-'}{Math.abs(holding.gainLossPercent).toFixed(2)}%)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sector Allocation */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg pt-[24px] pl-[0px] pr-[0px] pb-[24px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sector Allocation</h2>
              <div className="space-y-4">
                {allocation.map((sector) =>
                <div key={sector.sector} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{sector.sector}</span>
                        <span className="text-sm text-gray-600">{sector.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${sector.percentage}%` }}>
                      </div>
                      </div>
                      <span className="text-xs text-gray-500">${sector.value.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>);

};

export default Portfolio;
