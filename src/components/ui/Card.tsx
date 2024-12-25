import React from 'react';
import { cn } from './utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, title, header, footer }) => {
  return (
    <div className={cn('bg-black/30 backdrop-blur-sm rounded-lg', className)}>
      {title && (
        <div className="px-4 py-2 border-b border-gray-700 font-semibold text-white">{title}</div>
      )}
      {header}
      <div className="p-4">{children}</div>
      {footer}
    </div>
  );
};