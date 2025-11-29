// components/layout/Navigation.jsx
'use client'; 

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Hook to check active route

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Detector', href: '/detector' },
  { name: 'About', href: '/about' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-linear-to-r from-gray-950/90 via-purple-950/90 to-indigo-950/90 backdrop-blur-lg border-b border-cyan-400/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AdGuardian
            </span>
          </Link>
          <div className="flex space-x-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  pathname === item.href
                    ? 'bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}