import { AuthProvider } from '@/context/auth-context';
import './globals.css';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeInit } from '../../.flowbite-react/init';
import { NextIntlClientProvider } from 'next-intl';
import { twMerge } from 'tailwind-merge';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={twMerge("bg-gray-50 dark:bg-gray-900")}>
    <head><ThemeModeScript /></head>
    <body>
    <ThemeInit />
    <NextIntlClientProvider><AuthProvider>{children}</AuthProvider></NextIntlClientProvider>
    </body>
    </html>
  );
}
