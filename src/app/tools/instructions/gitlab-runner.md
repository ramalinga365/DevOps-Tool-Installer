---
title: GitLab Runner Installation Guide
description: Step-by-step guide to install and configure GitLab Runner for CI/CD pipelines
---

# GitLab Runner Installation Guide

## Linux

### 1. Add GitLab Runner Repository
```bash
# For Debian/Ubuntu
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash

# For RHEL/CentOS
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | sudo bash
```

### 2. Install GitLab Runner
```bash
# For Debian/Ubuntu
sudo apt-get install gitlab-runner

# For RHEL/CentOS
sudo yum install gitlab-runner
```

### 3. Register Runner
```bash
sudo gitlab-runner register
```
You will be prompted for:
- GitLab instance URL
- Registration token
- Runner description
- Tags
- Executor type

## Docker Installation

### 1. Pull GitLab Runner Image
```bash
docker pull gitlab/gitlab-runner
```

### 2. Create Configuration Volume
```bash
docker volume create gitlab-runner-config
```

### 3. Run GitLab Runner Container
```bash
docker run -d \
  --name gitlab-runner \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v gitlab-runner-config:/etc/gitlab-runner \
  gitlab/gitlab-runner
```

### 4. Register Runner in Container
```bash
docker run --rm -it \
  -v gitlab-runner-config:/etc/gitlab-runner \
  gitlab/gitlab-runner register
```

## Kubernetes Installation

### 1. Using Helm
```bash
# Add GitLab repository
helm repo add gitlab https://charts.gitlab.io
helm repo update

# Install GitLab Runner
helm install gitlab-runner gitlab/gitlab-runner \
  --set gitlabUrl=https://gitlab.example.com \
  --set runnerRegistrationToken="your-registration-token"
```

### 2. Using Manifests
```bash
# Create namespace
kubectl create namespace gitlab-runner

# Create secret with registration token
kubectl create secret generic gitlab-runner-secret \
  --from-literal=runner-registration-token="your-token" \
  --namespace gitlab-runner

# Apply runner configuration
kubectl apply -f gitlab-runner.yaml
```

## Configuration

### 1. Basic Configuration File
```toml
concurrent = 3
check_interval = 0

[[runners]]
  name = "my-runner"
  url = "https://gitlab.example.com"
  token = "your-token"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
```

### 2. Runner Configuration Options
```toml
[[runners]]
  # Common options
  name = "my-runner"
  url = "https://gitlab.example.com"
  token = "your-token"
  executor = "docker"
  
  # Docker executor options
  [runners.docker]
    image = "alpine:latest"
    privileged = false
    disable_cache = false
    volumes = ["/cache"]
    
  # Shell executor options
  [runners.shell]
    shell = "bash"
    
  # Custom environment variables
  environment = ["ENV=value", "LC_ALL=en_US.UTF-8"]
```

### 3. Cache Configuration
```toml
[[runners]]
  [runners.cache]
    Type = "s3"
    Path = "path/to/cache"
    Shared = false
    [runners.cache.s3]
      ServerAddress = "s3.amazonaws.com"
      AccessKey = "AWS_ACCESS_KEY"
      SecretKey = "AWS_SECRET_KEY"
      BucketName = "runners-cache"
      BucketLocation = "eu-west-1"
```

## Common Operations

### 1. Service Management
```bash
# Start GitLab Runner
sudo systemctl start gitlab-runner

# Stop GitLab Runner
sudo systemctl stop gitlab-runner

# Restart GitLab Runner
sudo systemctl restart gitlab-runner

# Check status
sudo systemctl status gitlab-runner
```

### 2. Runner Management
```bash
# List all runners
sudo gitlab-runner list

# Verify runner status
sudo gitlab-runner verify

# Unregister a runner
sudo gitlab-runner unregister --name "my-runner"

# Unregister all runners
sudo gitlab-runner unregister --all-runners
```

### 3. Runner Maintenance
```bash
# Clear docker cache
sudo gitlab-runner cache-clear

# Reset runner configuration
sudo gitlab-runner reset-token

# Update runner configuration
sudo gitlab-runner config --template-config /path/to/template
```

### 4. Troubleshooting
```bash
# Check runner logs
sudo gitlab-runner --debug run

# Verify system requirements
sudo gitlab-runner verify --delete

# Check runner configuration
sudo gitlab-runner config list
```

## Security Considerations

### 1. Runner Token Security
- Store registration tokens securely
- Use different tokens for different environments
- Rotate tokens periodically

### 2. Docker Security
```toml
[[runners]]
  [runners.docker]
    privileged = false
    disable_cache = true
    volumes = ["/builds:/builds:rw"]
    allowed_images = ["ruby:*", "python:*", "node:*"]
    allowed_services = ["postgres:*", "redis:*"]
```

### 3. Network Security
```toml
[[runners]]
  [runners.docker]
    dns = ["8.8.8.8"]
    extra_hosts = ["domain.com:1.2.3.4"]
    network_mode = "host"
```

## Uninstallation Instructions

### Linux
```bash
# Stop and unregister runners
sudo gitlab-runner unregister --all-runners
sudo systemctl stop gitlab-runner
sudo systemctl disable gitlab-runner

# Remove package
sudo apt-get remove --purge gitlab-runner  # Debian/Ubuntu
sudo yum remove gitlab-runner             # RHEL/CentOS

# Clean up configuration
sudo rm -rf /etc/gitlab-runner
sudo userdel gitlab-runner
```

### Docker
```bash
# Stop and remove container
docker stop gitlab-runner
docker rm gitlab-runner

# Remove image
docker rmi gitlab/gitlab-runner

# Remove configuration volume
docker volume rm gitlab-runner-config
```

### Kubernetes (Helm)
```bash
# Uninstall runner
helm uninstall gitlab-runner

# Clean up namespace
kubectl delete namespace gitlab-runner
```

### Kubernetes (Manifests)
```bash
# Remove runner resources
kubectl delete -f gitlab-runner.yaml
kubectl delete secret gitlab-runner-secret -n gitlab-runner
kubectl delete namespace gitlab-runner
``` 