'use client';

import React from 'react';
import Link from 'next/link';
import { Providers } from './providers';
import WalletConnect from '../contexts/WalletConnect';
import './globals.css';
// Import this in your top-level route/layout
import "@interchain-ui/react/styles";
import "@rainbow-me/rainbowkit/styles.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <Providers>
          <header className="bg-black bg-opacity-50 p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">THORChain</Link>
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:text-purple-300 transition-colors">Home</Link></li>
                <li><Link href="/swap" className="hover:text-purple-300 transition-colors">Swap</Link></li>
                <li><Link href="/pool" className="hover:text-purple-300 transition-colors">Pool</Link></li>
                <li><Link href="/earn" className="hover:text-purple-300 transition-colors">Earn</Link></li>
                <li><Link href="/network" className="hover:text-purple-300 transition-colors">Network</Link></li>
                <li><Link href="/history" className="hover:text-purple-300 transition-colors">Stats</Link></li>
              </ul>
              <WalletConnect />
            </nav>
          </header>
          <main className="container mx-auto p-8">
            {children}
          </main>
          <footer className="bg-black bg-opacity-50 p-4 mt-8">
            <div className="container mx-auto text-center text-sm">
              © 2024 THORChain. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}