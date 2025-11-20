
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, DollarSignIcon} from 'lucide-react';
import type { CurrencyPair } from '@/utils/stocksApi';
import { formatDate } from '@/utils/stocksApi';
import { cn } from '@/lib/utils';

interface CurrencyExchangeProps {
  currencies: CurrencyPair[];
  className?: string;
}

export function CurrencyExchange({ currencies, className }: CurrencyExchangeProps) {
  return (
    <Card className={cn("overflow-hidden border-0 bg-card/95 backdrop-blur-sm card-shadow-sm rounded-xl", className)}>
      <CardHeader className="pb-4 spacing-tight">
        <CardTitle className="flex items-center font-semibold text-lg tracking-tight">
          <DollarSignIcon className="h-5 w-5 mr-3 text-muted-foreground/70" />
          Currency Exchange
        </CardTitle>
      </CardHeader>
      <CardContent className="spacing-tight">
        <div className="space-y-4">
          {currencies.map((currency) => (
            <div
              key={currency.symbol}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/8 text-primary font-semibold text-sm mr-3">
                  {currency.fromCurrency}
                </div>
                <ArrowRightIcon className="h-4 w-4 mx-3 text-muted-foreground/60" />
                <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/8 text-primary font-semibold text-sm mr-3">
                  {currency.toCurrency}
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-semibold font-mono-numbers">{currency.rate.toFixed(4)}</div>
                <div className={cn(
                  "flex items-center text-xs justify-end font-medium",
                  currency.change >= 0 ? "text-success" : "text-danger"
                )}>
                  {currency.change >= 0 ?
                    <ArrowUpIcon className="h-3 w-3 mr-1" /> :
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  }
                  {currency.change.toFixed(4)} ({(currency.changePercent).toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-right mt-5 text-muted-foreground/70 font-normal">
          Updated: {formatDate(new Date())}
        </div>
      </CardContent>
    </Card>
  );
}
