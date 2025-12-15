
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Treemap, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { mockStocks, mockCryptos, generatePriceHistory, formatNumber } from '@/utils/stocksApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Bitcoin, TrendingUp, TrendingDown, Activity, BarChart3, PieChart as PieChartIcon, Target, Globe, Shield} from 'lucide-react';

const Analysis = () => {
  // Market sentiment data with different hues, largest value gets theme color
  const marketSentimentData = [
    { name: 'Extreme Fear', value: 15 },
    { name: 'Fear', value: 25 },
    { name: 'Neutral', value: 35 },
    { name: 'Greed', value: 20 },
    { name: 'Extreme Greed', value: 5 }
  ];

  // Find the largest value and assign colors
  const maxSentimentValue = Math.max(...marketSentimentData.map((item) => item.value));
  const marketSentiment = marketSentimentData.map((item, index) => {
    const hues = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']; // Blue, Green, Purple, Amber, Red
    return {
      ...item,
      color: item.value === maxSentimentValue ? '#FF5E00' : hues[index % hues.length]
    };
  });

  // Technical indicators data
  const technicalIndicators = [
    { name: 'RSI', value: 68, status: 'warning', description: 'Relative Strength Index' },
    { name: 'MACD', value: 85, status: 'bullish', description: 'Moving Average Convergence Divergence' },
    { name: 'MA50', value: 72, status: 'bullish', description: '50-Day Moving Average' },
    { name: 'MA200', value: 45, status: 'bearish', description: '200-Day Moving Average' },
    { name: 'Bollinger', value: 78, status: 'bullish', description: 'Bollinger Bands' },
    { name: 'Volume', value: 92, status: 'bullish', description: 'Volume Indicator' }
  ];

  // Sector performance data with brand colors
  const sectorPerformance = [
    { name: 'Technology', value: 12.5, volume: 2400000, color: '#FF5E00' },
    { name: 'Healthcare', value: 8.3, volume: 1800000, color: '#FF7A33' },
    { name: 'Finance', value: -2.1, volume: 3200000, color: '#FF6B1A' },
    { name: 'Consumer', value: 5.7, volume: 1600000, color: '#FF8F4D' },
    { name: 'Energy', value: -4.2, volume: 2800000, color: '#FF4D00' },
    { name: 'Materials', value: 1.9, volume: 1200000, color: '#FFA366' },
    { name: 'Utilities', value: -1.5, volume: 800000, color: '#FFB780' },
    { name: 'Real Estate', value: 3.4, volume: 1000000, color: '#FFCC99' }
  ];

  // Risk assessment data with different hues for each metric
  const riskMetrics = [
    { name: 'Volatility', value: 65, max: 100, color: '#FF5E00', fill: '#FF5E00' },
    { name: 'Correlation', value: 42, max: 100, color: '#3B82F6', fill: '#3B82F6' },
    { name: 'Downside Risk', value: 38, max: 100, color: '#10B981', fill: '#10B981' },
    { name: 'Sharpe Ratio', value: 78, max: 100, color: '#8B5CF6', fill: '#8B5CF6' },
    { name: 'Liquidity', value: 85, max: 100, color: '#F59E0B', fill: '#F59E0B' },
    { name: 'VaR Risk', value: 55, max: 100, color: '#EF4444', fill: '#EF4444' }
  ];

  // Market distribution data with different hues, largest value gets theme color
  const marketDistributionData = [
    { name: 'Large Cap', value: 55 },
    { name: 'Mid Cap', value: 30 },
    { name: 'Small Cap', value: 15 }
  ];

  const maxMarketValue = Math.max(...marketDistributionData.map((item) => item.value));
  const marketDistribution = marketDistributionData.map((item, index) => {
    const hues = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Purple
    return {
      ...item,
      color: item.value === maxMarketValue ? '#FF5E00' : hues[index % hues.length]
    };
  });

  // Regional distribution data with different hues, largest value gets theme color
  const regionDistributionData = [
    { name: 'North America', value: 45 },
    { name: 'Europe', value: 25 },
    { name: 'Asia', value: 20 },
    { name: 'Others', value: 10 }
  ];

  const maxRegionValue = Math.max(...regionDistributionData.map((item) => item.value));
  const regionDistribution = regionDistributionData.map((item, index) => {
    const hues = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']; // Blue, Green, Purple, Amber
    return {
      ...item,
      color: item.value === maxRegionValue ? '#FF5E00' : hues[index % hues.length]
    };
  });

  // Format stock data for heatmap - add safety checks
  const stockHeatmapData = mockStocks
    .filter((stock) => stock && typeof stock.changePercent === 'number') // Filter invalid data
    .map((stock) => ({
      name: stock.symbol || 'N/A',
      value: Math.abs(stock.changePercent || 0),
      changePercent: stock.changePercent || 0,
      price: stock.price || 0,
      volume: stock.volume || 0
    }))
    .sort((a, b) => b.changePercent - a.changePercent);

  // Cryptocurrency data - add safety checks
  const cryptoData = mockCryptos
    .filter((crypto) => crypto && typeof crypto.marketCap === 'number') // Filter invalid data
    .map((crypto) => ({
      name: crypto.name || 'Unknown',
      symbol: crypto.symbol || 'N/A',
      value: crypto.marketCap || 0,
      price: crypto.price || 0,
      change: crypto.changePercent || 0,
      marketCap: crypto.marketCap || 0,
      volume: crypto.volume || 0
    }))
    .sort((a, b) => b.value - a.value);

  // Generate price history data
  const [btcHistory] = useState(generatePriceHistory(30, 62000, 5));
  const [ethHistory] = useState(generatePriceHistory(30, 3200, 6));

  const btcHistoryData = btcHistory.map((price, index) => ({
    day: index + 1,
    price: price || 0
  }));

  const ethHistoryData = ethHistory.map((price, index) => ({
    day: index + 1,
    price: price || 0
  }));

  return (
    <PageLayout title="Market Analysis">
      <div className="space-y-8">
        {/* Market Overview Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white shadow-none hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-normal text-[#94A3B8]">Total Market Cap</p>
                  <p className="text-2xl font-bold text-[#020617]">$45.2T</p>
                  <p className="text-green-600 text-[14px]">+2.3% Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-none hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-normal text-[#94A3B8]">Active Trades</p>
                  <p className="text-2xl font-bold text-[#000000]">2,847</p>
                  <p className="text-green-600 text-[14px]">+156 Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-none hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-normal text-[#94A3B8]">Trading Volume</p>
                  <p className="text-2xl font-bold text-[#000000]">$2.8B</p>
                  <p className="text-red-600 text-[14px]">-1.2% Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-none hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-normal text-[#94A3B8]">Volatility Index</p>
                  <p className="text-2xl font-bold text-[#000000]">24.7</p>
                  <p className="text-orange-600 text-[14px]">Moderate Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sector Performance */}
          <div className="lg:col-span-2">
            <Card className="shadow-none hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-[14px] flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-[#FF5E00]" />
                  Sector Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="name"
                        fontSize={14}
                        tick={{ fill: '#6b7280' }}
                      />
                      <YAxis
                        fontSize={14}
                        tick={{ fill: '#6b7280' }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Change']}
                        labelFormatter={(label) => `Sector: ${label}`}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        fill="#FF5E00"
                      >
                        {sectorPerformance.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.value >= 0 ? '#10B981' : '#EF4444'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Sentiment */}
          <Card className="shadow-none hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-[14px] flex items-center gap-2">
                <Target className="h-6 w-6 text-[#FF5E00]" />
                Market Sentiment Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketSentiment}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {marketSentiment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Share']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {marketSentiment.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-[14px]">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Performance Heatmap */}
        <Card className="shadow-none hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-[14px] flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#FF5E00]" />
              Stock Performance Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={stockHeatmapData}
                  dataKey="value"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                />
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-[14px] text-gray-600">
              <p>Stock performance by percentage change, green indicates gains, red indicates losses</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Gains</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Losses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Indicators and Risk Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Indicators */}
          <Card className="shadow-none hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-[14px] flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-[#FF5E00]" />
                Technical Indicators Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicalIndicators.map((indicator, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[#00000000]">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[14px] text-[#000000]">{indicator.name}</h3>
                        <p className="text-[14px] text-[#94A3B8]">{indicator.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#000000]">{indicator.value}</span>
                        <div className={`text-[14px] font-medium ${
                          indicator.status === 'bullish' ? 'text-green-600' :
                          indicator.status === 'bearish' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {indicator.status === 'bullish' ? 'Bullish' :
                            indicator.status === 'bearish' ? 'Bearish' : 'Neutral'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full rounded-full h-2 bg-[#F1F5F9]">
                      <div
                        className="h-2 rounded-full bg-orange-500"
                        style={{ width: `${indicator.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card className="shadow-none hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-[14px] flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#FF5E00]" />
                Risk Assessment Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="80%"
                    data={riskMetrics}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={10}
                      fill="#FF5E00"
                    >
                      {riskMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </RadialBar>
                    <Tooltip
                      formatter={(value) => [`${value}/100`, 'Risk Score']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-2 rounded-lg bg-[#F1F5F9]">
                    <div className="text-[14px] font-normal text-[#94A3B8]">{metric.name}</div>
                    <div className="text-lg font-bold text-[#000000]">
                      {metric.value}/100
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cryptocurrency Analysis */}
        <Card className="shadow-none hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-[14px] flex items-center gap-2">
              <Bitcoin className="h-6 w-6 text-orange-500" />
              Cryptocurrency Market Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 bg-[#00000000]">
              {/* Bitcoin Price Trend */}
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="text-[14px] font-semibold mb-4 flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-orange-500" />
                  Bitcoin Price Trend (30 Days)
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={btcHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="day"
                        fontSize={14}
                        tick={{ fill: '#6b7280' }}
                      />
                      <YAxis
                        fontSize={14}
                        tick={{ fill: '#6b7280' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${Number(value || 0).toFixed(2)}`, 'Price']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#FF5E00"
                        fill="rgba(255, 94, 0, 0.2)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ethereum Price Trend */}
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="text-[14px] font-semibold mb-4 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">Ξ</div>
                  Ethereum Price Trend (30 Days)
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ethHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="day"
                        fontSize={14}
                        tick={{ fill: '#6b7280' }}
                      />
                      <YAxis
                        fontSize={14}
                        tick={{ fill: '#6b7280' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${Number(value || 0).toFixed(2)}`, 'Price']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#FF7A33"
                        fill="rgba(255, 122, 51, 0.2)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Cryptocurrency Rankings */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="text-left py-3 px-4 font-semibold text-black text-[14px]">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-black text-[14px]">Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-black text-[14px]">Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-black text-[14px]">24h %</th>
                    <th className="text-right py-3 px-4 font-semibold text-black text-[14px]">Market Cap</th>
                    <th className="text-right py-3 px-4 font-semibold text-black text-[14px]">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.map((crypto, index) => (
                    <tr key={crypto.symbol} className="border-b border-orange-100 hover:bg-orange-50 transition-colors">
                      <td className="py-3 px-4 text-black text-[14px]">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold text-black text-[14px]">{crypto.symbol}</div>
                            <div className="text-[14px] text-black">{crypto.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 font-semibold text-[14px] text-black">
                        ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
                      </td>
                      <td className={`text-right py-3 px-4 font-semibold text-[14px] ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="flex items-center justify-end gap-1">
                          {crypto.change >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-black text-[14px]">{formatNumber(crypto.marketCap)}</td>
                      <td className="text-right py-3 px-4 text-black text-[14px]">{formatNumber(crypto.volume)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Distribution Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Cap Distribution */}
          <Card className="shadow-none hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-[14px] flex items-center gap-2">
                <PieChartIcon className="h-6 w-6 text-[#FF5E00]" />
                Market Cap Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Share']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Regional Distribution */}
          <Card className="shadow-none hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-[14px] flex items-center gap-2">
                <Globe className="h-6 w-6 text-[#FF5E00]" />
                Regional Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Share']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Analysis;
