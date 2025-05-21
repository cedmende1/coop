import React from 'react';
interface PageHeaderProps {
  title: string;
  description?: string;
}
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description
}) => {
  return <div className="mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      {description && <p className="text-sm sm:text-base text-[rgb(var(--text-secondary))]">
          {description}
        </p>}
    </div>;
};