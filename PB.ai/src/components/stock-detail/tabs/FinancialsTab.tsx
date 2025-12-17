import {
  useFinancialStatements,
  useBalanceSheets,
  useCashFlowStatements,
  useOwnershipStructure,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FINANCIAL_LABELS } from '@/lib/data/static';
import { Button } from '@/components/ui/button';

interface FinancialsTabProps {
  code: string;
}

export function FinancialsTab({ code }: FinancialsTabProps) {
  const { periodType, setPeriodType } = useAppStore();
  const { data: financialStatements, isLoading: isFinancialsLoading } =
    useFinancialStatements(code, periodType);
  const { data: balanceSheets, isLoading: isBalanceLoading } = useBalanceSheets(
    code,
    periodType
  );
  const { data: cashFlows, isLoading: isCashFlowLoading } =
    useCashFlowStatements(code, periodType);
  const { data: ownership, isLoading: isOwnershipLoading } =
    useOwnershipStructure(code);

  if (
    isFinancialsLoading ||
    isBalanceLoading ||
    isCashFlowLoading ||
    isOwnershipLoading
  ) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const ownershipChartData = ownership?.map((item, index) => ({
    name: item.category,
    value: item.percentage,
    color: COLORS[index % COLORS.length],
  }));

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
            {FINANCIAL_LABELS.annual}
          </Button>
          <Button
            variant={periodType === 'quarterly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPeriodType('quarterly')}
            className="rounded-l-none"
          >
            {FINANCIAL_LABELS.quarterly}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">
            {FINANCIAL_LABELS.incomeStatement}
          </TabsTrigger>
          <TabsTrigger value="balance">
            {FINANCIAL_LABELS.balanceSheet}
          </TabsTrigger>
          <TabsTrigger value="cashflow">
            {FINANCIAL_LABELS.cashFlow}
          </TabsTrigger>
        </TabsList>

        {/* Income Statement */}
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>{FINANCIAL_LABELS.incomeStatement}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{FINANCIAL_LABELS.period}</TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.revenue}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.operatingIncome}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.netIncome}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.operatingMargin}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.netMargin}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialStatements?.map((statement) => (
                      <TableRow key={statement.period}>
                        <TableCell className="font-medium">
                          {statement.period}
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(statement.revenue / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(statement.operatingIncome / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(statement.netIncome / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          {statement.operatingMargin.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          {statement.netMargin.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Balance Sheet */}
        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>{FINANCIAL_LABELS.balanceSheet}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{FINANCIAL_LABELS.period}</TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.totalAssets}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.totalLiabilities}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.equity}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.debtRatio}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.currentRatio}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balanceSheets?.map((sheet) => (
                      <TableRow key={sheet.period}>
                        <TableCell className="font-medium">
                          {sheet.period}
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(sheet.totalAssets / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(sheet.totalLiabilities / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(sheet.equity / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          {sheet.debtRatio.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right">
                          {sheet.currentRatio.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow */}
        <TabsContent value="cashflow">
          <Card>
            <CardHeader>
              <CardTitle>{FINANCIAL_LABELS.cashFlow}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{FINANCIAL_LABELS.period}</TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.operatingCashFlow}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.investingCashFlow}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.financingCashFlow}
                      </TableHead>
                      <TableHead className="text-right">
                        {FINANCIAL_LABELS.freeCashFlow}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashFlows?.map((flow) => (
                      <TableRow key={flow.period}>
                        <TableCell className="font-medium">
                          {flow.period}
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(flow.operatingCashFlow / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          ₩{(flow.investingCashFlow / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          ₩{(flow.financingCashFlow / 100000000).toFixed(0)}억
                        </TableCell>
                        <TableCell className="text-right">
                          ₩{(flow.freeCashFlow / 100000000).toFixed(0)}억
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ownership Structure */}
      <Card>
        <CardHeader>
          <CardTitle>{FINANCIAL_LABELS.ownership}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pie Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ownershipChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ownershipChartData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${Number(value).toFixed(2)}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>구분</TableHead>
                    <TableHead className="text-right">비율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ownership?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.category}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentage.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
