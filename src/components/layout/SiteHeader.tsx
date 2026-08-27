import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { ease, springSoft } from '../../design/motion';
import { cn } from '../ui/cn';

const NAV = [
  { label: 'Work', to: '/' },
  { label: 'Open source', to: '/open-source' },
  { label: 'Tools', to: '/tools' },
  { label: 'About', to: '/about' },
];

const Monogram: React.FC = () => (
  <span
    className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-mono text-[0.8125rem] font-semibold tracking-tight text-canvas"
    aria-hidden="true"
  >
    KK
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
      className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-soft transition-colors hover:bg-sunken hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.22, ease }}
          className="absolute text-[0.95rem] leading-none"
        >
          {isDark ? '☾' : '☀'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 12));

  // Close the mobile menu whenever navigation happens.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Prevent background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-line bg-canvas/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="Karan Khare — home">
          <Monogram />
          <span className="flex flex-col leading-none">
            <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">
              Karan Khare
            </span>
            <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.1em] text-muted">
              ENGINEERING LEADER
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="relative px-3.5 py-2">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-sunken"
                      transition={springSoft}
                    />
                  )}
                  <span
                    className={cn(
                      'relative text-sm transition-colors',
                      isActive ? 'font-medium text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {item.label}
                  </span>
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
            className="hidden h-9 items-center rounded-full bg-ink px-4 text-[0.8125rem] font-medium text-canvas transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-sunken md:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 block h-px w-4 bg-current"
                animate={menuOpen ? { rotate: 45, top: 6 } : { rotate: 0, top: 1 }}
                transition={{ duration: 0.22, ease }}
              />
              <motion.span
                className="absolute left-0 block h-px w-4 bg-current"
                animate={menuOpen ? { rotate: -45, top: 6 } : { rotate: 0, top: 11 }}
                transition={{ duration: 0.22, ease }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden border-t border-line bg-canvas md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-2.5 text-base transition-colors',
                        isActive ? 'bg-sunken font-medium text-ink' : 'text-muted hover:text-ink',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <a
                href="https://www.linkedin.com/in/karankhare/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-ink text-sm font-medium text-canvas"
              >
                Get in touch
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default SiteHeader;
