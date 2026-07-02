import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HelpOverlay from '../components/ui/HelpOverlay';

export const metadata = {
  metadataBase: new URL('https://paulbrytonraj.com'),
  title: {
    default: 'Paul Bryton Raj | Portfolio',
    template: '%s | Paul Bryton Raj',
  },
  description: 'Full-Stack Developer and CS Student from Chennai, India. Specializing in React, Python, and AI integrations. Building products that solve real-world problems.',
  keywords: ['Paul Bryton Raj', 'Portfolio', 'Full-Stack Developer', 'React', 'Python', 'Chennai Developer', 'CS Student'],
  authors: [{ name: 'Paul Bryton Raj' }],
  creator: 'Paul Bryton Raj',
  openGraph: {
    title: 'Paul Bryton Raj | Portfolio',
    description: 'Full-Stack Developer and CS Student from Chennai, India.',
    url: 'https://paulbrytonraj.com',
    siteName: 'Paul Bryton Raj Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Bryton Raj | Portfolio',
    description: 'Full-Stack Developer and CS Student from Chennai, India.',
    creator: '@paulbrytonraj',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Paul Bryton Raj',
  url: 'https://paulbrytonraj.com',
  jobTitle: 'Full-Stack Developer',
  description: 'Full-Stack Developer and CS student from Chennai, India.',
  sameAs: [
    'https://github.com/paulbrytonraj',
    // Add LinkedIn or other socials here
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://paulbrytonraj.com" />
      </head>
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
