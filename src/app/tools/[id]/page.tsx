'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaDocker, FaGit, FaJenkins, FaAws, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiAnsible, SiTerraform, SiKubernetes, SiGrafana, SiGitlab, SiIstio, SiRedhatopenshift, SiPacker, SiVault, SiConsul, SiHelm, SiPrometheus } from 'react-icons/si';
import { ArrowLeftIcon, ArrowUpIcon, BookOpenIcon, CommandLineIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { parseMarkdownSections } from '@/lib/markdown';
import matter from 'gray-matter';

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
  'docker': {
    id: 'docker',
    name: 'Docker',
    description: 'Install Docker on your system',
    icon: FaDocker
  },
  'kubernetes': {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Install Kubernetes and required tools',
    icon: SiKubernetes
  },
  'terraform': {
    id: 'terraform',
    name: 'Terraform',
    description: 'Infrastructure as Code tool',
    icon: SiTerraform
  },
  'ansible': {
    id: 'ansible',
    name: 'Ansible',
    description: 'Automation tool for configuration',
    icon: SiAnsible
  },
  'jenkins': {
    id: 'jenkins',
    name: 'Jenkins',
    description: 'CI/CD automation server',
    icon: FaJenkins
  },
  'helm': {
    id: 'helm',
    name: 'Helm',
    description: 'Package manager for Kubernetes',
    icon: SiHelm
  },
  'prometheus': {
    id: 'prometheus',
    name: 'Prometheus',
    description: 'Monitoring and alerting toolkit',
    icon: SiPrometheus
  },
  'grafana': {
    id: 'grafana',
    name: 'Grafana',
    description: 'Analytics and visualization platform',
    icon: SiGrafana
  },
  'gitlab-runner': {
    id: 'gitlab-runner',
    name: 'GitLab Runner',
    description: 'CI/CD execution agent',
    icon: SiGitlab
  },
  'vault': {
    id: 'vault',
    name: 'HashiCorp Vault',
    description: 'Secrets management tool',
    icon: SiVault
  },
  'consul': {
    id: 'consul',
    name: 'HashiCorp Consul',
    description: 'Service discovery and configuration',
    icon: SiConsul
  },
  'minikube': {
    id: 'minikube',
    name: 'Minikube',
    description: 'Local Kubernetes development',
    icon: SiKubernetes
  },
  'istio': {
    id: 'istio',
    name: 'Istio',
    description: 'Service mesh for Kubernetes',
    icon: SiIstio
  },
  'openshift-cli': {
    id: 'openshift-cli',
    name: 'OpenShift CLI',
    description: 'Red Hat OpenShift command-line tool',
    icon: SiRedhatopenshift
  },
  'packer': {
    id: 'packer',
    name: 'Packer',
    description: 'Machine image creation tool',
    icon: SiPacker
  }
};

