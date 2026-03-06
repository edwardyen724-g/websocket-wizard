import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { SupabaseProvider } from '../context/SupabaseContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WebSocket Wizard',
  description: 'Streamline WebSocket and tanStack integrations for modern web developers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <header>
            <h1>Integrate WebSocket and tanStack seamlessly</h1>
            <p>Boost your development speed today!</p>
          </header>
          <main>{children}</main>
          <footer>
            <p>© {new Date().getFullYear()} WebSocket Wizard. All rights reserved.</p>
          </footer>
        </SupabaseProvider>
      </body>
    </html>
  );
}