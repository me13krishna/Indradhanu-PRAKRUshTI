import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'prakrushti_theme';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem(THEME_KEY, 'dark');
      } catch {
        // Safe fallback
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem(THEME_KEY, 'light');
      } catch {
        // Safe fallback
      }
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggleTheme };
}

