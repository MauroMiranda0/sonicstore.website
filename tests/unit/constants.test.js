import { buildWaUrl, HERO_STATS, SITE_NAME, SITE_TAGLINE, WA_BASE_URL, WA_NUMBER } from '../../src/config/constants';

describe('constants contract', () => {
  it('exposes site identity constants', () => {
    expect(SITE_NAME).toBe('Sonic Store');
    expect(SITE_TAGLINE).toBe('Belleza · Moda · Skincare');
    expect(WA_NUMBER).toMatch(/^\+?\d+$/);
  });

  it('builds base WhatsApp URL from WA_NUMBER', () => {
    expect(WA_BASE_URL).toBe(`https://wa.me/${WA_NUMBER}`);
  });

  it('encodes message in buildWaUrl', () => {
    const message = 'Hola! Quiero catálogo de Natura 🌿';
    const url = buildWaUrl(message);
    expect(url).toContain(WA_BASE_URL);
    expect(url).toContain(encodeURIComponent(message));
  });

  it('defines hero stats as updateable configuration', () => {
    expect(Array.isArray(HERO_STATS)).toBe(true);
    expect(HERO_STATS.length).toBeGreaterThanOrEqual(3);
    HERO_STATS.forEach((stat) => {
      expect(stat).toHaveProperty('value');
      expect(stat).toHaveProperty('label');
    });
  });
});
