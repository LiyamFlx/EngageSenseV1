import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: LucideIcon;
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  children,
  className = '',
  loading = false,
  ...props
}) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses =
    variant === 'primary'
      ? 'bg-purple-600 hover:bg-purple-700 text-white'
      : variant === 'secondary'
      ? 'bg-gray-600 hover:bg-gray-700 text-white'
      : variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : variant === 'outline'
      ? 'border-2 border-var(--text-color) hover:bg-var(--text-color/10) text-var(--text-color)'
      : 'hover:bg-var(--text-color/10) text-var(--text-color)'; // text variant

  return (
    <button
      className={cn(
        'flex items-center gap-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses,
        className,
      )}
      {...props} disabled={props.disabled || loading}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </button>
  );
};