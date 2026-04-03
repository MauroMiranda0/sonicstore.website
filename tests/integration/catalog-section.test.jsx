import { fireEvent, render, screen } from '@testing-library/react';
import CatalogSection from '../../src/components/CatalogSection/CatalogSection';
import BrandCard from '../../src/components/CatalogSection/BrandCard';
import { buildWaUrl } from '../../src/config/constants';
import { brands } from '../../src/data/brands';

describe('CatalogSection integration', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all brands from data layer and opens WhatsApp with contextual message', () => {
    render(<CatalogSection brands={brands} />);
    expect(screen.getAllByRole('button', { name: 'Pedir Catálogo' })).toHaveLength(brands.length);

    fireEvent.click(screen.getAllByRole('button', { name: 'Pedir Catálogo' })[0]);

    expect(window.open).toHaveBeenCalledWith(buildWaUrl(brands[0].waMessage), '_blank', 'noopener');
  });

  it('renders logo fallback when brand logo fails', () => {
    render(<BrandCard brand={brands[0]} onCtaClick={() => {}} />);

    const logo = screen.getByAltText(brands[0].logoAlt);
    fireEvent.error(logo);

    expect(screen.queryByAltText(brands[0].logoAlt)).not.toBeInTheDocument();
    expect(screen.getAllByText(brands[0].name).length).toBeGreaterThan(0);
  });
});
