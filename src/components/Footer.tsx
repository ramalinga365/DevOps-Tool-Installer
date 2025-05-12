'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/40 dark:border-border/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">DevOps Tool Installer</h3>
            <p className="text-sm text-muted-foreground">
              Streamline your development environment setup with our automated tool installer.
              Quick, reliable, and customizable for your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/docs" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Available Tools
                </Link>
              </li>
              <li>
                <Link 
                  href="/contribute" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/NotHarshhaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="https://t.me/prodevopsguy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaTelegram className="w-6 h-6" />
              </Link>
              <Link
                href="https://linkedin.com/in/harshhaa-vardhan-reddy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/40 dark:border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} DevOps Tools Installation Setup/Guides. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 