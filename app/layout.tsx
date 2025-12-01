import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Forge App - Workout Tracker',
  description: 'Efficiently track and manage your fitness routines with Forge App.',
  viewport: 'width=device-width, initial-scale=1',
};

const Layout: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Forge App</div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-gray-400">Home</a></li>
                <li><a href="/workouts" className="hover:text-gray-400">Workouts</a></li>
                <li><a href="/progress" className="hover:text-gray-400">Progress</a></li>
                <li><a href="/community" className="hover:text-gray-400">Community</a></li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            <Component {...pageProps} />
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2023 Forge App. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <a href="https://twitter.com" aria-label="Twitter">
                <LucideIcon name="twitter" className="w-5 h-5 hover:text-gray-400" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <LucideIcon name="facebook" className="w-5 h-5 hover:text-gray-400" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <LucideIcon name="instagram" className="w-5 h-5 hover:text-gray-400" />
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;