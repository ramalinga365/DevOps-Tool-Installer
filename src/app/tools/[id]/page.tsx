"use client";

import { useParams } from "next/navigation";
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
  FaCopy,
  FaCheckCircle,
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
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  BookOpenIcon,
  CommandLineIcon,
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { parseMarkdownSections } from "@/lib/markdown";
import matter from "gray-matter";

interface Section {
  title: string;
  content: string;
  steps: {
    description: string;
    code?: string;
    language?: string;
  }[];
}

interface ToolInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const tools: Record<string, ToolInfo> = {
  docker: {
    id: "docker",
    name: "Docker",
    description: "Install Docker on your system",
    icon: FaDocker,
  },
  kubernetes: {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Install Kubernetes and required tools",
    icon: SiKubernetes,
  },
  terraform: {
    id: "terraform",
    name: "Terraform",
    description: "Infrastructure as Code tool",
    icon: SiTerraform,
  },
  ansible: {
    id: "ansible",
    name: "Ansible",
    description: "Automation tool for configuration",
    icon: SiAnsible,
  },
  jenkins: {
    id: "jenkins",
    name: "Jenkins",
    description: "CI/CD automation server",
    icon: FaJenkins,
  },
  helm: {
    id: "helm",
    name: "Helm",
    description: "Package manager for Kubernetes",
    icon: SiHelm,
  },
  prometheus: {
    id: "prometheus",
    name: "Prometheus",
    description: "Monitoring and alerting toolkit",
    icon: SiPrometheus,
  },
  grafana: {
    id: "grafana",
    name: "Grafana",
    description: "Analytics and visualization platform",
    icon: SiGrafana,
  },
  "gitlab-runner": {
    id: "gitlab-runner",
    name: "GitLab Runner",
    description: "CI/CD execution agent",
    icon: SiGitlab,
  },
  vault: {
    id: "vault",
    name: "HashiCorp Vault",
    description: "Secrets management tool",
    icon: SiVault,
  },
  consul: {
    id: "consul",
    name: "HashiCorp Consul",
    description: "Service discovery and configuration",
    icon: SiConsul,
  },
  minikube: {
    id: "minikube",
    name: "Minikube",
    description: "Local Kubernetes development",
    icon: SiKubernetes,
  },
  istio: {
    id: "istio",
    name: "Istio",
    description: "Service mesh for Kubernetes",
    icon: SiIstio,
  },
  "openshift-cli": {
    id: "openshift-cli",
    name: "OpenShift CLI",
    description: "Red Hat OpenShift command-line tool",
    icon: SiRedhatopenshift,
  },
  packer: {
    id: "packer",
    name: "Packer",
    description: "Machine image creation tool",
    icon: SiPacker,
  },
};

