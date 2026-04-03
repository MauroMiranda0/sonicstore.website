import { brands } from '../../src/data/brands';
import { marqueeItems } from '../../src/data/marqueeItems';
import { paymentMethods } from '../../src/data/paymentMethods';
import { pdfCatalogs } from '../../src/data/pdfCatalogs';
import { steps } from '../../src/data/steps';

describe('data layer contracts', () => {
  it('brands has at least 9 entries and required BrandItem fields', () => {
    expect(brands.length).toBeGreaterThanOrEqual(9);
    const ids = new Set();

    brands.forEach((brand) => {
      [
        'id',
        'name',
        'category',
        'categoryEmoji',
        'description',
        'logoSrc',
        'logoAlt',
        'bgColor',
        'productName',
        'productImageSrc',
        'productImageAlt',
        'waMessage',
      ].forEach((field) => {
        expect(brand[field]).toBeTruthy();
      });
      expect(ids.has(brand.id)).toBe(false);
      ids.add(brand.id);
    });
  });

  it('pdf catalogs contain required PdfItem fields', () => {
    expect(pdfCatalogs.length).toBeGreaterThan(0);
    pdfCatalogs.forEach((catalog) => {
      [
        'id',
        'name',
        'description',
        'logoSrc',
        'logoAlt',
        'bgGradient',
        'productName',
        'productImageSrc',
        'productImageAlt',
        'waMessage',
      ].forEach((field) => {
        expect(catalog[field]).toBeTruthy();
      });
    });
  });

  it('steps follow expected structure', () => {
    expect(steps.length).toBe(4);
    steps.forEach((step) => {
      expect(step.id).toBeTruthy();
      expect(step.number).toMatch(/^\d{2}$/);
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
    });
  });

  it('payment methods include the 3 required options', () => {
    const ids = paymentMethods.map((m) => m.id);
    expect(ids).toEqual(expect.arrayContaining(['aplazo', 'mercadopago', 'transferencia']));
    paymentMethods.forEach((method) => {
      expect(method.name).toBeTruthy();
      expect(method.description).toBeTruthy();
      expect(method.icon).toBeTruthy();
    });
  });

  it('marquee items contains non-empty texts', () => {
    expect(marqueeItems.length).toBeGreaterThan(0);
    marqueeItems.forEach((item) => expect(item).toBeTruthy());
  });
});
