"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaCode,
  FaRocket,
  FaTools,
  FaAws,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiDocker,
  SiTerraform,
  SiAnsible,
  SiJenkins,
  SiGithubactions,
  SiPython,
  SiLinux,
  SiGnubash,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { MdWavingHand } from "react-icons/md";

const technologies = [
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Azure", icon: VscAzure, color: "#0078D4" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
  { name: "Ansible", icon: SiAnsible, color: "#EE0000" },
  { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
];

const FloatingTechnologies = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {technologies.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <motion.div
            key={tech.name}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5 + Math.random() * 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
            style={{ color: tech.color }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        );
      })}
    </div>
  );
};

const WavingHand = () => (
  <motion.div
    animate={{
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 1,
      },
    }}
    className="inline-block"
  >
    <MdWavingHand className="w-10 h-10 text-yellow-400" />
  </motion.div>
);

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/ramalinga365",
      color: "hover:text-[#333] hover:bg-white/90",
      description: "Check out my open source projects",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://linkedin.com/in/ramalinga365",
      color: "hover:text-[#0077b5] hover:bg-white/90",
      description: "Connect with me professionally",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      url: "",
      color: "hover:text-[#0088cc] hover:bg-white/90",
      description: "Message me on Telegram",
    },
  ];

  const expertise = [
    {
      title: "Cloud Architect",
      icon: FaRocket,
      description:
        "Designing scalable and secure cloud infrastructures using AWS, Azure, and modern DevOps practices.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "DevOps Engineer",
      icon: FaTools,
      description:
        "Implementing CI/CD pipelines, infrastructure as code, and automated deployment workflows.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Tech Educator",
      icon: FaCode,
      description:
        "Creating comprehensive guides, tutorials, and documentation for the DevOps community.",
      gradient: "from-pink-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {mounted && <FloatingTechnologies />}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative px-4 py-24"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <WavingHand />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Hi, I'm Harshhaa
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative mb-12"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-lg blur opacity-20"></div>
            <p className="relative text-xl md:text-2xl text-muted-foreground leading-relaxed bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/40">
              A passionate DevOps Engineer crafting efficient cloud
              infrastructures and automating everything in sight! 🚀
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  group relative flex flex-col items-center gap-2 px-6 py-4 rounded-xl
                  bg-card/50 backdrop-blur-sm border border-border/40
                  transition-all duration-300 ${link.color}
                `}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <link.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{link.name}</span>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {link.description}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Expertise Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/40 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative z-10">
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/40"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 opacity-50 rounded-2xl" />
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Technologies I Work With
          </h2>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                className="group relative p-4 rounded-xl bg-card/40 hover:bg-card/60 transition-all duration-300 border border-border/40"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <div className="relative flex flex-col items-center gap-3">
                  <tech.icon
                    className="w-10 h-10 transition-all duration-300"
                    style={{
                      color:
                        hoveredTech === tech.name ? tech.color : "currentColor",
                    }}
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
