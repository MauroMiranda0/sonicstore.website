import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import Navbar from '../../src/components/Navbar/Navbar';

describe('Navbar integration', () => {
  it('supports mobile toggle semantics and closes menu on link click', async () => {
    render(<Navbar />);

    const toggle = document.querySelector('button[aria-controls="mobile-nav"]');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    const mobileNav = screen.getByRole('navigation', { name: 'Navegación móvil' });
    fireEvent.click(within(mobileNav).getByRole('link', { name: 'Catálogos Online' }));

    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'false'));
    expect(document.body.style.overflow).toBe('');
  });

  it('marks navbar as scrolled when window scrollY is greater than threshold', async () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector('header');
    const initialClass = header.className;

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    fireEvent.scroll(window);

    await waitFor(() => expect(header.className).not.toBe(initialClass));
  });
});
