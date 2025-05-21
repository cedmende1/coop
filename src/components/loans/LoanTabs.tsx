import React from 'react';
export type LoanTabType = 'loans' | 'repayments' | 'approvals';
interface LoanTabsProps {
  activeTab: LoanTabType;
  setActiveTab: (tab: LoanTabType) => void;
  counts: {
    loans: number;
    repayments: number;
    approvals: number;
  };
}
export const LoanTabs: React.FC<LoanTabsProps> = ({
  activeTab,
  setActiveTab,
  counts
}) => {
  return <div className="border-b border-[rgba(var(--border-color),0.2)] mb-4">
      <div className="flex overflow-x-auto scrollbar-hide">
        <TabButton label="Loan List" active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} count={counts.loans} />
        <TabButton label="Repayment Tracking" active={activeTab === 'repayments'} onClick={() => setActiveTab('repayments')} count={counts.repayments} />
        <TabButton label="Pending Approvals" active={activeTab === 'approvals'} onClick={() => setActiveTab('approvals')} count={counts.approvals} />
      </div>
    </div>;
};
interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}
const TabButton: React.FC<TabButtonProps> = ({
  label,
  active,
  onClick,
  count
}) => {
  return <button onClick={onClick} className={`
        px-4 py-3 text-sm font-medium relative flex items-center whitespace-nowrap
        ${active ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}
        transition-colors duration-200
      `}>
      <span>{label}</span>
      <span className={`ml-1.5 ${active ? 'bg-neon-red text-white' : 'bg-gray-200 dark:bg-gray-700 text-[rgb(var(--text-secondary))]'} text-xs px-1.5 py-0.5 rounded-full`}>
        {count}
      </span>
    </button>;
};