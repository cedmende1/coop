import React from 'react';
import { PageHeader } from '../components/PageHeader';
export const Repayments = () => {
  return <>
      <PageHeader title="Repayments" description="Track and manage loan repayments" />
      <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-center h-60 sm:h-80">
          <p className="text-[rgb(var(--text-secondary))]">
            Repayments content will appear here
          </p>
        </div>
      </div>
    </>;
};