export default function ToolPage() {
  const params = useParams();
  const toolId = params.id as string;
  const tool = tools[toolId];
  
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sectionElements = document.querySelectorAll('h2[id]');
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchInstructions() {
      try {
        const response = await fetch(`/api/instructions/${toolId}`);
        if (!response.ok) throw new Error('Failed to fetch instructions');
        
        const { content } = await response.json();
        const { data, content: markdownContent } = matter(content);
        
        const parsedSections = await parseMarkdownSections(markdownContent);
        setSections(parsedSections);
      } catch (error) {
        console.error('Error fetching instructions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (tool) {
      fetchInstructions();
    }
  }, [toolId, tool]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested tool installation guide could not be found.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="mr-6 flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block col-span-3">
            <div className="sticky top-20">
              {/* Tool Header */}
              <div className="flex items-center gap-3 mb-4 p-4 bg-card rounded-lg border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    {tool.icon && <tool.icon className="w-8 h-8 text-primary" />}
                  </div>
                  <h2 className="text-xl font-semibold leading-none">{tool.name}</h2>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="bg-card rounded-lg border border-border/40">
                <div className="p-3 border-b border-border/40 bg-muted/50">
                  <h3 className="font-medium text-sm text-muted-foreground">Table of Contents</h3>
                </div>
                <nav 
                  className="p-2 overflow-y-auto max-h-[calc(100vh-16rem)]" 
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
                  }}
                >
                  <div className="space-y-2 pr-2">
                    {sections.map((section, index) => {
                      const sectionId = section.title.toLowerCase().replace(/\s+/g, '-');
                      const isActive = activeSection === sectionId;
                      
                      return (
                        <div key={index}>
                          <a
                            href={`#${sectionId}`}
                            className={`
                              flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors
                              ${isActive 
                                ? 'bg-primary/10 text-primary font-medium' 
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              }
                            `}
                          >
                            {index === 0 ? (
                              <BookOpenIcon className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <CommandLineIcon className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span className="line-clamp-1">{section.title}</span>
                          </a>
                          {section.steps.length > 0 && (
                            <div className="ml-9 mt-1 mb-3 space-y-1 border-l-2 border-border/40">
                              {section.steps.map((step, stepIndex) => (
                                <a
                                  key={stepIndex}
                                  href={`#${sectionId}-step-${stepIndex + 1}`}
                                  className="
                                    block pl-3 pr-2 py-1 text-xs text-muted-foreground
                                    hover:text-foreground transition-colors line-clamp-1
                                  "
                                >
                                  {step.description}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-8">
              {/* Tool Header */}
              <div className="flex items-center gap-4 p-6 rounded-lg bg-card border border-border/40">
                {tool.icon && <tool.icon className="w-12 h-12" />}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
              </div>

              {/* Instructions Content */}
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div 
                    key={index} 
                    id={section.title.toLowerCase().replace(/\s+/g, '-')}
                    className="scroll-mt-20"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        {index === 0 ? (
                          <BookOpenIcon className="h-4 w-4 text-primary" />
                        ) : (
                          <CommandLineIcon className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold">{section.title}</h2>
                    </div>

                    {section.content && (
                      <div 
                        className="prose prose-gray dark:prose-invert max-w-none mb-6"
                        dangerouslySetInnerHTML={{ __html: section.content }} 
                      />
                    )}

                    {section.steps.length > 0 && (
                      <div className="space-y-6">
                        {section.steps.map((step, stepIndex) => (
                          <div 
                            key={stepIndex} 
                            id={`${section.title.toLowerCase().replace(/\s+/g, '-')}-step-${stepIndex + 1}`}
                            className="rounded-lg"
                          >
                            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary text-sm">
                                {stepIndex + 1}
                              </span>
                              {step.description}
                            </h3>
                            {step.code && (
                              <div className="relative rounded-lg overflow-hidden border border-border/40 bg-muted">
                                <div className="flex items-center justify-between p-2 border-b border-border/40 bg-background/50">
                                  <div className="text-xs font-mono text-muted-foreground">
                                    {step.language || 'bash'}
                                  </div>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(step.code || '');
                                      const button = document.activeElement as HTMLButtonElement;
                                      if (button) {
                                        button.textContent = 'Copied!';
                                        setTimeout(() => {
                                          button.textContent = 'Copy';
                                        }, 2000);
                                      }
                                    }}
                                    className="px-3 py-1 text-xs font-medium rounded-md
                                      bg-background hover:bg-accent text-foreground hover:text-primary
                                      border border-border/40 transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                                <div className="overflow-x-auto">
                                  <SyntaxHighlighter
                                    language={step.language || 'bash'}
                                    style={oneDark}
                                    customStyle={{
                                      margin: 0,
                                      padding: '1rem',
                                      background: 'transparent',
                                      fontSize: '0.875rem',
                                      lineHeight: '1.7',
                                    }}
                                    wrapLongLines={true}
                                    showLineNumbers={true}
                                    lineNumberStyle={{
                                      minWidth: '2.5em',
                                      paddingRight: '1em',
                                      textAlign: 'right',
                                      color: 'rgba(156, 163, 175, 0.5)',
                                      userSelect: 'none',
                                    }}
                                  >
                                    {step.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:bg-primary/90 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </div>
  );
} 