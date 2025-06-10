'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="pl-4">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
            ColombiaGame
          </Link>
        </div>

        {/* Search box */}
        <div className="flex-1 max-w-xl mx-8">
          <div className={`relative ${isSearchFocused ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}>
            <input
              type="text"
              placeholder="Search games..."
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:bg-gray-600 transition-colors"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Search games"
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex items-center space-x-6 pr-4">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white pr-4"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 