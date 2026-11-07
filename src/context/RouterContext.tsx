import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute = '/' | '/app';

export const SKIP_PREFERENCE_KEY = 'prakrushti_skip_story';

export interface RouterContextType {
  currentRoute: AppRoute;
  activeHash: string;
  skipPreference: boolean;
  setSkipPreference: (skip: boolean) => void;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function normalizeRoute(pathname: string): AppRoute {
  if (pathname.startsWith('/app')) {
    return '/app';
  }
  return '/';
}

export function parseActiveHash(hash: string): string {
  if (!hash) return '';
  return hash.startsWith('#') ? hash : `#${hash}`;
}

export function readSkipPreference(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(SKIP_PREFERENCE_KEY) === 'true';
  } catch {
    return false;
  }
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skipPreference, setSkipPreferenceState] = useState<boolean>(readSkipPreference);

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      const initialPath = window.location.pathname;

      // Auto-skip to /app ONLY if user explicitly opted into skip preference,
      // and has NOT requested story via ?story=1 or deep-linked hash.
      const hasStoryFlag = search.includes('story=1');
      if (initialPath === '/' && readSkipPreference() && !hasStoryFlag && !hash) {
        return '/app';
      }
      return normalizeRoute(initialPath);
    }
    return '/';
  });

  const [activeHash, setActiveHash] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseActiveHash(window.location.hash);
    }
    return '';
  });

  const setSkipPreference = useCallback((skip: boolean) => {
    setSkipPreferenceState(skip);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SKIP_PREFERENCE_KEY, skip ? 'true' : 'false');
      } catch (e) {
        console.warn('Unable to persist skip preference:', e);
      }
    }
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const targetRoute = normalizeRoute(url.pathname);
    const targetHash = parseActiveHash(url.hash);

    if (typeof window !== 'undefined') {
      const fullTarget = url.pathname + url.search + url.hash;
      const currentFull = window.location.pathname + window.location.search + window.location.hash;
      if (currentFull !== fullTarget) {
        window.history.pushState(null, '', fullTarget);
      }
    }

    setCurrentRoute(targetRoute);
    setActiveHash(targetHash);

    if (typeof window !== 'undefined' && !targetHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoute(window.location.pathname));
      setActiveHash(parseActiveHash(window.location.hash));
    };

    const handleHashChange = () => {
      setActiveHash(parseActiveHash(window.location.hash));
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ currentRoute, activeHash, skipPreference, setSkipPreference, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
