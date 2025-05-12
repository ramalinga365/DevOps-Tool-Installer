---
title: OpenShift CLI (oc) Installation Guide
description: Step-by-step guide to install and configure the OpenShift Command Line Interface (oc)
---

# OpenShift CLI (oc) Installation Guide

## Prerequisites
- Access to an OpenShift cluster (optional)
- Red Hat account (for downloading from official sources)
- Basic command line knowledge
- Internet connection

## Linux

### 1. Download OpenShift CLI
```bash
# For Linux x86_64
wget https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-linux.tar.gz

# For Linux ARM64
wget https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-linux-arm64.tar.gz
```

### 2. Extract and Install
```bash
# Extract archive
tar xvzf openshift-client-linux.tar.gz

# Move binaries to system path
sudo mv oc kubectl /usr/local/bin/

# Make binaries executable
sudo chmod +x /usr/local/bin/oc /usr/local/bin/kubectl
```

### 3. Verify Installation
```bash
# Check version
oc version

# View help
oc help
```

## macOS

### 1. Using Homebrew
```bash
# Install OpenShift CLI
brew install openshift-cli
```

### 2. Manual Installation
```bash
# Download CLI tools
curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-mac.tar.gz

# Extract archive
tar xvzf openshift-client-mac.tar.gz

# Move binaries to system path
sudo mv oc kubectl /usr/local/bin/

# Make binaries executable
sudo chmod +x /usr/local/bin/oc /usr/local/bin/kubectl
```

## Windows

### 1. Using Chocolatey
```powershell
# Install OpenShift CLI
choco install openshift-cli
```

### 2. Manual Installation
1. Download the [OpenShift CLI for Windows](https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-windows.zip)
2. Extract the archive
3. Add the extracted directory to your PATH

## Post-Installation Setup

### 1. Configure Cluster Access
```bash
# Log in to cluster
oc login --token=<token> --server=https://api.cluster.example.com:6443

# View cluster status
oc status

# View current context
oc config current-context
```

### 2. Configure Default Project
```bash
# Create new project
oc new-project my-project

# Set as default
oc project my-project
```

### 3. Configure Auto-completion
```bash
# For Bash
oc completion bash > ~/.oc-completion.bash
echo 'source ~/.oc-completion.bash' >> ~/.bashrc

# For Zsh
oc completion zsh > "${fpath[1]}/_oc"
```

## Common Operations

### 1. Project Management
```bash
# List projects
oc get projects

# Create project
oc new-project my-project

# Switch project
oc project my-project

# Delete project
oc delete project my-project
```

### 2. Application Deployment
```bash
# Create new app from source
oc new-app https://github.com/sclorg/nodejs-ex

# Create app from template
oc new-app --template=mysql-persistent

# Create app from Docker image
oc new-app nginx:latest
```

### 3. Resource Management
```bash
# Get resources
oc get pods
oc get services
oc get routes

# Describe resource
oc describe pod my-pod

# Edit resource
oc edit deployment my-deployment
```

### 4. Troubleshooting
```bash
# View logs
oc logs pod/my-pod

# Execute command in pod
oc exec my-pod -- ls /

# Port forwarding
oc port-forward service/my-service 8080:80
```

## Advanced Usage

### 1. Template Management
```bash
# List available templates
oc get templates -n openshift

# Export template
oc get template mysql-persistent -n openshift -o yaml > template.yaml

# Create from template
oc process -f template.yaml | oc create -f -
```

### 2. Build Configuration
```bash
# Start new build
oc start-build my-build-config

# View build logs
oc logs -f bc/my-build-config

# Cancel build
oc cancel-build my-build-config-1
```

### 3. Route Management
```bash
# Create route
oc create route edge --service=my-service

# List routes
oc get routes

# Delete route
oc delete route my-route
```

### 4. Security Context Constraints
```bash
# List SCCs
oc get scc

# Add SCC to service account
oc adm policy add-scc-to-user anyuid -z my-serviceaccount

# Remove SCC from service account
oc adm policy remove-scc-from-user anyuid -z my-serviceaccount
```

## Configuration Management

### 1. Cluster Configuration
```bash
# View cluster version
oc get clusterversion

# View cluster operators
oc get clusteroperators

# View machine configs
oc get machineconfig
```

### 2. User Management
```bash
# Create service account
oc create serviceaccount my-sa

# Add role to user
oc policy add-role-to-user admin username

# Create rolebinding
oc create rolebinding my-rb --clusterrole=view --user=username
```

### 3. Resource Quotas
```bash
# Create resource quota
oc create quota my-quota --hard=cpu=2,memory=4Gi

# View quotas
oc get resourcequota

# Describe quota usage
oc describe quota my-quota
```

## Troubleshooting

### 1. Common Issues
```bash
# Check cluster status
oc get nodes
oc get events

# Check pod status
oc get pods --all-namespaces
oc describe pod pod-name
```

### 2. Diagnostic Tools
```bash
# Run diagnostics
oc adm diagnostics

# Check network connectivity
oc debug node/node-name
```

### 3. Resource Constraints
```bash
# View resource usage
oc adm top nodes
oc adm top pods
```

## Uninstallation Instructions

### Linux
```bash
# Remove binaries
sudo rm /usr/local/bin/oc
sudo rm /usr/local/bin/kubectl

# Remove configuration
rm -rf ~/.kube
rm -rf ~/.oc
```

### macOS
```bash
# Using Homebrew
brew uninstall openshift-cli

# Manual cleanup
sudo rm /usr/local/bin/oc
sudo rm /usr/local/bin/kubectl
rm -rf ~/.kube
rm -rf ~/.oc
```

### Windows
```powershell
# Using Chocolatey
choco uninstall openshift-cli

# Manual cleanup
Remove-Item "C:\path\to\oc.exe"
Remove-Item "$env:USERPROFILE\.kube" -Recurse
Remove-Item "$env:USERPROFILE\.oc" -Recurse
```

### Clean Up Configuration
```bash
# Remove cluster login
oc logout

# Remove kubeconfig entries
oc config delete-context my-context
oc config delete-cluster my-cluster
oc config delete-user my-user
``` 