import React from 'react';
interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange
}) => {
  return <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <button onClick={() => onChange('english')} className={`flex items-center justify-between p-4 rounded-lg border ${value === 'english' ? 'border-neon-red' : 'border-[rgba(var(--border-color),0.3)]'}`}>
          <div className="flex items-center gap-3">
            <span className="text-lg">🇺🇸</span>
            <div className="text-left">
              <p className="font-medium">English</p>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Use English language
              </p>
            </div>
          </div>
          {value === 'english' && <div className="h-2 w-2 rounded-full bg-neon-red"></div>}
        </button>
        <button onClick={() => onChange('filipino')} className={`flex items-center justify-between p-4 rounded-lg border ${value === 'filipino' ? 'border-neon-red' : 'border-[rgba(var(--border-color),0.3)]'}`}>
          <div className="flex items-center gap-3">
            <span className="text-lg">🇵🇭</span>
            <div className="text-left">
              <p className="font-medium">Filipino</p>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Gamitin ang wikang Filipino
              </p>
            </div>
          </div>
          {value === 'filipino' && <div className="h-2 w-2 rounded-full bg-neon-red"></div>}
        </button>
      </div>
      <div>
        <label htmlFor="dateFormat" className="block font-medium mb-2">
          Date Format
        </label>
        <select id="dateFormat" className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]">
          <option value="mdy">MM/DD/YYYY</option>
          <option value="dmy">DD/MM/YYYY</option>
          <option value="ymd">YYYY/MM/DD</option>
        </select>
      </div>
    </div>;
};