import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import EnquiryModal from '@/components/EnquiryModal/EnquiryModal';
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Accumax India | Laboratory Equipment Suppliers & Manufacturers',
  description: 'Accumax India is a leading ISO 9001:2008 Certified laboratory equipment supplier in India. Manufacturer of autoclaves, incubators, ovens, and test chambers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />

        {children}
        <WhatsAppButton />
        <EnquiryModal/>
      </body>
    </html>
  );
}
