'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaDocker, FaGit, FaJenkins, FaAws, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiAnsible, SiTerraform, SiKubernetes, SiGrafana, SiGitlab, SiIstio, SiRedhatopenshift, SiPacker, SiVault, SiConsul, SiHelm, SiPrometheus } from 'react-icons/si';
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
    id: 'aws-cli',
    name: 'AWS CLI',
    description: 'Command line interface for interacting with AWS services',
    category: 'Cloud',
    icon: FaAws
  },
  {
    id: 'azure-cli',
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
  }
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(tools.map(tool => tool.category)))];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">DevOps Tools</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find installation guides for popular DevOps tools and utilities
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="max-w-2xl mx-auto">
          <Search
            onSearch={setSearchQuery}
            placeholder="Search tools by name or description..."
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="group block bg-card hover:bg-card/80 rounded-lg p-6 border border-border/40 transition-colors"
          >
            <div className="flex items-center mb-4">
              {<tool.icon className="w-8 h-8 text-primary mr-3" />}
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {tool.name}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {tool.description}
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {tool.category}
              </span>
            </div>
          </Link>
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
  );
} 