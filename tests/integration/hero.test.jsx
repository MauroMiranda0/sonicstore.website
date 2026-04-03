import { render, screen } from '@testing-library/react';
import Hero from '../../src/components/Hero/Hero';
import { brands } from '../../src/data/brands';

vi.mock('../../src/components/BackgroundSlider/BackgroundSlider', () => ({
  default: () => <div data-testid="background-slider" />,
}));

describe('Hero integration', () => {
  it('renders H1 and the first 3 featured brand logos', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('background-slider')).toBeInTheDocument();

    const featured = brands.slice(0, 3);
    featured.forEach((brand, index) => {
      const img = screen.getByAltText(brand.logoAlt);
      if (index === 0) {
        expect(img.getAttribute('loading')).toBe('eager');
      } else {
        expect(img.getAttribute('loading')).toBe('lazy');
      }
    });
  });
});
