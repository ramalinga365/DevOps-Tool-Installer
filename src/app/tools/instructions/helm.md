---
title: Helm Installation Guide
description: Step-by-step guide to install Helm, the package manager for Kubernetes
---

# Helm Installation Guide

## Prerequisites
- A Kubernetes cluster
- `kubectl` installed and configured

## Linux

### 1. Using Package Manager (Snap)
```bash
sudo snap install helm --classic
```

### 2. Using Apt (Debian/Ubuntu)
```bash
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

### 3. Using Script
```bash
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

## macOS

### 1. Using Homebrew
```bash
brew install helm
```

### 2. Using MacPorts
```bash
sudo port install helm
```

## Windows

### 1. Using Chocolatey
```powershell
choco install kubernetes-helm
```

### 2. Using Scoop
```powershell
scoop install helm
```

### 3. Manual Installation
1. Download the latest release from [Helm Releases](https://github.com/helm/helm/releases)
2. Unzip the package
3. Add the `helm.exe` binary to your PATH

## Post-Installation Setup

### 1. Verify Installation
```bash
helm version
```

### 2. Add Common Repositories
```bash
# Add stable charts repository
helm repo add stable https://charts.helm.sh/stable

# Add bitnami repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Update repositories
helm repo update
```

### 3. Initialize Helm (if using Helm 2)
```bash
helm init
```

## Common Operations

### 1. Repository Management
```bash
# List repositories
helm repo list

# Search for charts
helm search repo nginx

# Update repositories
helm repo update
```

### 2. Chart Management
```bash
# List installed releases
helm list

# Install a chart
helm install my-release bitnami/nginx

# Upgrade a release
helm upgrade my-release bitnami/nginx

# Rollback a release
helm rollback my-release 1

# Uninstall a release
helm uninstall my-release
```

### 3. Chart Development
```bash
# Create a new chart
helm create mychart

# Lint a chart
helm lint mychart

# Package a chart
helm package mychart

# Install chart from local directory
helm install my-release ./mychart
```

### 4. Debugging
```bash
# Debug chart installation
helm install --debug --dry-run my-release ./mychart

# Get release status
helm status my-release

# Get release history
helm history my-release
```

## Configuration

### 1. Set Up Bash Completion
```bash
helm completion bash > /etc/bash_completion.d/helm
```

### 2. Set Up Environment Variables
```bash
# Set default namespace
export HELM_NAMESPACE=my-namespace

# Set kubeconfig path
export KUBECONFIG=/path/to/kubeconfig
```

## Uninstallation Instructions

### Linux (Snap)
```bash
sudo snap remove helm
```

### Linux (Apt)
```bash
sudo apt-get remove helm
```

### macOS
```bash
brew uninstall helm
```

### Windows (Chocolatey)
```powershell
choco uninstall kubernetes-helm
```

### Windows (Scoop)
```powershell
scoop uninstall helm
```

### Manual Cleanup
```bash
# Remove Helm configuration
rm -rf ~/.helm

# Remove Helm cache
rm -rf ~/.cache/helm
``` 