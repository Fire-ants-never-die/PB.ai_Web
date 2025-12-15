
import { ArrowUpIcon, ArrowDownIcon, GlobeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MarketIndex } from '@/utils/stocksApi';
import { formatPercentage } from '@/utils/stocksApi';

interface MarketOverviewProps {
  indices: MarketIndex[];
  className?: string;
}

export function MarketOverview({ indices, className }: MarketOverviewProps) {
  const groupedByRegion = indices.reduce<Record<string, MarketIndex[]>>((acc, index) => {
    if (!acc[index.region]) {
      acc[index.region] = [];
    }
    acc[index.region].push(index);
    return acc;
  }, {});

  return (
    <Card className={cn("overflow-hidden border-0 bg-card/95 backdrop-blur-sm card-shadow-sm rounded-xl", className)}>
      <CardHeader className="pb-4 spacing-tight">
        <CardTitle className="flex items-center font-semibold text-lg tracking-tight">
          <GlobeIcon className="h-5 w-5 mr-3 text-muted-foreground/70" />
          Global Markets
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid gap-0">
          {Object.entries(groupedByRegion).map(([region, indices]) =>
          <div key={region} className="py-4 px-6">
              <h3 className="text-sm font-medium mb-4 text-muted-foreground/80 tracking-tight">{region}</h3>
              <div className="space-y-3">
                {indices.map((index) =>
              <div
                key={index.symbol}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">

                    <div className="flex flex-col space-y-1">
                      <span className="font-medium tracking-tight">{index.name}</span>
                      <span className="text-xs text-muted-foreground/70 font-normal">{index.symbol}</span>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="font-semibold font-mono-numbers">{index.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</span>
                      <span className={cn(
                    "flex items-center text-xs font-medium",
                    index.change >= 0 ? "text-success" : "text-danger"
                  )}>
                        {index.change >= 0 ?
                    <ArrowUpIcon className="h-3 w-3 mr-1" /> :
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                    }
                        {formatPercentage(index.changePercent)}
                      </span>
                    </div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>);

}
