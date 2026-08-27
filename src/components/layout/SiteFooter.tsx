import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../../data/tools';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karankhare/' },
  { label: 'GitHub', href: 'https://github.com/scorpionmanace' },
];

export const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();
  const liveTools = TOOLS.filter((tool) => tool.status !== 'planned').slice(0, 6);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-content px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="font-display text-2xl leading-snug tracking-[-0.01em] text-ink">
              Karan Khare
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Engineering leader and front-end architect. Building considered interfaces, developer
              tooling, and the teams that ship them.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.8125rem] text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                { label: 'Work', to: '/' },
                { label: 'Tools', to: '/tools' },
                { label: 'About', to: '/about' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <p className="eyebrow">Tools</p>
            <ul className="mt-5 flex flex-col gap-3">
              {liveTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={tool.route}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">© {year} Karan Khare</p>
          <p className="font-mono text-xs text-faint">React · TypeScript · Vite · Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
