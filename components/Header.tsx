import React from 'react';
import Link from 'next/link';
import { Home, User, BarChart2 } from 'lucide-react';

interface HeaderProps {
  links: { href: string; label: string }[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <a aria-label="Home" className="hover:text-gray-400">
              <Home className="w-6 h-6" />
            </a>
          </Link>
          <span className="text-xl font-bold">Forge App</span>
        </div>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a className="hover:text-gray-400">{link.label}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <Link href="/profile">
            <a aria-label="Profile" className="hover:text-gray-400">
              <User className="w-6 h-6" />
            </a>
          </Link>
          <Link href="/stats">
            <a aria-label="Stats" className="hover:text-gray-400">
              <BarChart2 className="w-6 h-6" />
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;