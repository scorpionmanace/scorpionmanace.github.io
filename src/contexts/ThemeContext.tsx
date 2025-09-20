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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const updateCurrentTheme = (newTheme: Theme) => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let resolvedTheme: 'light' | 'dark';

    if (newTheme === 'system') {
      resolvedTheme = prefersDark ? 'dark' : 'light';
    } else {
      resolvedTheme = newTheme;
    }

    setCurrentTheme(resolvedTheme);
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (savedTheme === 'system') {
        updateCurrentTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    updateCurrentTheme(savedTheme);

    // Mark as initialized after the first setup
    setIsInitialized(true);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    updateCurrentTheme(theme);
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
