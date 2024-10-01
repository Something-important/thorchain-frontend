import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-gray-800 text-white p-4">
    <h1 className="text-2xl font-bold">THORChain Frontend</h1>
    <nav>
      <ul className="flex space-x-4 mt-2">
        <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link href="/swap" className="hover:text-gray-300">Swap</Link></li>
        <li><Link href="/pool" className="hover:text-gray-300">Pool</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;