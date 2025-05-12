'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaDocker, FaGit, FaJenkins, FaAws, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiAnsible, SiTerraform, SiKubernetes, SiGrafana, SiGitlab, SiIstio, SiRedhatopenshift, SiPacker, SiVault, SiConsul, SiHelm, SiPrometheus } from 'react-icons/si';
import { ArrowLeftIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { CodeBlock } from '@/components/CodeBlock';
import { parseMarkdownSections } from '@/lib/markdown';
import matter from 'gray-matter';

interface Section {
  title: string;
  content: string;
  steps: {
    description: string;
    code?: string;
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-muted-foreground">
          The requested tool installation guide could not be found.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Tool Header */}
          <div className="flex items-center gap-4 mb-8">
            {tool.icon && <tool.icon className="w-12 h-12" />}
            <div>
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          </div>

          {/* Instructions Content */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                <div 
                  className="mb-6"
                  dangerouslySetInnerHTML={{ __html: section.content }} 
                />
                {section.steps.length > 0 && (
                  <div className="space-y-6">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="rounded-lg">
                        <h3 className="text-xl font-medium mb-4">{step.description}</h3>
                        {step.code && (
                          <CodeBlock code={step.code} language="bash" />
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
    </>
  );
} 