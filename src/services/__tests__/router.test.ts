import { describe, it, expect } from 'vitest';

function normalizeRoute(pathname: string): '/' | '/app' {
  if (pathname.startsWith('/app')) {
    return '/app';
  }
  return '/';
}

describe('Zero-Dependency History API Route Resolver (Phase 1)', () => {
  it('correctly resolves root path to story landing page', () => {
    expect(normalizeRoute('/')).toBe('/');
    expect(normalizeRoute('/#approach')).toBe('/');
    expect(normalizeRoute('/#elements')).toBe('/');
  });

  it('correctly resolves app path to the functional platform shell', () => {
    expect(normalizeRoute('/app')).toBe('/app');
    expect(normalizeRoute('/app/')).toBe('/app');
    expect(normalizeRoute('/app/dashboard')).toBe('/app');
    expect(normalizeRoute('/app#compare')).toBe('/app');
  });

  it('gracefully handles arbitrary unknown subroutes without crash', () => {
    expect(normalizeRoute('/unknown')).toBe('/');
    expect(normalizeRoute('/story')).toBe('/');
    expect(normalizeRoute('/app-preview')).toBe('/app');
  });
});
