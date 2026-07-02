import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HelpOverlay from '../components/ui/HelpOverlay';

export const metadata = {
  title: 'Paul Bryton Raj | Portfolio',
  description: 'Portfolio of Paul Bryton Raj',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <HelpOverlay />
        <Analytics />
      </body>
    </html>
  );
}
