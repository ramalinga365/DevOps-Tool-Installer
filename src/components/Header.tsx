'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      sticky top-0 z-50 w-full
      bg-background/80 backdrop-blur-sm
      border-b border-border/40
      transition-shadow duration-200
      ${isScrolled ? 'shadow-sm' : ''}
    `}>
      <div className="container mx-auto px-4 h-16">
        <div className="flex h-full items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-xl font-semibold hover:text-foreground/80 transition-colors"
            >
              DevOps Tools Installation Setup/Guides
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/tools" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Tools
              </Link>
              <Link 
                href="/about" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contribute" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contribute
              </Link>
            </nav>
          </div>

          {/* Theme Toggle and GitHub Link */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="https://github.com/NotHarshhaa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="w-6 h-6" />
              <span className="sr-only">GitHub Repository</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 