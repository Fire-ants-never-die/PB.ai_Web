import type { CompanyInfo } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompanyHeaderProps {
  companyInfo: CompanyInfo;
}

export function CompanyHeader({ companyInfo }: CompanyHeaderProps) {
  const isPositive = companyInfo.priceChange >= 0;
  const formattedPrice = companyInfo.currentPrice.toLocaleString('ko-KR');
  const formattedChange = Math.abs(companyInfo.priceChange).toLocaleString('ko-KR');
  const formattedPercent = Math.abs(companyInfo.priceChangePercent).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Company Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
            <span className="text-xl font-bold">농</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {companyInfo.name}({companyInfo.code})
            </h1>
          </div>
        </div>

        {/* Price Info */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-bold">₩{formattedPrice}</div>
            <div
              className={`flex items-center gap-1 text-sm ${
                isPositive ? 'text-red-600' : 'text-blue-600'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {isPositive ? '+' : '-'}₩{formattedChange} ({isPositive ? '+' : '-'}
                {formattedPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
