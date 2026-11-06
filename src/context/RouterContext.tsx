import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute = '/' | '/app';

interface RouterContextType {
  currentRoute: AppRoute;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function normalizeRoute(pathname: string): AppRoute {
  if (pathname.startsWith('/app')) {
    return '/app';
  }
  return '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      return normalizeRoute(window.location.pathname);
    }
    return '/';
  });

  const navigate = useCallback((to: string) => {
    const targetRoute = normalizeRoute(to);
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (currentPath !== to) {
        window.history.pushState(null, '', to);
      }
    }
    setCurrentRoute(targetRoute);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
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

