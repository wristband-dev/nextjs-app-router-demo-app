import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Navbar } from '@/components';
import { WristbandAuthProviderWrapper } from '@/auth';

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
          <div
            className={`font-geist-sans flex flex-col items-center justify-items-center min-h-screen p-8 pt-16 bg-slate-50 dark:bg-slate-900`}
          >
            <main
              className={`flex flex-col gap-8 row-start-2 items-center w-full max-w-2xl text-center ${inter.className}`}
            >
              {children}
            </main>
          </div>
        </WristbandAuthProviderWrapper>
      </body>
    </html>
  );
}
