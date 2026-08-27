import React from 'react';

/** Inline code span styled to match the site's mono scale. */
export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[0.8125em] text-accent">
    {children}
  </code>
);

export default InlineCode;
