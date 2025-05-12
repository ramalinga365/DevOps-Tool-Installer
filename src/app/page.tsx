'use client';

import { useState } from 'react';
import Link from 'next/link'
import { FaDocker, FaGit, FaJenkins, FaAws, FaGoogle, FaMicrosoft } from 'react-icons/fa'
import { SiAnsible, SiTerraform, SiKubernetes, SiGrafana, SiGitlab, SiIstio, SiRedhatopenshift, SiPacker, SiVault, SiConsul, SiHelm, SiPrometheus } from 'react-icons/si'
import { Search } from '@/components/Search';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
}

const tools: Tool[] = [
  {
    id: 'docker',
    name: 'Docker',
    description: 'Containerization platform for building, shipping, and running applications',
    category: 'Containers',
    icon: FaDocker
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Container orchestration platform for automating deployment and scaling',
    category: 'Containers',
    icon: SiKubernetes
  },
  {
    id: 'terraform',
    name: 'Terraform',
    description: 'Infrastructure as Code tool for building and managing cloud infrastructure',
    category: 'Infrastructure',
    icon: SiTerraform
  },
  {
    id: 'ansible',
    name: 'Ansible',
    description: 'Automation tool for configuration management and application deployment',
    category: 'Automation',
    icon: SiAnsible
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Distributed version control system for tracking code changes',
    category: 'Version Control',
    icon: FaGit
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    description: 'Open-source automation server for building, testing, and deploying code',
    category: 'CI/CD',
    icon: FaJenkins
  },
  {
    id: 'aws',
    name: 'AWS CLI',
    description: 'Command line interface for interacting with AWS services',
    category: 'Cloud',
    icon: FaAws
  },
  {
    id: 'azure',
    name: 'Azure CLI',
    description: 'Command line interface for managing Azure resources',
    category: 'Cloud',
    icon: FaMicrosoft
  },
  {
    id: 'gcloud',
    name: 'Google Cloud SDK',
    description: 'Command line interface for Google Cloud Platform',
    category: 'Cloud',
    icon: FaGoogle
  },
  {
    id: 'helm',
    name: 'Helm',
    description: 'Package manager for Kubernetes applications',
    category: 'Containers',
    icon: SiHelm
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    description: 'Monitoring and alerting toolkit for cloud-native applications',
    category: 'Monitoring',
    icon: SiPrometheus
  },
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Analytics and interactive visualization platform',
    category: 'Monitoring',
    icon: SiGrafana
  },
  {
    id: 'gitlab-runner',
    name: 'GitLab Runner',
    description: 'CI/CD execution agent for GitLab pipelines',
    category: 'CI/CD',
    icon: SiGitlab
  },
  {
    id: 'vault',
    name: 'HashiCorp Vault',
    description: 'Secrets management and data protection platform',
    category: 'Security',
    icon: SiVault
  },
  {
    id: 'consul',
    name: 'HashiCorp Consul',
    description: 'Service discovery and configuration management tool',
    category: 'Infrastructure',
    icon: SiConsul
  },
  {
    id: 'minikube',
    name: 'Minikube',
    description: 'Tool for running Kubernetes locally',
    category: 'Containers',
    icon: SiKubernetes
  },
  {
    id: 'istio',
    name: 'Istio',
    description: 'Service mesh for Kubernetes and microservices',
    category: 'Containers',
    icon: SiIstio
  },
  {
    id: 'openshift-cli',
    name: 'OpenShift CLI',
    description: 'Command-line interface for Red Hat OpenShift',
    category: 'Containers',
    icon: SiRedhatopenshift
  },
  {
    id: 'packer',
    name: 'Packer',
    description: 'Tool for creating identical machine images',
    category: 'Infrastructure',
    icon: SiPacker
  }
];

const categories = Array.from(new Set(tools.map(tool => tool.category)));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool => {
    const searchLower = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.category.toLowerCase().includes(searchLower)
    );
  });

  const toolsByCategory = categories.reduce((acc, category) => {
    const categoryTools = filteredTools.filter(tool => tool.category === category);
    if (categoryTools.length > 0) {
      acc[category] = categoryTools;
    }
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <main className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-primary/5 border-b border-border/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  DevOps Tool Installation Setup/Guides
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Easy installation guides for essential DevOps tools
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative">
                    <Search
                      onSearch={setSearchQuery}
                      placeholder="Search tools by name, category, or description..."
                    />
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Popular searches: Docker, Kubernetes, Terraform, Ansible
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
                {[
                  { label: 'Tools Available', value: '15+' },
                  { label: 'Categories', value: '6' },
                  { label: 'OS Supported', value: '3' },
                  { label: 'Updated Daily', value: '24/7' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4 hover:bg-card/80 transition-colors"
                  >
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
            <div key={category} className="relative">
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
                {categoryTools.map(tool => (
                  <Link key={tool.id} href={`/tools/${tool.id}`}>
                    <div className="group relative bg-card hover:bg-card/80 rounded-xl border border-border/40 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rotate-45 transform scale-150"></div>
                      </div>
                      
                      <div className="relative">
                        <div className="flex items-center mb-4">
                          <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 relative">
                            <tool.icon className="w-8 h-8 text-primary transform group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse group-hover:animate-none"></div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-xl font-medium text-card-foreground group-hover:text-primary transition-colors duration-300">
                              {tool.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-1"></div>
                              <span className="text-xs text-muted-foreground">{category}</span>
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
                          <div className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-primary/0 group-hover:bg-primary/5 transform rotate-45 transition-all duration-300"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No tools found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
