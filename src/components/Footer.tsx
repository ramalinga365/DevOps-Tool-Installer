"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaHeart,
  FaTools,
  FaBook,
  FaHandsHelping,
} from "react-icons/fa";

const quickLinks = [
  { href: "/docs", label: "Documentation", icon: FaBook },
  { href: "/tools", label: "Available Tools", icon: FaTools },
  { href: "/contribute", label: "Contribute", icon: FaHandsHelping },
];

const socialLinks = [
  { href: "https://github.com/ramalinga365", icon: FaGithub, label: "GitHub" },
  { href: " ", icon: FaTelegram, label: "Telegram" },
  {
    href: "https://linkedin.com/in/ramalinga365",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-background to-background/95 border-t border-border/40">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -top-12 right-1/3 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & About Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                DevOps Tool Installer
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Streamline your development environment setup with our automated
                tool installer. Quick, reliable, and customizable for your
                DevOps journey.
              </p>
            </div>

            <motion.div
              className="flex items-center gap-4"
              variants={staggerChildren}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <motion.div className="grid gap-4" variants={staggerChildren}>
              {quickLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={fadeInUpVariant}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group w-full"
                  >
                    <span className="p-2 bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <link.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                    </span>
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Get notified about new tools and features.
              </p>
              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-background/50 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariant}
          className="mt-12 pt-8 border-t border-border/40"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()}</span>
              <span>DevOps Tools Installation.</span>
              <span className="hidden sm:flex items-center gap-1">
                <span>Made with</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <FaHeart className="w-4 h-4 text-red-500" />
                </motion.div>
                <span>by RAM</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <div className="w-1 h-1 rounded-full bg-border" />
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