export default function ToolPage() {
  const params = useParams();
  const toolId = params.id as string;
  const tool = tools[toolId];

  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedSteps, setCopiedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionElements = document.querySelectorAll("h2[id]");
      let currentSection = "";
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchInstructions() {
      try {
        const response = await fetch(`/api/instructions/${toolId}`);
        if (!response.ok) throw new Error("Failed to fetch instructions");

        const { content } = await response.json();
        const { data, content: markdownContent } = matter(content);

        const parsedSections = await parseMarkdownSections(markdownContent);
        setSections(parsedSections);
      } catch (error) {
        console.error("Error fetching instructions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (tool) {
      fetchInstructions();
    }
  }, [toolId, tool]);

  const handleCopy = async (code: string, stepId: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedSteps({ ...copiedSteps, [stepId]: true });
    setTimeout(() => {
      setCopiedSteps({ ...copiedSteps, [stepId]: false });
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!tool) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80"
      >
        <div className="text-center p-8 rounded-xl backdrop-blur-sm bg-card/30 border border-border/40">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <DocumentTextIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Tool Not Found
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            The requested tool installation guide could not be found in our
            database.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80">
        <div className="space-y-6 p-8 rounded-xl backdrop-blur-sm bg-card/30 border border-border/40">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-12 bg-primary/20 rounded-full mx-auto"></div>
            <div className="h-8 bg-primary/10 rounded-lg w-48"></div>
            <div className="h-4 bg-primary/10 rounded w-64"></div>
            <div className="h-4 bg-primary/10 rounded w-56"></div>
          </div>
        </div>
      </div>
    );
  }

  const ToolIcon = tool.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ x: -5 }}
            >
              <Link
                href="/"
                className="group flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Tools</span>
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block col-span-3"
          >
            <div className="sticky top-20 space-y-6">
              {/* Tool Header */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-card/50 rounded-xl border border-border/40 backdrop-blur-sm shadow-lg"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <ToolIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="bg-card/50 rounded-xl border border-border/40 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="p-4 border-b border-border/40 bg-muted/50">
                  <h3 className="font-medium text-sm text-primary">
                    Installation Guide
                  </h3>
                </div>
                <nav className="p-2">
                  <div className="space-y-1">
                    {sections.map((section, index) => {
                      const sectionId = section.title
                        .toLowerCase()
                        .replace(/\s+/g, "-");
                      const isActive = activeSection === sectionId;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={`#${sectionId}`}
                            className={`
                              flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all
                              ${
                                isActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                              }
                            `}
                          >
                            {index === 0 ? (
                              <BookOpenIcon className="w-4 h-4" />
                            ) : (
                              <CommandLineIcon className="w-4 h-4" />
                            )}
                            <span>{section.title}</span>
                          </Link>

                          {section.steps.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="ml-6 mt-1 space-y-1"
                            >
                              {section.steps.map((step, stepIndex) => (
                                <Link
                                  key={stepIndex}
                                  href={`#${sectionId}-step-${stepIndex + 1}`}
                                  className="flex items-center gap-2 px-4 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors rounded-md"
                                >
                                  <ChevronRightIcon className="w-3 h-3" />
                                  <span className="line-clamp-1">
                                    {step.description}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12 lg:col-span-9"
          >
            <div className="space-y-8">
              {/* Tool Header */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="relative overflow-hidden p-8 rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-50" />
                <div className="relative flex items-center gap-6">
                  <div className="p-4 rounded-xl bg-primary/10 backdrop-blur-sm">
                    <ToolIcon className="w-16 h-16 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      {tool.name}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Instructions Content */}
              <div className="space-y-12">
                {sections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.2 }}
                    id={section.title.toLowerCase().replace(/\s+/g, "-")}
                    className="scroll-mt-20"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        {sectionIndex === 0 ? (
                          <BookOpenIcon className="h-5 w-5 text-primary" />
                        ) : (
                          <CommandLineIcon className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        {section.title}
                      </h2>
                    </div>

                    {section.content && (
                      <div
                        className="prose prose-gray dark:prose-invert max-w-none mb-8 px-6 py-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/40"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}

                    {section.steps.length > 0 && (
                      <div className="space-y-6">
                        {section.steps.map((step, stepIndex) => {
                          const stepId = `${section.title}-${stepIndex}`;
                          return (
                            <motion.div
                              key={stepIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: stepIndex * 0.1 }}
                              id={`${section.title.toLowerCase().replace(/\s+/g, "-")}-step-${stepIndex + 1}`}
                              className="rounded-xl bg-card/30 backdrop-blur-sm border border-border/40 overflow-hidden"
                            >
                              <div className="p-6 border-b border-border/40">
                                <h3 className="text-xl font-medium flex items-center gap-3">
                                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                                    {stepIndex + 1}
                                  </span>
                                  {step.description}
                                </h3>
                              </div>

                              {step.code && (
                                <div className="relative">
                                  <div className="absolute right-4 top-4 z-10">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handleCopy(step.code!, stepId)
                                      }
                                      className="px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                      {copiedSteps[stepId] ? (
                                        <>
                                          <FaCheckCircle className="w-4 h-4" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <FaCopy className="w-4 h-4" />
                                          Copy
                                        </>
                                      )}
                                    </motion.button>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <SyntaxHighlighter
                                      language={step.language || "bash"}
                                      style={oneDark}
                                      customStyle={{
                                        margin: 0,
                                        padding: "2rem",
                                        background: "transparent",
                                        fontSize: "0.9rem",
                                        lineHeight: "1.7",
                                      }}
                                      wrapLongLines={true}
                                      showLineNumbers={true}
                                    >
                                      {step.code}
                                    </SyntaxHighlighter>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background/95 backdrop-blur-lg border-l border-border/40 shadow-xl"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-border/40">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Mobile navigation content */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
