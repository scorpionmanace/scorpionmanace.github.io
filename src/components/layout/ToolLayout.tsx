import React from 'react';
import { PageHead } from '../notebook/PageHead';

interface ToolLayoutProps {
  title: string;
  description: string;
  /** Accepted for compatibility; tools no longer carry a glyph badge. */
  icon?: string;
  category?: string;
  /** Right-aligned controls (export buttons, mode switches…). */
  actions?: React.ReactNode;
  children: React.ReactNode;
  /** Let the tool paint its own full-width surface instead of a sheet. */
  bleed?: boolean;
}

/**
 * Shared frame for every tool page: the pad header, then the tool itself on a
 * clean sheet laid over the graph paper — a working surface, not decoration.
 */
export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  category,
  actions,
  children,
  bleed = false,
}) => (
  <div className="flex flex-1 flex-col bg-canvas">
    <PageHead
      crumbs={[
        { label: 'Home', to: '/' },
        { label: 'Tools', to: '/tools' },
        { label: title },
      ]}
      folio={category ? `${category} tool` : 'Tool'}
      title={title}
      lede={description}
      actions={actions}
    />

    <div className="grid-bg paper flex-1 border-t border-line px-3 pb-16 sm:px-8 md:pb-24">
      <div className="mx-auto w-full max-w-content -translate-y-6">
        {bleed ? (
          children
        ) : (
          <div className="rounded-[3px] bg-raised shadow-float">{children}</div>
        )}
      </div>
    </div>
  </div>
);

export default ToolLayout;
