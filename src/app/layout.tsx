import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Navbar } from '@/components/sticky-navbar';
import { WristbandAuthProviderWrapper } from '@/context/wristband-auth-provider-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wristband Demo App',
  description: 'Wristband Demo App',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100vh]`}>
        {/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */}
        <WristbandAuthProviderWrapper>
          <Navbar />
          <main className="min-h-[100vh] p-8 pt-24 pb-8">{children}</main>
        </WristbandAuthProviderWrapper>
      </body>
    </html>
  );
}
