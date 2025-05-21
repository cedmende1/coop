import React from 'react';
interface TabButtonProps {
  id: string;
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}
export const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  count,
  active,
  onClick
}) => <button onClick={onClick} className={`
      px-4 py-3 text-sm font-medium relative flex items-center
      ${active ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}
      transition-colors duration-200
    `}>
    <span>{label}</span>
    {count !== undefined && count > 0 && <span className="ml-1.5 bg-neon-red text-white text-xs px-1.5 py-0.5 rounded-full">
        {count}
      </span>}
  </button>;