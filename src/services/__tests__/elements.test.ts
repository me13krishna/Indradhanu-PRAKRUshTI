import { describe, it, expect } from 'vitest';
import { MAHABHUTA_ELEMENTS_DATA } from '../../components/story/Scene03Elements';

describe('Scene 03 Panch Mahabhuta Framework & Two-Layer Architecture (Phase 3)', () => {
  it('contains exactly five primordial elements in canonical order', () => {
    expect(MAHABHUTA_ELEMENTS_DATA).toHaveLength(5);
    const elementIds = MAHABHUTA_ELEMENTS_DATA.map((e) => e.id);
    expect(elementIds).toEqual(['prithvi', 'jal', 'agni', 'vayu', 'akash']);
  });

  it('ensures each element contains verified Sanskrit shlokas and dual-language translations', () => {
    MAHABHUTA_ELEMENTS_DATA.forEach((el) => {
      expect(el.sanskritVerse.length).toBeGreaterThan(5);
      expect(el.verseTranslationEn.length).toBeGreaterThan(10);
      expect(el.verseTranslationHi.length).toBeGreaterThan(10);
      expect(el.culturalPhilosophyEn.length).toBeGreaterThan(20);
      expect(el.ecologicalDutyEn.length).toBeGreaterThan(15);
    });
  });

  it('verifies sub-metric percentage weights reconcile exactly to 100% for all five elements', () => {
    MAHABHUTA_ELEMENTS_DATA.forEach((el) => {
      const totalWeight = el.weightsBreakdown.reduce((sum, item) => {
        const numeric = parseInt(item.weight.replace('%', ''), 10);
        return sum + numeric;
      }, 0);
      expect(totalWeight).toBe(100);
    });
  });

  it('verifies scientific provenance and benchmark citations for all five elements', () => {
    const prithvi = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'prithvi');
    const jal = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'jal');
    const agni = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'agni');
    const vayu = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'vayu');
    const akash = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'akash');

    expect(prithvi?.benchmarkSource).toContain('ECMWF IFS');
    expect(jal?.benchmarkSource).toContain('WMO');
    expect(agni?.benchmarkSource).toContain('NOAA/NWS');
    expect(vayu?.benchmarkSource).toContain('WHO');
    expect(akash?.benchmarkSource).toContain('ICAO');
  });

  it('confirms the non-linear pollutant ceiling rule in Vayu specification', () => {
    const vayu = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'vayu');
    expect(vayu?.primaryEquation).toContain('min(S_chem');
    expect(vayu?.primaryEquation).toContain('PM2.5 > 150 ⇒ S_Vayu = 0');
  });

  it('confirms decoupled seismic advisory layer in Prithvi specification', () => {
    const prithvi = MAHABHUTA_ELEMENTS_DATA.find((e) => e.id === 'prithvi');
    expect(prithvi?.scientificVariablesEn.some((v) => v.includes('USGS Earthquake'))).toBe(true);
  });
});

