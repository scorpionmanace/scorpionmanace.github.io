import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../../data/tools';
import { Icon } from '../ui/Icon';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karankhare/' },
  { label: 'GitHub', href: 'https://github.com/scorpionmanace' },
  { label: 'npm', href: 'https://www.npmjs.com/package/@scorpionmanace/tablez' },
];

const NAV = [
  { label: 'Work', to: '/' },
  { label: 'Open source', to: '/open-source' },
  { label: 'Tools', to: '/tools' },
  { label: 'About & résumé', to: '/about' },
];

/**
 * The back cover. Bookcloth, a contents list, and the lab notebook's sign-off
 * block — the entry is closed with a signature and a date.
 */
export const SiteFooter: React.FC = () => {
  // When the notebook was last written — the build date, not the visitor's.
  const lastEntry = __LAST_ENTRY__;
  const liveTools = TOOLS.filter((tool) => tool.status !== 'planned');

  return (
    <footer className="cloth">
      <div className="mx-auto w-full max-w-content px-5 pb-10 pt-16 sm:px-8 md:pt-24">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <p className="font-display text-[2.6rem] font-[780] uppercase leading-[0.92] tracking-[0.01em] text-cloth-ink md:text-[3.25rem]">
              Have something
              <br />
              worth building?
            </p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-cloth-muted">
              I&rsquo;m glad to talk about engineering leadership, agentic products, front-end
              architecture, or a team you are trying to grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {SOCIAL.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[1.0625rem] font-semibold text-cloth-ink underline decoration-cloth-muted/50 underline-offset-[0.28em] transition-colors hover:decoration-cloth-ink"
                >
                  {link.label}
                  <Icon name="external" className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-[1.6rem] font-[780] leading-none text-cloth-ink">Contents</h2>
            <ul className="mt-5 flex flex-col">
              {NAV.map((item) => (
                <li key={item.to} className="border-b border-cloth-ink/12">
                  <Link
                    to={item.to}
                    className="block py-2.5 text-[1.0625rem] text-cloth-ink transition-colors hover:text-cloth-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tools">
            <h2 className="font-display text-[1.6rem] font-[780] leading-none text-cloth-ink">Tools</h2>
            <ul className="mt-5 flex flex-col">
              {liveTools.map((tool) => (
                <li key={tool.id} className="border-b border-cloth-ink/12">
                  <Link
                    to={tool.route}
                    className="block py-2 text-[1rem] text-cloth-muted transition-colors hover:text-cloth-ink"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sign-off block */}
        <div className="mt-20 grid gap-8 border-t border-cloth-ink/15 pt-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-xs font-[720] uppercase tracking-[0.12em] text-cloth-muted">
              Signed
            </p>
            <p className="hand mt-1 text-[1.75rem] leading-none text-cloth-ink">Karan Khare</p>
            <span className="mt-2 block h-px w-56 bg-cloth-ink/30" />
          </div>
          <div className="sm:text-right">
            <p className="font-display text-xs font-[720] uppercase tracking-[0.12em] text-cloth-muted">
              Last entry
            </p>
            <p className="hand mt-1 text-[1.75rem] leading-none text-cloth-ink">{lastEntry}</p>
            <span className="mt-2 block h-px w-40 bg-cloth-ink/30 sm:ml-auto" />
          </div>
        </div>

        <p className="mt-12 text-sm text-cloth-muted">
          Built by hand with React, TypeScript, and Vite. Everything on the tools pages runs in your
          browser.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
