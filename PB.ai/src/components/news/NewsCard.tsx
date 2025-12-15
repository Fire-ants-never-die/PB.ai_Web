
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { NewsItem } from '@/utils/stocksApi';
import { formatDate } from '@/utils/stocksApi';
import { cn } from '@/lib/utils';
import {NewspaperIcon} from 'lucide-react';

interface NewsCardProps {
  news: NewsItem[];
  className?: string;
}

export function NewsCard({ news, className }: NewsCardProps) {
  return (
    <Card className={cn("overflow-hidden border-0 bg-card/95 backdrop-blur-sm rounded-xl", className)}>
      <CardHeader className="pb-4 spacing-tight">
        <div className="flex items-center">
          <NewspaperIcon className="h-5 w-5 mr-3 text-muted-foreground/70" />
          <h3 className="font-semibold text-lg tracking-tight">Market News</h3>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {news.map((item) =>
          <div key={item.id} className="py-5 px-6 transition-colors hover:bg-muted/20">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-base leading-snug pr-4 tracking-tight">{item.title}</h4>
                <span className="text-xs text-muted-foreground/70 whitespace-nowrap font-normal">
                  {formatDate(item.publishedAt)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground/80 mb-4 leading-relaxed font-normal">{item.summary}</p>

              {item.imageUrl &&
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover" />

                </div>
            }

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {item.relatedSymbols?.map((symbol) =>
                <Badge key={symbol} variant="outline" className="text-xs font-medium px-2 py-1">
                      {symbol}
                    </Badge>
                )}
                </div>
                <span className="text-xs font-medium text-primary/80">{item.source}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>);

}
