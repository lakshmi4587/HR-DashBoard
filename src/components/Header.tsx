'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Bookmark, BarChart3, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'
export default function Header() {
  const pathname = usePathname();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { href: '/', label: 'Dashboard', Icon: LayoutDashboard },
    { href: '/bookmarks', label: 'Bookmarks', Icon: Bookmark },
    { href: '/analytics', label: 'Analytics', Icon: BarChart3 },
  ];

  return (
    <main className="pt-15">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-2">
          {/* Use the same toggleTheme on image click */}
          <div
            onClick={toggleTheme}
            className="bg-indigo-100 p-2 rounded-full cursor-pointer"
            
          >
           <Image src="/icon.png" alt="Logo" width={24} height={24} className="cursor-pointer" />

          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">HR Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Performance Management</p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map(({ href, label, Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? 'bg-indigo-700 text-white'
                    : 'text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
        </button>
      </header>
    </main>
  );
}
