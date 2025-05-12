---
title: Minikube Installation Guide
description: Step-by-step guide to install and configure Minikube for local Kubernetes development
---

# Minikube Installation Guide

## Prerequisites
- 2 CPUs or more
- 2GB of free memory
- 20GB of free disk space
- Container or virtual machine manager (Docker, VirtualBox, etc.)
- Internet connection

## Linux

### 1. Install Dependencies
```bash
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    virtualbox \
    virtualbox-ext-pack
```

### 2. Install Minikube
```bash
# Download binary
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Install binary
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

### 3. Install kubectl
```bash
# Download binary
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Install binary
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### 4. Start Minikube
```bash
# Start with default driver
minikube start

# Start with specific driver
minikube start --driver=virtualbox
```

## macOS

### 1. Using Homebrew
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Minikube
brew install minikube

# Install kubectl
brew install kubectl
```

### 2. Manual Installation
```bash
# Download Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64

# Install Minikube
sudo install minikube-darwin-amd64 /usr/local/bin/minikube

# Download and install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

## Windows

### 1. Using Chocolatey
```powershell
# Install Chocolatey if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Minikube
choco install minikube kubernetes-cli
```

### 2. Manual Installation
1. Download the [Minikube installer](https://github.com/kubernetes/minikube/releases/latest) for Windows
2. Download the [kubectl binary](https://dl.k8s.io/release/v1.28.0/bin/windows/amd64/kubectl.exe)
3. Add both to your PATH

## Post-Installation Setup

### 1. Verify Installation
```bash
# Check Minikube version
minikube version

# Check kubectl version
kubectl version --client
```

### 2. Configure Default Driver
```bash
# Set default driver
minikube config set driver virtualbox

# View current configuration
minikube config view
```

### 3. Enable Addons
```bash
# List available addons
minikube addons list

# Enable common addons
minikube addons enable ingress
minikube addons enable dashboard
minikube addons enable metrics-server
```

## Configuration

### 1. Resource Allocation
```bash
# Start with custom resources
minikube start \
  --cpus 4 \
  --memory 8192 \
  --disk-size 50g
```

### 2. Multiple Clusters
```bash
# Create named cluster
minikube start -p cluster2

# List clusters
minikube profile list

# Switch between clusters
minikube profile cluster2
```

### 3. Networking
```bash
# Set custom network
minikube start --network-plugin=cni

# Configure host access
minikube tunnel
```

## Common Operations

### 1. Cluster Management
```bash
# Start cluster
minikube start

# Stop cluster
minikube stop

# Delete cluster
minikube delete

# Pause cluster
minikube pause

# Unpause cluster
minikube unpause
```

### 2. Service Access
```bash
# List services
minikube service list

# Access service
minikube service service-name

# Get service URL
minikube service service-name --url
```

### 3. Docker Integration
```bash
# Use Minikube's Docker daemon
eval $(minikube docker-env)

# Revert to host's Docker daemon
eval $(minikube docker-env -u)
```

### 4. Dashboard Access
```bash
# Open dashboard
minikube dashboard

# Get dashboard URL
minikube dashboard --url
```

## Troubleshooting

### 1. Common Issues
```bash
# Check cluster status
minikube status

# View detailed logs
minikube logs

# SSH into node
minikube ssh
```

### 2. Driver Issues
```bash
# List available drivers
minikube config defaults driver

# Delete and recreate with different driver
minikube delete
minikube start --driver=docker
```

### 3. Resource Issues
```bash
# Check resource usage
minikube ssh -- top

# Check disk space
minikube ssh -- df -h
```

### 4. Network Issues
```bash
# Check connectivity
minikube ssh -- ping -c 4 google.com

# Check DNS
minikube ssh -- nslookup kubernetes.default
```

## Advanced Usage

### 1. Custom Images
```bash
# Load local image
minikube image load my-image:latest

# Build image using Minikube's Docker
eval $(minikube docker-env)
docker build -t my-image:latest .
```

### 2. Mount Host Directory
```bash
# Mount local directory
minikube mount /path/on/host:/path/in/minikube

# Access mounted directory
minikube ssh "ls /path/in/minikube"
```

### 3. Custom Addons
```bash
# Create custom addon
minikube addons configure custom-addon

# Enable custom addon
minikube addons enable custom-addon
```

## Uninstallation Instructions

### Linux
```bash
# Delete all clusters
minikube delete --all

# Remove Minikube
sudo rm -rf /usr/local/bin/minikube
sudo rm -rf ~/.minikube

# Remove kubectl
sudo rm -rf /usr/local/bin/kubectl
sudo rm -rf ~/.kube
```

### macOS
```bash
# Using Homebrew
brew uninstall minikube kubectl

# Manual cleanup
sudo rm -rf /usr/local/bin/minikube
sudo rm -rf ~/.minikube
sudo rm -rf /usr/local/bin/kubectl
sudo rm -rf ~/.kube
```

### Windows
```powershell
# Using Chocolatey
choco uninstall minikube kubernetes-cli

# Manual cleanup
Remove-Item -Path "C:\Program Files\Kubernetes\Minikube" -Recurse
Remove-Item -Path "$env:USERPROFILE\.minikube" -Recurse
Remove-Item -Path "$env:USERPROFILE\.kube" -Recurse
```

### Clean Up Docker Resources
```bash
# Remove Minikube containers
docker rm $(docker ps -a | grep "k8s_" | awk '{print $1}')

# Remove Minikube images
docker rmi $(docker images | grep "k8s.gcr.io" | awk '{print $3}')
``` 