import React from 'react';
import { cn } from './cn';

const controlBase =
  'w-full rounded-xl border border-line bg-canvas text-ink placeholder:text-faint ' +
  'transition-colors focus:border-accent focus:outline-none disabled:opacity-50';

export const Label: React.FC<{
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}> = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={cn('eyebrow mb-2 block', className)}>
    {children}
  </label>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => <input className={cn(controlBase, 'h-11 px-3.5 text-sm', className)} {...props} />;

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => (
  <textarea
    spellCheck={false}
    className={cn(controlBase, 'resize-y p-3.5 font-mono text-[0.8125rem] leading-relaxed', className)}
    {...props}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  className,
  children,
  ...props
}) => (
  <select className={cn(controlBase, 'h-11 cursor-pointer px-3.5 text-sm', className)} {...props}>
    {children}
  </select>
);

/** Label + control wrapper so every form row shares the same rhythm. */
export const Field: React.FC<{
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, htmlFor, hint, children, className }) => (
  <div className={cn('flex flex-col', className)}>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {hint && <p className="mt-2 text-xs text-faint">{hint}</p>}
  </div>
);

/** Inline error banner used across the tools. */
export const ErrorBanner: React.FC<{ message?: string | null }> = ({ message }) =>
  message ? (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3 text-sm text-red-600 dark:text-red-400"
    >
      <span aria-hidden="true">⚠</span>
      <span className="min-w-0 break-words">{message}</span>
    </div>
  ) : null;
