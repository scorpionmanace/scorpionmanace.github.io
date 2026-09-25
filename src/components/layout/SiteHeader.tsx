import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { ease, springSoft } from '../../design/motion';
import { Icon } from '../ui/Icon';
import { cn } from '../ui/cn';

const NAV = [
  { label: 'Work', to: '/' },
  { label: 'Open source', to: '/open-source' },
  { label: 'Tools', to: '/tools' },
  { label: 'About', to: '/about' },
];

/** The label pasted on a notebook's cover: a ruled box with the owner's name. */
const Nameplate: React.FC = () => (
  <span className="flex items-center gap-3">
    <span className="grid h-10 place-items-center border-[1.5px] border-ink px-2 font-display text-[1.25rem] font-[800] leading-none tracking-[0.02em] text-ink">
      KK
    </span>
    <span className="flex flex-col leading-none">
      <span className="font-display text-[1.3rem] font-[760] uppercase tracking-[0.03em] text-ink">
        Karan Khare
      </span>
      <span className="mt-1 text-[0.8125rem] text-muted">Engineering leadership</span>
    </span>
  </span>
);

const ThemeToggle: React.FC = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative grid h-10 w-10 place-items-center rounded-[4px] border-[1.5px] border-ink/25 text-ink transition-colors hover:border-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease }}
          className="absolute"
        >
          <Icon name={isDark ? 'moon' : 'sun'} className="h-5 w-5" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

/** The active page gets a pen underline that travels between links. */
const NavUnderline: React.FC = () => (
  <motion.svg
    layoutId="nav-ink"
    transition={springSoft}
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="absolute inset-x-2 -bottom-0.5 h-2.5 text-accent"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <path d="M2 6 C 22 3, 44 8, 64 5 S 90 3, 98 6" vectorEffect="non-scaling-stroke" />
  </motion.svg>
);

export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 12));

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      role="banner"
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-b border-line bg-canvas/95 shadow-card backdrop-blur-md'
          : 'border-b border-transparent bg-canvas',
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" aria-label="Karan Khare — home">
          <Nameplate />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="relative px-3 py-2">
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'relative text-[1.0625rem] transition-colors',
                      isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && <NavUnderline />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://www.linkedin.com/in/karankhare/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-[4px] border-[1.5px] border-ink bg-ink px-4 font-display text-[1.0625rem] font-[720] uppercase tracking-[0.04em] text-canvas transition-colors hover:border-accent hover:bg-accent sm:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-[4px] border-[1.5px] border-ink/25 text-ink transition-colors hover:border-ink md:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 block h-[1.5px] w-4 bg-current"
                animate={menuOpen ? { rotate: 45, top: 6 } : { rotate: 0, top: 1 }}
                transition={{ duration: 0.22, ease }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-4 bg-current"
                animate={menuOpen ? { rotate: -45, top: 6 } : { rotate: 0, top: 11 }}
                transition={{ duration: 0.22, ease }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="grid-bg overflow-hidden border-t border-line bg-canvas md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {NAV.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + index * 0.05, duration: 0.3, ease }}
                  className="border-b border-line"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline justify-between py-3.5 font-display text-[1.75rem] font-[740] transition-colors',
                        isActive ? 'text-ink' : 'text-muted hover:text-ink',
                      )
                    }
                  >
                    {item.label}
                    <Icon name="arrowRight" className="h-5 w-5" />
                  </NavLink>
                </motion.div>
              ))}
              <a
                href="https://www.linkedin.com/in/karankhare/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-12 items-center justify-center rounded-[4px] bg-ink font-display text-[1.1875rem] font-[720] uppercase tracking-[0.04em] text-canvas"
              >
                Get in touch
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
