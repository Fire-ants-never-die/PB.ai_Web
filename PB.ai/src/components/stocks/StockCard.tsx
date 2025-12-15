
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {ArrowUpIcon, ArrowDownIcon, BarChart3Icon} from 'lucide-react';
import type { Stock } from '@/utils/stocksApi';
import { formatCurrency, formatPercentage, formatNumber, formatDate } from '@/utils/stocksApi';
import { Sparkline } from '@/components/stocks/Sparkline';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: Stock;
  priceHistory?: number[];
  className?: string;
  onClick?: () => void;
}

export function StockCard({ stock, priceHistory, className, onClick }: StockCardProps) {
  const isPositive = stock.change >= 0;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 bg-card/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-gray-300 transform-gpu",
        onClick ? "cursor-pointer hover:bg-card" : "",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3 spacing-tight">
        <div className="space-y-1.5">
          <CardTitle className="text-base font-semibold leading-none tracking-tight">{stock.symbol}</CardTitle>
          <p className="text-xs text-muted-foreground/80 truncate max-w-[180px] font-normal">{stock.name}</p>
        </div>
        <BarChart3Icon className="h-4 w-4 text-muted-foreground/60" />
      </CardHeader>
      <CardContent className="spacing-tight">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <div className="text-2xl font-semibold tracking-tight font-mono-numbers">{formatCurrency(stock.price)}</div>
            <div className="flex items-center text-xs">
              <span className={cn(
                "inline-flex items-center font-medium",
                isPositive ? "text-success" : "text-danger"
              )}>
                {isPositive ?
                  <ArrowUpIcon className="h-3 w-3 mr-1" /> :
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                }
                {formatCurrency(Math.abs(stock.change))} ({formatPercentage(stock.changePercent)})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-muted-foreground font-normal">Volume:</div>
              <div className="text-right font-medium font-mono-numbers">{formatNumber(stock.volume)}</div>
              <div className="text-muted-foreground font-normal">Mkt Cap:</div>
              <div className="text-right font-medium font-mono-numbers">{formatNumber(stock.marketCap)}</div>
              <div className="text-muted-foreground font-normal">Updated:</div>
              <div className="text-right font-medium">{formatDate(stock.lastUpdated)}</div>
            </div>
          </div>
          <div className="h-24 flex items-center">
            {priceHistory && priceHistory.length > 0 && (
              <Sparkline
                data={priceHistory}
                color={isPositive ? 'rgb(var(--success))' : 'rgb(var(--danger))'}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
