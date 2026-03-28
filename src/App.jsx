import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MarqueeBar from './components/MarqueeBar/MarqueeBar';
import CatalogSection from './components/CatalogSection/CatalogSection';
import PdfSection from './components/PdfSection/PdfSection';
import HowItWorks from './components/HowItWorks/HowItWorks';
import PaymentSection from './components/PaymentSection/PaymentSection';
import CtaSection from './components/CtaSection/CtaSection';
import Footer from './components/Footer/Footer';
import WaFloat from './components/WaFloat/WaFloat';
import { brands } from './data/brands';
import { pdfCatalogs } from './data/pdfCatalogs';
import { steps } from './data/steps';
import { paymentMethods } from './data/paymentMethods';
import { marqueeItems } from './data/marqueeItems';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBar items={marqueeItems} speed={22} />
        <CatalogSection brands={brands} />
        <PdfSection catalogs={pdfCatalogs} />
        <HowItWorks steps={steps} />
        <PaymentSection methods={paymentMethods} />
        <CtaSection />
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}