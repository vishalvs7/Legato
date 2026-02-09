import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export function Textarea({
  className,
  error,
  label,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900',
          'focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none',
          'transition-colors placeholder:text-gray-400 min-h-[100px]',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}