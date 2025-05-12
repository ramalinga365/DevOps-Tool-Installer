---
title: HashiCorp Packer Installation Guide
description: Step-by-step guide to install and configure HashiCorp Packer for automated machine image creation
---

# HashiCorp Packer Installation Guide

## Prerequisites
- 64-bit operating system
- Internet connection
- Cloud provider credentials (optional)
- Virtualization software (optional)

## Linux

### 1. Add HashiCorp GPG Key
```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

### 2. Add HashiCorp Repository
```bash
# For Debian/Ubuntu
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

# For RHEL/CentOS
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
```

### 3. Install Packer
```bash
# For Debian/Ubuntu
sudo apt-get update
sudo apt-get install packer

# For RHEL/CentOS
sudo yum install packer
```

### 4. Verify Installation
```bash
packer version
```

## macOS

### 1. Using Homebrew
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Packer
brew tap hashicorp/tap
brew install hashicorp/tap/packer
```

### 2. Manual Installation
```bash
# Download latest version
curl -LO "https://releases.hashicorp.com/packer/$(curl -s https://checkpoint-api.hashicorp.com/v1/check/packer | jq -r .current_version)/packer_$(curl -s https://checkpoint-api.hashicorp.com/v1/check/packer | jq -r .current_version)_darwin_amd64.zip"

# Extract binary
unzip packer_*_darwin_amd64.zip

# Move to system path
sudo mv packer /usr/local/bin/
```

## Windows

### 1. Using Chocolatey
```powershell
# Install Chocolatey if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Packer
choco install packer
```

### 2. Manual Installation
1. Download the [Packer ZIP file](https://www.packer.io/downloads)
2. Extract the ZIP file
3. Add the Packer directory to your system's PATH

## Post-Installation Setup

### 1. Configure Environment Variables
```bash
# Set Packer log level
export PACKER_LOG=1
export PACKER_LOG_PATH="packer.log"

# Configure plugin directory
export PACKER_PLUGIN_PATH="$HOME/.packer.d/plugins"
```

### 2. Configure Cloud Credentials
```bash
# AWS credentials
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-west-2"

# Azure credentials
export ARM_SUBSCRIPTION_ID="your-subscription-id"
export ARM_CLIENT_ID="your-client-id"
export ARM_CLIENT_SECRET="your-client-secret"
export ARM_TENANT_ID="your-tenant-id"
```

### 3. Initialize Plugins
```bash
# Initialize Packer configuration
packer init .

# Install specific plugin
packer plugins install github.com/hashicorp/amazon
```

## Basic Configuration

### 1. Create Basic Template
```hcl
# example.pkr.hcl
source "amazon-ebs" "example" {
  ami_name      = "my-custom-ami"
  instance_type = "t2.micro"
  region        = "us-west-2"
  source_ami_filter {
    filters = {
      virtualization-type = "hvm"
      name               = "ubuntu/images/*ubuntu-focal-20.04-amd64-server-*"
      root-device-type   = "ebs"
    }
    owners      = ["099720109477"]
    most_recent = true
  }
  ssh_username = "ubuntu"
}

build {
  sources = ["source.amazon-ebs.example"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y nginx"
    ]
  }
}
```

### 2. Validate Template
```bash
# Validate configuration
packer validate example.pkr.hcl

# Format configuration
packer fmt example.pkr.hcl
```

## Common Operations

### 1. Building Images
```bash
# Build image
packer build example.pkr.hcl

# Build specific target
packer build -only=amazon-ebs.example example.pkr.hcl

# Build with variables
packer build -var 'aws_region=us-east-1' example.pkr.hcl
```

### 2. Debugging Builds
```bash
# Enable debug mode
packer build -debug example.pkr.hcl

# View build logs
PACKER_LOG=1 packer build example.pkr.hcl
```

### 3. Managing Variables
```bash
# Using var file
packer build -var-file="vars.pkrvars.hcl" example.pkr.hcl

# Using environment variables
export PKR_VAR_aws_region="us-east-1"
packer build example.pkr.hcl
```

## Advanced Usage

### 1. Multi-Platform Builds
```hcl
source "amazon-ebs" "ubuntu" {
  // Amazon EBS configuration
}

source "virtualbox-iso" "ubuntu" {
  // VirtualBox configuration
}

build {
  sources = [
    "source.amazon-ebs.ubuntu",
    "source.virtualbox-iso.ubuntu"
  ]
}
```

### 2. Post-Processors
```hcl
build {
  sources = ["source.amazon-ebs.example"]

  post-processor "manifest" {
    output = "manifest.json"
    strip_path = true
  }

  post-processor "amazon-import" {
    license_type = "BYOL"
    region       = "us-east-1"
    s3_bucket_name = "my-bucket"
  }
}
```

### 3. Custom Scripts
```hcl
build {
  sources = ["source.amazon-ebs.example"]

  provisioner "file" {
    source      = "scripts/"
    destination = "/tmp/"
  }

  provisioner "shell" {
    script = "scripts/setup.sh"
  }
}
```

## Troubleshooting

### 1. Common Issues
```bash
# Check Packer version
packer version

# Verify template syntax
packer validate -syntax-only example.pkr.hcl

# Check plugin status
packer plugins installed
```

### 2. Debug Logging
```bash
# Enable detailed logging
export PACKER_LOG=1
export PACKER_LOG_PATH="debug.log"

# Run build with logging
packer build example.pkr.hcl
```

### 3. Network Issues
```bash
# Test AWS connectivity
packer build -debug aws-example.pkr.hcl

# Test Azure connectivity
packer build -debug azure-example.pkr.hcl
```

## Uninstallation Instructions

### Linux
```bash
# Remove package
sudo apt-get remove --purge packer  # Debian/Ubuntu
sudo yum remove packer             # RHEL/CentOS

# Remove repository
sudo rm /etc/apt/sources.list.d/hashicorp.list
sudo rm /usr/share/keyrings/hashicorp-archive-keyring.gpg

# Clean up configuration
rm -rf ~/.packer.d
```

### macOS
```bash
# Using Homebrew
brew uninstall hashicorp/tap/packer

# Manual cleanup
sudo rm /usr/local/bin/packer
rm -rf ~/.packer.d
```

### Windows
```powershell
# Using Chocolatey
choco uninstall packer

# Manual cleanup
Remove-Item "C:\path\to\packer.exe"
Remove-Item "$env:USERPROFILE\.packer.d" -Recurse
```

### Clean Up Plugins
```bash
# Remove plugin directory
rm -rf ~/.packer.d/plugins

# Remove cached files
rm -rf ~/.packer.d/checkpoint_cache
``` 