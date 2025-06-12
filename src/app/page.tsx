"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaDocker,
  FaGit,
  FaJenkins,
  FaAws,
  FaGoogle,
  FaMicrosoft,
  FaTools,
  FaCentos,
} from "react-icons/fa";
import {
  SiAnsible,
  SiTerraform,
  SiKubernetes,
  SiGrafana,
  SiGitlab,
  SiIstio,
  SiRedhatopenshift,
  SiPacker,
  SiVault,
  SiConsul,
  SiHelm,
  SiPrometheus,
} from "react-icons/si";
import { MdCategory, MdBrowserUpdated } from "react-icons/md";
import { Search } from "@/components/Search";
import { motion, AnimatePresence } from "framer-motion";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
}

const tools: Tool[] = [
  {
    id: "docker",
    name: "Docker",
    description:
      "Containerization platform for building, shipping, and running applications",
    category: "Containers",
    icon: FaDocker,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description:
      "Container orchestration platform for automating deployment and scaling",
    category: "Containers",
    icon: SiKubernetes,
  },
  {
    id: "terraform",
    name: "Terraform",
    description:
      "Infrastructure as Code tool for building and managing cloud infrastructure",
    category: "Infrastructure",
    icon: SiTerraform,
  },
  {
    id: "ansible",
    name: "Ansible",
    description:
      "Automation tool for configuration management and application deployment",
    category: "Automation",
    icon: SiAnsible,
  },
  {
    id: "git",
    name: "Git",
    description: "Distributed version control system for tracking code changes",
    category: "Version Control",
    icon: FaGit,
  },
  {
    id: "jenkins",
    name: "Jenkins",
    description:
      "Open-source automation server for building, testing, and deploying code",
    category: "CI/CD",
    icon: FaJenkins,
  },
  {
    id: "aws",
    name: "AWS CLI",
    description: "Command line interface for interacting with AWS services",
    category: "Cloud",
    icon: FaAws,
  },
  {
    id: "azure",
    name: "Azure CLI",
    description: "Command line interface for managing Azure resources",
    category: "Cloud",
    icon: FaMicrosoft,
  },
  {
    id: "gcloud",
    name: "Google Cloud SDK",
    description: "Command line interface for Google Cloud Platform",
    category: "Cloud",
    icon: FaGoogle,
  },
  {
    id: "helm",
    name: "Helm",
    description: "Package manager for Kubernetes applications",
    category: "Containers",
    icon: SiHelm,
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description:
      "Monitoring and alerting toolkit for cloud-native applications",
    category: "Monitoring",
    icon: SiPrometheus,
  },
  {
    id: "grafana",
    name: "Grafana",
    description: "Analytics and interactive visualization platform",
    category: "Monitoring",
    icon: SiGrafana,
  },
  {
    id: "gitlab-runner",
    name: "GitLab Runner",
    description: "CI/CD execution agent for GitLab pipelines",
    category: "CI/CD",
    icon: SiGitlab,
  },
  {
    id: "vault",
    name: "HashiCorp Vault",
    description: "Secrets management and data protection platform",
    category: "Security",
    icon: SiVault,
  },
  {
    id: "consul",
    name: "HashiCorp Consul",
    description: "Service discovery and configuration management tool",
    category: "Infrastructure",
    icon: SiConsul,
  },
  {
    id: "minikube",
    name: "Minikube",
    description: "Tool for running Kubernetes locally",
    category: "Containers",
    icon: SiKubernetes,
  },
  {
    id: "istio",
    name: "Istio",
    description: "Service mesh for Kubernetes and microservices",
    category: "Containers",
    icon: SiIstio,
  },
  {
    id: "openshift-cli",
    name: "OpenShift CLI",
    description: "Command-line interface for Red Hat OpenShift",
    category: "Containers",
    icon: SiRedhatopenshift,
  },
  {
    id: "packer",
    name: "Packer",
    description: "Tool for creating identical machine images",
    category: "Infrastructure",
    icon: SiPacker,
  },
];

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0.5 + Math.random() * 0.5,
            opacity: 0.3 + Math.random() * 0.7,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.2,
          }}
        >
          <tool.icon className="w-8 h-8 text-primary" />
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTools = tools.filter((tool) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.category.toLowerCase().includes(searchLower);

    return (
      matchesSearch && (!selectedCategory || tool.category === selectedCategory)
    );
  });

  const toolsByCategory = categories.reduce(
    (acc, category) => {
      const categoryTools = filteredTools.filter(
        (tool) => tool.category === category,
      );
      if (categoryTools.length > 0) {
        acc[category] = categoryTools;
      }
      return acc;
    },
    {} as Record<string, Tool[]>,
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background border-b border-border/40">
        {mounted && <FloatingIcons />}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    DevOps Tool Installation
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-primary bg-clip-text text-transparent">
                    Setup & Guides
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Your one-stop destination for seamless DevOps tool
                  installation
                </motion.p>
              </div>

              <motion.div
                className="max-w-2xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative">
                    <Search
                      onSearch={setSearchQuery}
                      placeholder="Search tools by name, category, or description..."
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      !selectedCategory
                        ? "bg-primary text-white"
                        : "bg-primary/10 hover:bg-primary/20 text-primary"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(
                          category === selectedCategory ? null : category,
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        category === selectedCategory
                          ? "bg-primary text-white"
                          : "bg-primary/10 hover:bg-primary/20 text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  {
                    label: "Tools Available",
                    value: "15+",
                    icon: FaTools,
                  },
                  {
                    label: "Categories",
                    value: "6",
                    icon: MdCategory,
                  },
                  { label: "OS Supported", value: "3", icon: FaCentos },
                  {
                    label: "Updated Daily",
                    value: "24/7",
                    icon: MdBrowserUpdated,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4 hover:bg-card/80 transition-all duration-300 hover:scale-105"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-3xl mb-2">
                      <stat.icon className="w-8 h-8 text-primary mx-auto" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Object.entries(toolsByCategory).map(
              ([category, categoryTools], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2 }}
                  className="relative"
                >
                  <div className="flex items-center mb-8">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center">
                      {category}
                      <span className="ml-3 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {categoryTools.length} tools
                      </span>
                    </h2>
                    <div className="ml-4 flex-grow border-t border-border/30"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTools.map((tool, toolIndex) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: toolIndex * 0.1 }}
                      >
                        <Link href={`/tools/${tool.id}`}>
                          <motion.div
                            className="group relative bg-card hover:bg-card/80 rounded-xl border border-border/40 p-6 transition-all duration-300 hover:shadow-lg overflow-hidden"
                            whileHover={{ y: -5 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />

                            <div className="relative">
                              <div className="flex items-center mb-4">
                                <motion.div
                                  className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <tool.icon className="w-8 h-8 text-primary" />
                                </motion.div>
                                <div className="ml-4">
                                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {tool.name}
                                  </h3>
                                  <div className="flex items-center mt-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-1"></div>
                                    <span className="text-xs text-muted-foreground">
                                      {category}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-muted-foreground text-sm line-clamp-2 mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                                {tool.description}
                              </p>

                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                  View Installation Guide
                                </span>
                                <motion.div
                                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <svg
                                    className="w-5 h-5 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </motion.div>
        </AnimatePresence>

        {filteredTools.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-lg text-muted-foreground">
              No tools found matching your search criteria.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
