import { Metadata } from 'next';

interface Tool {
  id: string;
  title: string;
  description: string;
}

const tools: Record<string, Tool> = {
  docker: {
    id: 'docker',
    title: 'Docker Installation Guide',
    description: 'Step-by-step guide to install Docker on your system'
  },
  kubernetes: {
    id: 'kubernetes',
    title: 'Kubernetes Installation Guide',
    description: 'Complete guide to install and configure Kubernetes with Minikube'
  },
  terraform: {
    id: 'terraform',
    title: 'Terraform Installation Guide',
    description: 'Learn how to install and set up Terraform for infrastructure management'
  },
  ansible: {
    id: 'ansible',
    title: 'Ansible Installation Guide',
    description: 'Guide to install and configure Ansible for automation'
  },
  jenkins: {
    id: 'jenkins',
    title: 'Jenkins Installation Guide',
    description: 'Complete guide to install and set up Jenkins CI/CD server'
  },
  helm: {
    id: 'helm',
    title: 'Helm Installation Guide',
    description: 'Learn how to install and configure Helm package manager for Kubernetes'
  },
  prometheus: {
    id: 'prometheus',
    title: 'Prometheus Installation Guide',
    description: 'Guide to install and set up Prometheus monitoring system'
  },
  grafana: {
    id: 'grafana',
    title: 'Grafana Installation Guide',
    description: 'Step-by-step guide to install Grafana visualization platform'
  },
  'gitlab-runner': {
    id: 'gitlab-runner',
    title: 'GitLab Runner Installation Guide',
    description: 'Guide to install and configure GitLab Runner for CI/CD'
  },
  vault: {
    id: 'vault',
    title: 'HashiCorp Vault Installation Guide',
    description: 'Learn how to install and set up HashiCorp Vault for secrets management'
  },
  consul: {
    id: 'consul',
    title: 'HashiCorp Consul Installation Guide',
    description: 'Guide to install and configure HashiCorp Consul for service discovery'
  },
  minikube: {
    id: 'minikube',
    title: 'Minikube Installation Guide',
    description: 'Step-by-step guide to install Minikube for local Kubernetes development'
  },
  istio: {
    id: 'istio',
    title: 'Istio Installation Guide',
    description: 'Complete guide to install and configure Istio service mesh'
  },
  'openshift-cli': {
    id: 'openshift-cli',
    title: 'OpenShift CLI Installation Guide',
    description: 'Guide to install and set up the OpenShift Command Line Interface'
  },
  packer: {
    id: 'packer',
    title: 'Packer Installation Guide',
    description: 'Learn how to install and configure HashiCorp Packer for machine images'
  }
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tool = tools[params.id];

  if (!tool) {
    return {
      title: 'Tool Not Found | DevOps Tool Installer',
      description: 'The requested tool installation guide could not be found.'
    };
  }

  return {
    title: `${tool.title} | DevOps Tool Installer`,
    description: tool.description,
    openGraph: {
      title: `${tool.title} | DevOps Tool Installer`,
      description: tool.description,
      type: 'article',
      url: `https://devops-tool-installer.com/tools/${tool.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
    }
  };
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 