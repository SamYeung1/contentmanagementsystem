import { AuthProvider } from '@/context/auth-context';
import './globals.css';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeInit } from '../../.flowbite-react/init';
import { NextIntlClientProvider } from 'next-intl';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head><ThemeModeScript /></head>
    <body>
    <ThemeInit />
    <NextIntlClientProvider><AuthProvider>{children}</AuthProvider></NextIntlClientProvider>
    </body>
    </html>
  );
}
