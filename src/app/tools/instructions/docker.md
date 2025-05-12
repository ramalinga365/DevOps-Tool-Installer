---
title: Docker Installation Guide
description: Step-by-step guide to install Docker on various operating systems
---

# Docker Installation Guide

## Ubuntu/Debian

### 1. Update Package Index
```bash
sudo apt-get update
```

### 2. Install Required Dependencies
```bash
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### 3. Add Docker's Official GPG Key
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 4. Set up the Repository
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 5. Install Docker Engine
```bash
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

### 6. Verify Installation
```bash
sudo docker run hello-world
```

### 7. (Optional) Add User to Docker Group
```bash
sudo usermod -aG docker $USER
newgrp docker
```

## CentOS/RHEL

### 1. Remove Old Versions
```bash
sudo yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

### 2. Set up the Repository
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### 3. Install Docker Engine
```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

### 4. Start and Enable Docker
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 5. Verify Installation
```bash
sudo docker run hello-world
```

## macOS

### 1. Download Docker Desktop
Visit [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop) and download the installer.

### 2. Install Docker Desktop
Double-click the downloaded `.dmg` file and drag Docker to your Applications folder.

### 3. Start Docker Desktop
Open Docker from your Applications folder.

### 4. Verify Installation
```bash
docker run hello-world
```

## Windows

### 1. System Requirements
- Windows 10/11 Pro, Enterprise, or Education
- Enable Hyper-V and Windows Subsystem for Linux 2 (WSL2)

### 2. Install WSL2
```powershell
wsl --install
```

### 3. Download Docker Desktop
Visit [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) and download the installer.

### 4. Install Docker Desktop
Run the downloaded installer and follow the installation wizard.

### 5. Start Docker Desktop
Launch Docker Desktop from the Start menu.

### 6. Verify Installation
```powershell
docker run hello-world
```

## Post-Installation Steps

### 1. Test Docker Commands
```bash
docker --version
docker info
```

### 2. Run a Test Container
```bash
docker run -d -p 80:80 nginx
```

### 3. Basic Docker Commands
```bash
# List containers
docker ps

# List images
docker images

# Pull an image
docker pull ubuntu

# Stop a container
docker stop container_id

# Remove a container
docker rm container_id
```

## Uninstallation Instructions

### Linux

1. Remove Docker packages:
```bash
sudo apt-get purge -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

2. Remove Docker data directory:
```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

### Windows

1. Open Windows Settings
2. Go to Apps > Apps & features
3. Search for "Docker Desktop"
4. Click on Docker Desktop and select "Uninstall"
5. Follow the uninstallation wizard 