import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../ui/cn';

export interface Crumb {
  label: string;
  /** Omit on the final crumb — it renders as the current page. */
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Slim inline breadcrumbs. Emits schema.org BreadcrumbList microdata so the
 * trail is machine-readable for search results, which the old purely-visual
 * breadcrumb band was not.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => (
  <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
    <ol
      className="flex flex-wrap items-center gap-x-2 gap-y-1"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;

        return (
          <li
            key={`${crumb.label}-${index}`}
            className="flex items-center gap-2"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <span className="text-faint" aria-hidden="true">
                /
              </span>
            )}

            {crumb.to && !isLast ? (
              <Link
                to={crumb.to}
                itemProp="item"
                className="eyebrow transition-colors hover:text-accent"
              >
                <span itemProp="name">{crumb.label}</span>
              </Link>
            ) : (
              <span className="eyebrow text-ink-soft" aria-current="page" itemProp="name">
                {crumb.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
