import { render } from '@testing-library/react';
import { useScrollReveal } from '../../src/hooks/useScrollReveal';

describe('useScrollReveal hook', () => {
  it('adds class "in" when observed element intersects viewport', () => {
    let observerCallback;
    const unobserveSpy = vi.fn();

    global.IntersectionObserver = vi.fn(function IntersectionObserver(cb) {
      observerCallback = cb;
      this.observe = vi.fn();
      this.unobserve = unobserveSpy;
      this.disconnect = vi.fn();
    });

    function TestComponent() {
      const ref = useScrollReveal();
      return <div ref={ref} data-testid="target" className="reveal" />;
    }

    const { getByTestId } = render(<TestComponent />);
    const target = getByTestId('target');

    observerCallback([{ isIntersecting: true }]);

    expect(target.classList.contains('in')).toBe(true);
    expect(unobserveSpy).toHaveBeenCalledWith(target);
  });
});
