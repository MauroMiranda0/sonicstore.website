import { render, screen } from '@testing-library/react';
import SmartImage from '../../src/components/common/SmartImage';

describe('SmartImage', () => {
  it('renders AVIF/WebP sources plus fallback for convertible formats', () => {
    const { container } = render(<SmartImage src="/img/productos/item.jpg" alt="Producto" />);
    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    expect(sources[0].getAttribute('type')).toBe('image/avif');
    expect(sources[0].getAttribute('srcset')).toBe('/img/productos/item.avif');
    expect(sources[1].getAttribute('type')).toBe('image/webp');
    expect(sources[1].getAttribute('srcset')).toBe('/img/productos/item.webp');

    const fallback = screen.getByAltText('Producto');
    expect(fallback.getAttribute('src')).toBe('/img/productos/item.jpg');
  });

  it('renders plain img for non-convertible formats (svg)', () => {
    const { container } = render(<SmartImage src="/img/logo.svg" alt="Logo" />);
    expect(container.querySelectorAll('source')).toHaveLength(0);
    expect(screen.getByAltText('Logo').getAttribute('src')).toBe('/img/logo.svg');
  });
});
