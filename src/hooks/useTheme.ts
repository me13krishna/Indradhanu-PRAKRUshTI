import { useCallback, useSyncExternalStore } from 'react';

const THEME_KEY = 'prakrushti_theme';
const listeners = new Set<() => void>();

function readInitial(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  } catch {
    // storage unavailable
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
}

let current = readInitial();

function apply(isDark: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', isDark);
}
apply(current);

function setDark(next: boolean) {
  current = next;
  apply(next);
  try {
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
  } catch {
    // storage unavailable
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, () => current, () => true);
  const toggleTheme = useCallback(() => setDark(!current), []);
  return { isDark, toggleTheme };
}
