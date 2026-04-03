import { render, screen } from '@testing-library/react';
import HowItWorks from '../../src/components/HowItWorks/HowItWorks';
import MarqueeBar from '../../src/components/MarqueeBar/MarqueeBar';
import PaymentSection from '../../src/components/PaymentSection/PaymentSection';
import { marqueeItems } from '../../src/data/marqueeItems';
import { paymentMethods } from '../../src/data/paymentMethods';
import { steps } from '../../src/data/steps';

describe('content sections integration', () => {
  it('duplicates marquee items for infinite loop and applies speed variable', () => {
    const { container } = render(<MarqueeBar items={marqueeItems} speed={10} />);
    const renderedFirstItem = screen.getAllByText(marqueeItems[0]);
    expect(renderedFirstItem).toHaveLength(2);

    const track = container.querySelector('[style]');
    expect(track.style.getPropertyValue('--duration')).toBe('10s');
  });

  it('renders all steps in HowItWorks section', () => {
    render(<HowItWorks steps={steps} />);
    steps.forEach((step) => {
      expect(screen.getByText(step.number)).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('renders payment methods with official icons and descriptions', () => {
    render(<PaymentSection methods={paymentMethods} />);

    paymentMethods.forEach((method) => {
      expect(screen.getByText(method.name)).toBeInTheDocument();
      expect(screen.getByText(method.description)).toBeInTheDocument();
      if (method.icon.startsWith('/')) {
        expect(screen.getByAltText(method.iconAlt)).toBeInTheDocument();
      }
    });
  });
});
