import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TrendingUpIcon, TrendingDownIcon, CalendarIcon, ArrowRightIcon } from 'lucide-react';
// Define types for revenue data
interface RevenueMetrics {
  totalRevenue: number;
  netIncome: number;
  growthRate: number;
  previousPeriod: number;
}
interface RevenueBreakdown {
  period: string;
  loanInterest: number;
  fees: number;
  otherIncome: number;
  total: number;
}
// Mock data for revenue metrics
const mockRevenueMetrics: RevenueMetrics = {
  totalRevenue: 1250000,
  netIncome: 750000,
  growthRate: 8.5,
  previousPeriod: 1150000
};
// Mock data for monthly revenue breakdown
const mockMonthlyBreakdown: RevenueBreakdown[] = [{
  period: '2023-01',
  loanInterest: 85000,
  fees: 15000,
  otherIncome: 5000,
  total: 105000
}, {
  period: '2023-02',
  loanInterest: 87500,
  fees: 16000,
  otherIncome: 4500,
  total: 108000
}, {
  period: '2023-03',
  loanInterest: 90000,
  fees: 17000,
  otherIncome: 6000,
  total: 113000
}, {
  period: '2023-04',
  loanInterest: 92500,
  fees: 16500,
  otherIncome: 5500,
  total: 114500
}, {
  period: '2023-05',
  loanInterest: 95000,
  fees: 17500,
  otherIncome: 6500,
  total: 119000
}, {
  period: '2023-06',
  loanInterest: 97500,
  fees: 18000,
  otherIncome: 7000,
  total: 122500
}, {
  period: '2023-07',
  loanInterest: 100000,
  fees: 18500,
  otherIncome: 7500,
  total: 126000
}, {
  period: '2023-08',
  loanInterest: 105000,
  fees: 19000,
  otherIncome: 8000,
  total: 132000
}, {
  period: '2023-09',
  loanInterest: 110000,
  fees: 20000,
  otherIncome: 8500,
  total: 138500
}, {
  period: '2023-10',
  loanInterest: 115000,
  fees: 21000,
  otherIncome: 9000,
  total: 145000
}, {
  period: '2023-11',
  loanInterest: 120000,
  fees: 22000,
  otherIncome: 9500,
  total: 151500
}, {
  period: '2023-12',
  loanInterest: 125000,
  fees: 23000,
  otherIncome: 10000,
  total: 158000
}];
// Mock data for quarterly revenue breakdown
const mockQuarterlyBreakdown: RevenueBreakdown[] = [{
  period: 'Q1 2023',
  loanInterest: 262500,
  fees: 48000,
  otherIncome: 15500,
  total: 326000
}, {
  period: 'Q2 2023',
  loanInterest: 285000,
  fees: 52000,
  otherIncome: 19000,
  total: 356000
}, {
  period: 'Q3 2023',
  loanInterest: 315000,
  fees: 57500,
  otherIncome: 24000,
  total: 396500
}, {
  period: 'Q4 2023',
  loanInterest: 360000,
  fees: 66000,
  otherIncome: 28500,
  total: 454500
}];
// Mock data for annual revenue breakdown
const mockAnnualBreakdown: RevenueBreakdown[] = [{
  period: '2021',
  loanInterest: 950000,
  fees: 175000,
  otherIncome: 75000,
  total: 1200000
}, {
  period: '2022',
  loanInterest: 1050000,
  fees: 190000,
  otherIncome: 85000,
  total: 1325000
}, {
  period: '2023',
  loanInterest: 1222500,
  fees: 223500,
  otherIncome: 87000,
  total: 1533000
}];
export const RevenueAnalysis = () => {
  // State for period filter
  const [periodFilter, setPeriodFilter] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  // Format percentage
  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
  };
  // Get data based on period filter
  const getRevenueBreakdownData = () => {
    switch (periodFilter) {
      case 'quarterly':
        return mockQuarterlyBreakdown;
      case 'annually':
        return mockAnnualBreakdown;
      default:
        return mockMonthlyBreakdown;
    }
  };
  // Format period for display
  const formatPeriod = (period: string) => {
    if (periodFilter === 'monthly') {
      const date = new Date(period + '-01');
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    }
    return period;
  };
  // Get revenue data
  const revenueData = getRevenueBreakdownData();
  return <>
      <PageHeader title="Revenue Analysis" description="Analyze revenue streams and financial performance" />
      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Revenue Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(mockRevenueMetrics.totalRevenue)}
                </h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUpIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium mr-1">
                {formatPercentage(mockRevenueMetrics.growthRate)}
              </span>
              <span className="text-[rgb(var(--text-secondary))]">
                vs previous period
              </span>
            </div>
          </div>
          {/* Net Income Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Net Income
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(mockRevenueMetrics.netIncome)}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <TrendingUpIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[rgb(var(--text-secondary))]">
                {(mockRevenueMetrics.netIncome / mockRevenueMetrics.totalRevenue * 100).toFixed(1)}
                % of total revenue
              </span>
            </div>
          </div>
          {/* Growth Rate Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Growth Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatPercentage(mockRevenueMetrics.growthRate)}
                </h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUpIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[rgb(var(--text-secondary))]">
                Year-over-year growth
              </span>
            </div>
          </div>
          {/* Previous Period Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Previous Period
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(mockRevenueMetrics.previousPeriod)}
                </h3>
              </div>
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[rgb(var(--text-secondary))]">
                Previous comparable period
              </span>
            </div>
          </div>
        </div>
        {/* Revenue Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
            <div className="flex rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <button onClick={() => setPeriodFilter('monthly')} className={`px-3 py-1.5 text-sm ${periodFilter === 'monthly' ? 'bg-neon-red text-white' : 'bg-[rgba(var(--input-bg),0.8)] text-[rgb(var(--text-primary))]'}`}>
                Monthly
              </button>
              <button onClick={() => setPeriodFilter('quarterly')} className={`px-3 py-1.5 text-sm ${periodFilter === 'quarterly' ? 'bg-neon-red text-white' : 'bg-[rgba(var(--input-bg),0.8)] text-[rgb(var(--text-primary))]'}`}>
                Quarterly
              </button>
              <button onClick={() => setPeriodFilter('annually')} className={`px-3 py-1.5 text-sm ${periodFilter === 'annually' ? 'bg-neon-red text-white' : 'bg-[rgba(var(--input-bg),0.8)] text-[rgb(var(--text-primary))]'}`}>
                Annually
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    {periodFilter === 'monthly' ? 'Month' : periodFilter === 'quarterly' ? 'Quarter' : 'Year'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Loan Interest
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Other Income
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
                {revenueData.map((item, index) => <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                      {formatPeriod(item.period)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      {formatCurrency(item.loanInterest)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      {formatCurrency(item.fees)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      {formatCurrency(item.otherIncome)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>)}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    Total
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                    {formatCurrency(revenueData.reduce((sum, item) => sum + item.loanInterest, 0))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                    {formatCurrency(revenueData.reduce((sum, item) => sum + item.fees, 0))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                    {formatCurrency(revenueData.reduce((sum, item) => sum + item.otherIncome, 0))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                    {formatCurrency(revenueData.reduce((sum, item) => sum + item.total, 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        {/* Revenue Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Source */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-4">Revenue by Source</h3>
            <div className="space-y-4">
              {/* Loan Interest */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Loan Interest</span>
                  <span className="text-sm font-medium">
                    {(revenueData.reduce((sum, item) => sum + item.loanInterest, 0) / revenueData.reduce((sum, item) => sum + item.total, 0) * 100).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: `${revenueData.reduce((sum, item) => sum + item.loanInterest, 0) / revenueData.reduce((sum, item) => sum + item.total, 0) * 100}%`
                }}></div>
                </div>
              </div>
              {/* Fees */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Fees</span>
                  <span className="text-sm font-medium">
                    {(revenueData.reduce((sum, item) => sum + item.fees, 0) / revenueData.reduce((sum, item) => sum + item.total, 0) * 100).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{
                  width: `${revenueData.reduce((sum, item) => sum + item.fees, 0) / revenueData.reduce((sum, item) => sum + item.total, 0) * 100}%`
                }}></div>
                </div>
              </div>
              {/* Other Income */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Other Income</span>
                  <span className="text-sm font-medium">
                    {(revenueData.reduce((sum, item) => sum + item.otherIncome, 0) / revenueData.reduce((sum, item) => sum + item.total, 0) * 100).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{
                  width: `${revenueData.reduce((sum, item) => sum + item.otherIncome, 0) / revenueData.reduce((sum, item) => sum + item.total, 0) * 100}%`
                }}></div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Loan Interest
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Fees
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Other Income
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Period Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-4">Period Comparison</h3>
            <div className="space-y-6">
              {/* Current vs Previous Period */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">
                    Current vs Previous Period
                  </h4>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mockRevenueMetrics.growthRate > 0 ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'}`}>
                    {formatPercentage(mockRevenueMetrics.growthRate)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-[rgb(var(--text-secondary))]">
                      Previous
                    </div>
                    <div className="font-medium">
                      {formatCurrency(mockRevenueMetrics.previousPeriod)}
                    </div>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                  <div className="flex-1">
                    <div className="text-sm text-[rgb(var(--text-secondary))]">
                      Current
                    </div>
                    <div className="font-medium">
                      {formatCurrency(mockRevenueMetrics.totalRevenue)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Monthly Growth Trend */}
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Monthly Growth Trend
                </h4>
                <div className="h-32 flex items-end gap-1">
                  {mockMonthlyBreakdown.slice(-6).map((item, index) => {
                  const height = item.total / Math.max(...mockMonthlyBreakdown.map(i => i.total)) * 100;
                  const prevMonth = index > 0 ? mockMonthlyBreakdown.slice(-6)[index - 1].total : null;
                  const growth = prevMonth ? (item.total - prevMonth) / prevMonth * 100 : 0;
                  return <div key={index} className="flex flex-col items-center flex-1">
                        <div className="text-xs text-[rgb(var(--text-secondary))] mb-1">
                          {growth > 0 ? <span className="text-green-600 dark:text-green-400">
                              +{growth.toFixed(1)}%
                            </span> : <span className="text-red-600 dark:text-red-400">
                              {growth.toFixed(1)}%
                            </span>}
                        </div>
                        <div className={`w-full rounded-t-sm ${growth >= 0 ? 'bg-blue-500' : 'bg-red-500'}`} style={{
                      height: `${height}%`
                    }}></div>
                        <div className="text-xs mt-1">
                          {formatPeriod(item.period).substring(0, 3)}
                        </div>
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};