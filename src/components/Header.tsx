"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/tools",
    label: "Tools",
    description: "Browse DevOps tools collection",
  },
  { href: "/about", label: "About", description: "Learn about our platform" },
  {
    href: "/contribute",
    label: "Contribute",
    description: "Join our community",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`
      sticky top-0 z-50 w-full
      bg-background/95 backdrop-blur-sm
      border-b border-border/40
      transition-all duration-300
      ${isScrolled ? "shadow-lg shadow-primary/5" : ""}
    `}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-all duration-300"
          >
            <motion.div
              className="w-10 h-10 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src="/images/logo.png"
                alt="DevOps Tools Installation Logo"
                width={40}
                height={40}
                className="w-full h-full"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">
                DevOps Tools
              </span>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Installation Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-3 py-2 text-sm font-medium rounded-lg
                  transition-colors duration-200
                  ${
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <Link
              href="https://github.com/NotHarshhaa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">GitHub Repository</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 relative z-50"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-6 h-0.5 bg-foreground rounded-full origin-right"
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: 8, width: "150%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-foreground rounded-full"
                  animate={
                    isMobileMenuOpen
                      ? { opacity: 0, x: -8 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-foreground rounded-full origin-right"
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: -8, width: "150%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[4.5rem] left-4 right-4 bg-background shadow-xl z-40 overflow-hidden rounded-xl border border-border/40"
              >
                <nav className="divide-y divide-border/40">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex flex-col px-6 py-4
                          ${
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-accent/50"
                          }
                          transition-colors
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </span>
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="p-6 bg-muted"
                  >
                    <Link
                      href="https://github.com/NotHarshhaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>View on GitHub</span>
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
