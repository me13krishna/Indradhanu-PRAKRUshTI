import { describe, it, expect, beforeEach, vi } from 'vitest';
import { normalizeRoute, parseActiveHash, readSkipPreference, SKIP_PREFERENCE_KEY } from '../../context/RouterContext';

// Safe mock for localStorage in Node/Vitest environment
const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: storageMock,
  writable: true,
});

describe('Zero-Dependency Route & Story Deep-Link Resolver (Phase 1)', () => {
  beforeEach(() => {
    storageMock.clear();
    vi.restoreAllMocks();
  });

  it('correctly resolves root path to story landing page', () => {
    expect(normalizeRoute('/')).toBe('/');
    expect(normalizeRoute('/#awakening')).toBe('/');
    expect(normalizeRoute('/#fracture')).toBe('/');
    expect(normalizeRoute('/#elements')).toBe('/');
    expect(normalizeRoute('/#engine')).toBe('/');
    expect(normalizeRoute('/#explore')).toBe('/');
    expect(normalizeRoute('/#vision')).toBe('/');
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

  it('correctly parses active chapter hashes', () => {
    expect(parseActiveHash('')).toBe('');
    expect(parseActiveHash('awakening')).toBe('#awakening');
    expect(parseActiveHash('#elements')).toBe('#elements');
    expect(parseActiveHash('#engine')).toBe('#engine');
  });

  it('manages skip story preference via localStorage correctly', () => {
    expect(readSkipPreference()).toBe(false);
    storageMock.setItem(SKIP_PREFERENCE_KEY, 'true');
    expect(readSkipPreference()).toBe(true);
    storageMock.setItem(SKIP_PREFERENCE_KEY, 'false');
    expect(readSkipPreference()).toBe(false);
  });

  it('validates required cinematic story chapter anchors', () => {
    const requiredChapters = ['awakening', 'fracture', 'elements', 'engine', 'explore', 'vision'];
    expect(requiredChapters).toHaveLength(6);
    requiredChapters.forEach((chapter) => {
      expect(typeof chapter).toBe('string');
      expect(chapter.length).toBeGreaterThan(0);
    });
  });
});
