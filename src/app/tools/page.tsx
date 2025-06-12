"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDocker,
  FaGit,
  FaJenkins,
  FaAws,
  FaGoogle,
  FaMicrosoft,
  FaSearch,
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
import { Search } from "@/components/Search";

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
    id: "aws-cli",
    name: "AWS CLI",
    description: "Command line interface for interacting with AWS services",
    category: "Cloud",
    icon: FaAws,
  },
  {
    id: "azure-cli",
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

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(tools.map((tool) => tool.category))),
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {mounted && <FloatingIcons />}
      <div className="container mx-auto px-4 py-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            DevOps Tools Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and install the most popular DevOps tools with our
            comprehensive guides
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative">
              <Search
                onSearch={setSearchQuery}
                placeholder="Search tools by name or description..."
              />
            </div>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg"
                      : "bg-primary/10 hover:bg-primary/20 text-primary"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={item}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Link href={`/tools/${tool.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group relative h-full bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/40 overflow-hidden transition-all duration-300"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />

                    <div className="relative">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                        >
                          <tool.icon className="w-8 h-8 text-primary" />
                        </motion.div>
                        <div>
                          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                            {tool.name}
                          </h2>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {tool.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                          View Installation Guide
                        </span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                          <svg
                            className="w-4 h-4 text-primary"
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
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <FaSearch className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              No Tools Found
            </h3>
            <p className="text-lg text-muted-foreground">
              No tools match your search criteria. Try adjusting your search or
              filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
