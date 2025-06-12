"use client";

import {
  FaGithub,
  FaCode,
  FaBug,
  FaBook,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContributePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            whileHover={{ scale: 1.02 }}
          >
            Join Our Community
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Be part of something bigger. Help us revolutionize DevOps tool
            installation and make a lasting impact on the developer community.
          </p>
        </motion.div>

        {/* Contribution Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="group bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            variants={item}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <FaCode className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold ml-4">Code</h2>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                Add new installation guides
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                Improve existing scripts
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                Enhance UI components
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="group bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            variants={item}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                <FaBug className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold ml-4">Debug</h2>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                Report installation issues
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                Submit bug reports
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                Test compatibility
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="group bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            variants={item}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                <FaLightbulb className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold ml-4">Innovate</h2>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                Suggest new features
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                Improve documentation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                Share knowledge
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Contribution Steps */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-xl p-10 border border-border/40 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-8">
            <FaBook className="w-8 h-8 text-primary mr-4" />
            <h2 className="text-3xl font-bold">How to Contribute</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20 rounded"></div>
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-3">1. Fork & Clone</h3>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  git clone
                  https://github.com/NotHarshhaa/DevOps-Tool-Installer.git
                </div>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20 rounded"></div>
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-3">2. Create Branch</h3>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  git checkout -b feature/your-feature-name
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20 rounded"></div>
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-3">3. Make Changes</h3>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                    Follow existing code style
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                    Add comprehensive comments
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                    Update tests as needed
                  </li>
                </ul>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20 rounded"></div>
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-3">4. Submit PR</h3>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                    Clear PR description
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                    Reference related issues
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                    Include screenshots
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8">Ready to Make an Impact?</h2>
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/NotHarshhaa/DevOps-Tool-Installer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-5 h-5 mr-3" />
              View on GitHub
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-card border border-border hover:bg-card/80 text-foreground rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeart className="w-5 h-5 mr-3 text-red-500" />
              Support Project
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
