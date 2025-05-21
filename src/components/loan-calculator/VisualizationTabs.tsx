import React, { useState } from 'react';
import { BarChart4Icon, PieChartIcon, TableIcon, ChevronDownIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AmortizationRow } from '../../hooks/useLoanCalculator';
type VisualizationTabType = 'bar-chart' | 'pie-chart';
interface VisualizationTabsProps {
  amortizationSchedule: AmortizationRow[];
  totalInterest: number;
  totalPrincipal: number;
  formatCurrency: (amount: number) => string;
}
export const VisualizationTabs: React.FC<VisualizationTabsProps> = ({
  amortizationSchedule,
  totalInterest,
  totalPrincipal,
  formatCurrency
}) => {
  const [activeTab, setActiveTab] = useState<VisualizationTabType>('bar-chart');
  // Prepare data for bar chart
  const barChartData = amortizationSchedule.map(row => ({
    month: row.month,
    principal: row.principal,
    interest: row.interest
  }));
  // Prepare data for pie chart
  const pieChartData = [{
    name: 'Principal',
    value: totalPrincipal
  }, {
    name: 'Interest',
    value: totalInterest
  }];
  const COLORS = ['#3182CE', 'rgb(var(--neon-red))'];
  // Custom tooltip for the bar chart
  const CustomBarTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-md border border-[rgba(var(--border-color),0.2)]">
          <p className="font-medium">Month {label}</p>
          {payload.map((entry: any, index: number) => <p key={`item-${index}`} style={{
          color: entry.color
        }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>)}
        </div>;
    }
    return null;
  };
  // Custom tooltip for the pie chart
  const CustomPieTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-md border border-[rgba(var(--border-color),0.2)]">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm" style={{
          color: payload[0].color
        }}>
            {formatCurrency(payload[0].value)} (
            {(payload[0].value / (totalPrincipal + totalInterest) * 100).toFixed(1)}
            %)
          </p>
        </div>;
    }
    return null;
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <BarChart4Icon className="w-5 h-5 text-neon-red" />
          Loan Visualization
        </h2>
      </div>
      <div className="flex border-b border-[rgba(var(--border-color),0.2)]">
        <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'bar-chart' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('bar-chart')}>
          <div className="flex items-center gap-2">
            <BarChart4Icon size={16} />
            <span>Payment Breakdown</span>
          </div>
        </button>
        <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'pie-chart' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('pie-chart')}>
          <div className="flex items-center gap-2">
            <PieChartIcon size={16} />
            <span>Payment Distribution</span>
          </div>
        </button>
      </div>
      <div className="p-5">
        {activeTab === 'bar-chart' && <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{
              value: 'Month',
              position: 'insideBottom',
              offset: -5
            }} />
                <YAxis tickFormatter={value => formatCurrency(value).replace('₱', '')} label={{
              value: 'Amount (₱)',
              angle: -90,
              position: 'insideLeft'
            }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend />
                <Bar dataKey="principal" name="Principal" fill="#3182CE" stackId="a" />
                <Bar dataKey="interest" name="Interest" fill="rgb(var(--neon-red))" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>}
        {activeTab === 'pie-chart' && <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" label={({
              name,
              percent
            }) => `${name}: ${(percent * 100).toFixed(1)}%`}>
                  {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>}
        <div className="mt-4 pt-4 border-t border-[rgba(var(--border-color),0.2)] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Principal Amount</h3>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalPrincipal)}
            </p>
            <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
              {(totalPrincipal / (totalPrincipal + totalInterest) * 100).toFixed(1)}
              % of total payment
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Interest Amount</h3>
            <p className="text-xl font-bold text-neon-red">
              {formatCurrency(totalInterest)}
            </p>
            <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
              {(totalInterest / (totalPrincipal + totalInterest) * 100).toFixed(1)}
              % of total payment
            </p>
          </div>
        </div>
      </div>
    </div>;
};