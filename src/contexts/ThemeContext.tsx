import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  currentTheme: 'light' | 'dark';
  isInitialized: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const readStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  } catch {
    return 'system';
  }
};

const resolve = (theme: Theme): 'light' | 'dark' =>
  theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Read storage synchronously. The previous version started at 'system' and
  // applied it in an effect on mount, which overwrote the saved choice in
  // localStorage and flashed the wrong theme before the saved one landed.
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => resolve(readStoredTheme()));
  const isInitialized = true;

  useEffect(() => {
    const apply = () => {
      const resolved = resolve(theme);
      setCurrentTheme(resolved);
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    };

    apply();
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* Storage can be unavailable (private mode); the theme still applies. */
    }

    if (theme !== 'system') return undefined;

    // Follow the OS only while the visitor has not chosen explicitly.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', apply);
    return () => mediaQuery.removeEventListener('change', apply);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const value: ThemeContextValue = {
    theme,
    currentTheme,
    isInitialized,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
