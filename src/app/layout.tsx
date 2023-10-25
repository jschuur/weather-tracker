import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

import Providers from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather Tracker',
  description: 'Weather data dashboard experiment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={cn([inter.className, 'light:bg-slate-200 dark:bg-slate-800'])}>
        <Providers>
          <Toaster richColors position='top-right' closeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
