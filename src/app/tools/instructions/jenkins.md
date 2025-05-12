---
title: Jenkins Installation Guide
description: Step-by-step guide to install Jenkins on various operating systems
---

# Jenkins Installation Guide

## Ubuntu/Debian

### 1. Install Java
```bash
sudo apt update
sudo apt install -y openjdk-11-jdk
```

### 2. Add Jenkins Repository Key
```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
```

### 3. Add Jenkins Repository
```bash
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
```

### 4. Install Jenkins
```bash
sudo apt update
sudo apt install -y jenkins
```

### 5. Start Jenkins Service
```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 6. Get Initial Admin Password
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## CentOS/RHEL

### 1. Install Java
```bash
sudo dnf install -y java-11-openjdk-devel
```

### 2. Add Jenkins Repository
```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
```

### 3. Install Jenkins
```bash
sudo dnf install -y jenkins
```

### 4. Start Jenkins Service
```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 5. Configure Firewall
```bash
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
```

## Windows

### 1. Install Java
1. Download OpenJDK 11 from [AdoptOpenJDK](https://adoptium.net/)
2. Run the installer and follow the wizard
3. Add Java to System Environment Variables

### 2. Download Jenkins
1. Visit [Jenkins Download Page](https://www.jenkins.io/download/)
2. Download the Windows installer (.msi file)

### 3. Install Jenkins
1. Run the downloaded .msi file
2. Follow the installation wizard
3. Jenkins will install as a Windows Service

## macOS

### 1. Install Java
```bash
brew install openjdk@11
```

### 2. Install Jenkins
```bash
brew install jenkins-lts
```

### 3. Start Jenkins Service
```bash
brew services start jenkins-lts
```

## Post-Installation Setup

### 1. Access Jenkins
Open your web browser and navigate to:
```
http://localhost:8080
```

### 2. Initial Setup
1. Enter the initial admin password from:
   - Linux: `/var/lib/jenkins/secrets/initialAdminPassword`
   - Windows: `C:\Program Files\Jenkins\secrets\initialAdminPassword`
   - macOS: `~/.jenkins/secrets/initialAdminPassword`
2. Install suggested plugins
3. Create first admin user
4. Configure Jenkins URL

### 3. Basic Configuration
1. Configure System
2. Configure Global Security
3. Configure Backup Settings
4. Install Additional Plugins

## Common Operations

### 1. Start/Stop Jenkins
```bash
# Linux
sudo systemctl start jenkins
sudo systemctl stop jenkins

# macOS
brew services start jenkins-lts
brew services stop jenkins-lts

# Windows (PowerShell as Admin)
Start-Service Jenkins
Stop-Service Jenkins
```

### 2. Check Jenkins Status
```bash
# Linux
sudo systemctl status jenkins

# macOS
brew services list | grep jenkins

# Windows (PowerShell)
Get-Service Jenkins
```

### 3. View Jenkins Logs
```bash
# Linux
sudo journalctl -u jenkins

# Windows
Get-Content "C:\Program Files\Jenkins\jenkins.out.log"
```

## Uninstallation Instructions

### Linux (Ubuntu/Debian)
```bash
sudo systemctl stop jenkins
sudo apt-get remove --purge jenkins
sudo rm -rf /var/lib/jenkins
```

### Linux (CentOS/RHEL)
```bash
sudo systemctl stop jenkins
sudo dnf remove jenkins
sudo rm -rf /var/lib/jenkins
```

### Windows
1. Open Control Panel
2. Go to Programs and Features
3. Select Jenkins
4. Click Uninstall
5. Delete the Jenkins directory (usually `C:\Program Files\Jenkins`)

### macOS
```bash
brew services stop jenkins-lts
brew uninstall jenkins-lts
rm -rf ~/.jenkins
``` 