import React, { useState } from 'react';
import { UserIcon, MonitorIcon, CreditCardIcon, Users2Icon, LandmarkIcon, HomeIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, CheckIcon, BriefcaseIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const demoAccounts = {
  admin: {
    email: 'admin@lendology.com',
    password: 'admin123'
  },
  it: {
    email: 'it@lendology.com',
    password: 'tech123'
  },
  member: {
    email: 'member@lendology.com',
    password: 'member123'
  },
  accounting: {
    email: 'accounting@lendology.com',
    password: 'finance123'
  },
  hr: {
    email: 'hr@lendology.com',
    password: 'people123'
  },
  treasury: {
    email: 'treasury@lendology.com',
    password: 'money123'
  },
  director: {
    email: 'director@lendology.com',
    password: 'director123'
  }
};
type AccountType = keyof typeof demoAccounts;
export const LoginForm = () => {
  const {
    theme
  } = useTheme();
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleAccountSelect = (accountType: AccountType) => {
    const account = demoAccounts[accountType];
    setEmail(account.email);
    setPassword(account.password);
    setSelectedAccount(accountType);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const isAccountSelected = (accountType: AccountType) => selectedAccount === accountType;
  // Demo account buttons configuration
  const demoAccountButtons = [{
    type: 'admin' as AccountType,
    icon: <UserIcon size={16} />,
    label: 'Admin'
  }, {
    type: 'director' as AccountType,
    icon: <BriefcaseIcon size={16} />,
    label: 'Director'
  }, {
    type: 'it' as AccountType,
    icon: <MonitorIcon size={16} />,
    label: 'IT'
  }, {
    type: 'accounting' as AccountType,
    icon: <CreditCardIcon size={16} />,
    label: 'Accounting'
  }, {
    type: 'hr' as AccountType,
    icon: <Users2Icon size={16} />,
    label: 'HR'
  }, {
    type: 'treasury' as AccountType,
    icon: <LandmarkIcon size={16} />,
    label: 'Treasury'
  }, {
    type: 'member' as AccountType,
    icon: <UserIcon size={16} />,
    label: 'Member'
  }];
  return <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
      <p className="text-[rgb(var(--text-secondary))] mb-8">
        Enter your credentials to sign in
      </p>
      <div className="w-full mb-8">
        <p className="text-center text-[rgb(var(--text-secondary))] mb-4">
          Login with demo account:
        </p>
        {/* Demo account buttons - improved grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {demoAccountButtons.map(item => <button key={item.type} onClick={() => handleAccountSelect(item.type)} className={`
                group flex items-center justify-center sm:justify-start gap-2 py-2 px-3
                border rounded-lg text-sm font-medium
                transition-all duration-300 ease-in-out
                ${isAccountSelected(item.type) ? theme === 'dark' ? 'bg-neon-red border-neon-red/70 text-white' : 'bg-neon-red/10 border-neon-red/50 text-neon-red' : theme === 'dark' ? 'border-[rgba(var(--border-color),0.8)] hover:bg-neon-red/20 hover:border-neon-red/40' : 'border-[rgba(var(--border-color),0.8)] hover:bg-neon-red/5 hover:border-neon-red/30'}
                hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0
              `} aria-pressed={isAccountSelected(item.type)}>
              <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                {isAccountSelected(item.type) ? <CheckIcon size={16} /> : item.icon}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(' ')[0]}</span>
            </button>)}
        </div>
      </div>
      <div className="w-full flex items-center mb-8">
        <div className="flex-1 h-px bg-[rgba(var(--border-color),0.8)]"></div>
        <span className="px-3 text-xs text-[rgb(var(--text-secondary))]">
          OR CONTINUE WITH
        </span>
        <div className="flex-1 h-px bg-[rgba(var(--border-color),0.8)]"></div>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input id="email" type="email" value={email} onChange={e => {
          setEmail(e.target.value);
          setSelectedAccount(null);
        }} placeholder="your.email@example.com" className={`
              w-full px-4 py-2.5 rounded-lg
              bg-[rgba(var(--input-bg),0.8)] 
              border border-[rgba(var(--border-color),0.8)]
              text-[rgb(var(--text-primary))]
              placeholder:text-[rgb(var(--text-secondary))]
              focus:outline-none focus:ring-2 focus:ring-neon-red/40
              transition-all duration-300 ease-in-out
            `} required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1.5">
            Password
          </label>
          <div className="relative">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => {
            setPassword(e.target.value);
            setSelectedAccount(null);
          }} placeholder="••••••••" className={`
                w-full px-4 py-2.5 rounded-lg
                bg-[rgba(var(--input-bg),0.8)] 
                border border-[rgba(var(--border-color),0.8)]
                text-[rgb(var(--text-primary))]
                placeholder:text-[rgb(var(--text-secondary))]
                focus:outline-none focus:ring-2 focus:ring-neon-red/40
                transition-all duration-300 ease-in-out
              `} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))] hover:text-neon-red transition-all duration-300" aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className={`
            group w-full py-3 rounded-lg font-medium mb-5
            flex items-center justify-center gap-2
            ${theme === 'dark' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}
            shadow-lg hover:shadow-neon-red/20
            transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0
            hover:border-neon-red/50 border border-transparent
            ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}
          `}>
          {isLoading ? <svg className={`animate-spin h-5 w-5 ${theme === 'dark' ? 'text-gray-900' : 'text-white'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> : <>
              <span>Sign In</span>
              <ArrowRightIcon size={18} className="transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </>}
        </button>
        <div className="text-center mb-8">
          <a href="#" className="relative inline-block text-sm text-[rgb(var(--text-secondary))] hover:text-neon-red transition-all duration-300 ease-in-out hover-underline-animation">
            <span className="relative z-10">Forgot your password?</span>
          </a>
        </div>
      </form>
      <div className="w-full pt-4 border-t border-[rgba(var(--border-color),0.8)]">
        <a href="#" onClick={e => {
        e.preventDefault();
        navigate('/landing');
      }} className="group flex items-center justify-center gap-1.5 text-[rgb(var(--text-secondary))] hover:text-neon-red transition-all duration-300 ease-in-out">
          <HomeIcon size={16} className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
          <span className="transition-all duration-300 ease-in-out group-hover:translate-x-0.5">
            Visit Landing Page
          </span>
        </a>
      </div>
    </div>;
};