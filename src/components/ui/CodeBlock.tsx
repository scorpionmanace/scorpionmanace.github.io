import React, { useState } from 'react';
import { cn } from './cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Hide the copy button for short inline-ish snippets. */
  copyable?: boolean;
  className?: string;
  /** Cap the height and scroll instead of growing without bound. */
  maxHeight?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  copyable = true,
  className,
  maxHeight,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard can be blocked; the text remains selectable. */
    }
  };

  return (
    <div className={cn('group relative overflow-hidden rounded-xl border border-line bg-sunken', className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-faint">
          {language}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md px-2 py-1 font-mono text-[0.6875rem] text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      <pre
        className="overflow-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-soft"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
