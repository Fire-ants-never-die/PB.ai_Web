
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useStockData, mockStocks, generatePriceHistory } from '@/utils/stocksApi';
import { StockCard } from '@/components/stocks/StockCard';
import { StockChart } from '@/components/stocks/StockChart';

const Stocks = () => {
  const stocks = useStockData(mockStocks);
  const [selectedStock, setSelectedStock] = React.useState(stocks[0]);

  const stocksWithHistory = stocks.map((stock) => {
    return {
      ...stock,
      priceHistory: generatePriceHistory(30, stock.price, 2)
    };
  });

  return (
    <PageLayout title="Stocks">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold">All Stocks</h2>
          <div className="space-y-4">
            {stocksWithHistory.map((stock) =>
            <StockCard
              key={stock.symbol}
              stock={stock}
              priceHistory={stock.priceHistory}
              onClick={() => setSelectedStock(stock)}
              className={selectedStock.symbol === stock.symbol ? "ring-2 ring-primary" : ""} />

            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="sticky top-20 z-10 mt-[44px]">
            <StockChart
              symbol={selectedStock.symbol}
              name={selectedStock.name}
              currentPrice={selectedStock.price}
              volatility={2.5} />
          </div>
        </div>
      </div>

      {/* Fixed stock info cards at bottom right - horizontal layout */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-20 pointer-events-none text-base mb-[0px] pb-[0px]">
        <div className="bg-card rounded-lg shadow-lg border pointer-events-auto backdrop-blur-sm pt-[8px] pl-[16px] pr-[16px] pb-[8px] mt-[4px] mb-[16px]">
          <h3 className="text-muted-foreground text-xs font-normal">Market Cap</h3>
          <p className="font-semibold mt-1 text-base">
            ${(selectedStock.marketCap / 1000000000).toFixed(2)}B
          </p>
        </div>
        <div className="bg-card rounded-lg shadow-lg border pointer-events-auto backdrop-blur-sm pt-[8px] pl-[16px] pr-[16px] pb-[8px] mt-[4px] mb-[16px]">
          <h3 className="text-muted-foreground text-xs font-normal">Volume</h3>
          <p className="font-semibold mt-1 text-base">
            {(selectedStock.volume / 1000000).toFixed(2)}M
          </p>
        </div>
        <div className="bg-card rounded-lg shadow-lg border pointer-events-auto backdrop-blur-sm pt-[8px] pl-[16px] pr-[16px] pb-[8px] mt-[4px] mb-[16px]">
          <h3 className="text-muted-foreground font-normal text-xs">52W Range</h3>
          <p className="font-semibold mt-1 text-base">
            ${(selectedStock.price * 0.8).toFixed(2)} - ${(selectedStock.price * 1.2).toFixed(2)}
          </p>
        </div>
      </div>
    </PageLayout>);

};

export default Stocks;
