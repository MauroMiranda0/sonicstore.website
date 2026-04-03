import { fireEvent, render, screen } from '@testing-library/react';
import PdfCard from '../../src/components/PdfSection/PdfCard';
import PdfSection from '../../src/components/PdfSection/PdfSection';
import { buildWaUrl } from '../../src/config/constants';
import { pdfCatalogs } from '../../src/data/pdfCatalogs';

describe('PdfSection integration', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all pdf catalogs from data layer and opens WhatsApp with contextual message', () => {
    render(<PdfSection catalogs={pdfCatalogs} />);
    expect(screen.getAllByRole('button', { name: 'Solicitar PDF' })).toHaveLength(pdfCatalogs.length);

    fireEvent.click(screen.getAllByRole('button', { name: 'Solicitar PDF' })[0]);
    expect(window.open).toHaveBeenCalledWith(buildWaUrl(pdfCatalogs[0].waMessage), '_blank', 'noopener');
  });

  it('renders logo fallback when catalog logo fails', () => {
    render(<PdfCard catalog={pdfCatalogs[0]} onCtaClick={() => {}} />);
    const logo = screen.getByAltText(pdfCatalogs[0].logoAlt);
    fireEvent.error(logo);
    expect(screen.queryByAltText(pdfCatalogs[0].logoAlt)).not.toBeInTheDocument();
    expect(screen.getAllByText(pdfCatalogs[0].name).length).toBeGreaterThan(0);
  });
});
