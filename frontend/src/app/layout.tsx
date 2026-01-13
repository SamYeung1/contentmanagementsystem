import { AuthProvider } from '@/context/auth-context';
import './globals.css';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeInit } from '../../.flowbite-react/init';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head><ThemeModeScript /></head>
    <body>
    <ThemeInit />
    <AuthProvider>{children}</AuthProvider>
    </body>
    </html>
  );
}
