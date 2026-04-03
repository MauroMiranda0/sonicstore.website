import { fireEvent, render, screen } from '@testing-library/react';
import CtaSection from '../../src/components/CtaSection/CtaSection';
import Footer from '../../src/components/Footer/Footer';
import WaFloat from '../../src/components/WaFloat/WaFloat';
import { buildWaUrl } from '../../src/config/constants';

describe('WhatsApp conversion actions', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('opens WhatsApp from CTA section with expected message', () => {
    render(<CtaSection />);
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Pedido' }));
    expect(window.open).toHaveBeenCalledWith(
      buildWaUrl('Hola. Quiero hacer un pedido en Sonic Store.'),
      '_blank',
      'noopener',
    );
  });

  it('opens WhatsApp from floating button with expected message', () => {
    render(<WaFloat />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir WhatsApp' }));
    expect(window.open).toHaveBeenCalledWith(
      buildWaUrl('Hola. Quiero recibir asesoría para hacer un pedido.'),
      '_blank',
      'noopener',
    );
  });

  it('footer whatsapp link points to buildWaUrl', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'WhatsApp' });
    expect(link.getAttribute('href')).toBe(buildWaUrl('Hola. Quiero información sobre catálogos.'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });
});
