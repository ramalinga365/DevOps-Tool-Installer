import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-primary/5 border-b border-border/40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className="group inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              Last updated: {new Date().toLocaleDateString()}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <motion.div
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <section className="space-y-8">
              {children}
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface LegalSectionProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="group bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg group-hover:bg-primary/20 transition-colors">
          {number}
        </span>
        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {children}
    </motion.div>
  );
}
