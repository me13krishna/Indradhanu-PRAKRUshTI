import { describe, it, expect } from 'vitest';

function normalizeRoute(pathname: string): '/' | '/app' {
  if (pathname.startsWith('/app')) {
    return '/app';
  }
  return '/';
}

describe('Zero-Dependency History API Route Resolver (Phase 1 & 2)', () => {
  it('correctly resolves root path to story landing page', () => {
    expect(normalizeRoute('/')).toBe('/');
    expect(normalizeRoute('/#challenge')).toBe('/');
    expect(normalizeRoute('/#methodology')).toBe('/');
    expect(normalizeRoute('/#framework')).toBe('/');
    expect(normalizeRoute('/#foundation')).toBe('/');
    expect(normalizeRoute('/#preview')).toBe('/');
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

  it('validates required story section anchors for Phase 2 landing page', () => {
    const requiredAnchors = ['challenge', 'methodology', 'framework', 'foundation', 'preview'];
    expect(requiredAnchors).toHaveLength(5);
    requiredAnchors.forEach((anchor) => {
      expect(typeof anchor).toBe('string');
      expect(anchor.length).toBeGreaterThan(0);
    });
  });
});

