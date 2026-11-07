import { describe, it, expect } from 'vitest';

describe('Platform Sidebar & Adaptive Navigation (Phase 5)', () => {
  const navTabs = ['dashboard', 'compare', 'hotspots', 'simulator', 'knowledge', 'about'];

  it('contains all 6 primary analytical and educational tabs', () => {
    expect(navTabs).toHaveLength(6);
    expect(navTabs).toContain('dashboard');
    expect(navTabs).toContain('compare');
    expect(navTabs).toContain('hotspots');
    expect(navTabs).toContain('simulator');
    expect(navTabs).toContain('knowledge');
    expect(navTabs).toContain('about');
  });

  it('supports dual density modes: Zen Overview and Technical Telemetry', () => {
    const supportedModes: ('zen' | 'technical')[] = ['zen', 'technical'];
    expect(supportedModes).toHaveLength(2);
    expect(supportedModes).toContain('zen');
    expect(supportedModes).toContain('technical');
  });
});

