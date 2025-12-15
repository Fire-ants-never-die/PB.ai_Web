import {
  usePerShareMetrics,
  useMultiples,
  useProfitabilityRatios,
  useGrowthMetrics,
  useStabilityMetrics,
  useActivityMetrics,
} from '@/lib/api/hooks';
import { useAppStore } from '@/lib/store';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { INDICATORS_LABELS } from '@/lib/data/static';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface IndicatorsTabProps {
  code: string;
}

export function IndicatorsTab({ code }: IndicatorsTabProps) {
  const { periodType, setPeriodType } = useAppStore();
  const { data: perShareMetrics, isLoading: isPerShareLoading } =
    usePerShareMetrics(code, periodType);
  const { data: multiples, isLoading: isMultiplesLoading } = useMultiples(
    code,
    periodType
  );
  const { data: profitabilityRatios, isLoading: isProfitabilityLoading } =
    useProfitabilityRatios(code);
  const { data: growthMetrics, isLoading: isGrowthLoading } =
    useGrowthMetrics(code);
  const { data: stabilityMetrics, isLoading: isStabilityLoading } =
    useStabilityMetrics(code);
  const { data: activityMetrics, isLoading: isActivityLoading } =
    useActivityMetrics(code);

  if (
    isPerShareLoading ||
    isMultiplesLoading ||
    isProfitabilityLoading ||
    isGrowthLoading ||
    isStabilityLoading ||
    isActivityLoading
  ) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border">
          <Button
            variant={periodType === 'annual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPeriodType('annual')}
            className="rounded-r-none"
          >
            연간
          </Button>
          <Button
            variant={periodType === 'quarterly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPeriodType('quarterly')}
            className="rounded-l-none"
          >
            분기별
          </Button>
        </div>
      </div>

      {/* Per Share Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>{INDICATORS_LABELS.perShare}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={perShareMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="eps"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="EPS"
                  />
                  <Line
                    type="monotone"
                    dataKey="bps"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="BPS"
                  />
                  <Line
                    type="monotone"
                    dataKey="sps"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="SPS"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>기간</TableHead>
                    <TableHead className="text-right">EPS</TableHead>
                    <TableHead className="text-right">BPS</TableHead>
                    <TableHead className="text-right">CFPS</TableHead>
                    <TableHead className="text-right">SPS</TableHead>
                    <TableHead className="text-right">DPS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perShareMetrics?.map((metric) => (
                    <TableRow key={metric.period}>
                      <TableCell className="font-medium">
                        {metric.period}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{metric.eps.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{metric.bps.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{metric.cfps.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{metric.sps.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ₩{metric.dps.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multiples */}
      <Card>
        <CardHeader>
          <CardTitle>{INDICATORS_LABELS.multiples}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={multiples}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="per"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="PER"
                  />
                  <Line
                    type="monotone"
                    dataKey="pbr"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="PBR"
                  />
                  <Line
                    type="monotone"
                    dataKey="psr"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="PSR"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>기간</TableHead>
                    <TableHead className="text-right">PER</TableHead>
                    <TableHead className="text-right">PBR</TableHead>
                    <TableHead className="text-right">PSR</TableHead>
                    <TableHead className="text-right">PCR</TableHead>
                    <TableHead className="text-right">EV/EBITDA</TableHead>
                    <TableHead className="text-right">EV/Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {multiples?.map((metric) => (
                    <TableRow key={metric.period}>
                      <TableCell className="font-medium">
                        {metric.period}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.per.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.pbr.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.psr.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.pcr.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.evEbitda.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.evSales.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Ratios Accordion */}
      <Accordion type="multiple" className="w-full">
        {/* Profitability Ratios */}
        <AccordionItem value="profitability">
          <AccordionTrigger>
            <div className="text-lg font-semibold">
              {INDICATORS_LABELS.profitability}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{INDICATORS_LABELS.category}</TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.current}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.comparison}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryAvg}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.yearChange}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryChange}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profitabilityRatios?.map((ratio, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {ratio.category}
                          </TableCell>
                          <TableCell className="text-right">
                            {ratio.ratio2023.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {ratio.comparisonYear.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {ratio.industryAvg.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              ratio.yearChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {ratio.yearChange >= 0 ? '+' : ''}
                            {ratio.yearChange.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              ratio.industryChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {ratio.industryChange >= 0 ? '+' : ''}
                            {ratio.industryChange.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Growth Metrics */}
        <AccordionItem value="growth">
          <AccordionTrigger>
            <div className="text-lg font-semibold">
              {INDICATORS_LABELS.growth}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{INDICATORS_LABELS.category}</TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.current}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.comparison}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryAvg}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.yearChange}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryChange}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {growthMetrics?.map((metric, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {metric.category}
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.ratio2023.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.comparisonYear.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.industryAvg.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              metric.yearChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {metric.yearChange >= 0 ? '+' : ''}
                            {metric.yearChange.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              metric.industryChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {metric.industryChange >= 0 ? '+' : ''}
                            {metric.industryChange.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Stability Metrics */}
        <AccordionItem value="stability">
          <AccordionTrigger>
            <div className="text-lg font-semibold">
              {INDICATORS_LABELS.stability}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{INDICATORS_LABELS.category}</TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.current}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.comparison}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryAvg}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.yearChange}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryChange}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stabilityMetrics?.map((metric, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {metric.category}
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.ratio2023.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.comparisonYear.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.industryAvg.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              metric.yearChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {metric.yearChange >= 0 ? '+' : ''}
                            {metric.yearChange.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              metric.industryChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {metric.industryChange >= 0 ? '+' : ''}
                            {metric.industryChange.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Activity Metrics */}
        <AccordionItem value="activity">
          <AccordionTrigger>
            <div className="text-lg font-semibold">
              {INDICATORS_LABELS.activity}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{INDICATORS_LABELS.category}</TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.current}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.comparison}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryAvg}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.yearChange}
                        </TableHead>
                        <TableHead className="text-right">
                          {INDICATORS_LABELS.industryChange}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityMetrics?.map((metric, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {metric.category}
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.ratio2023.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.comparisonYear.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {metric.industryAvg.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              metric.yearChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {metric.yearChange >= 0 ? '+' : ''}
                            {metric.yearChange.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              metric.industryChange >= 0
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {metric.industryChange >= 0 ? '+' : ''}
                            {metric.industryChange.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
