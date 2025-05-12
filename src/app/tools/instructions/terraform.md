---
title: Terraform Installation Guide
description: Step-by-step guide to install HashiCorp Terraform
---

# Terraform Installation Guide

## Prerequisites
- 64-bit operating system
- Internet connectivity
- Administrator/sudo privileges

## Ubuntu/Debian

### 1. Install Required Dependencies
```bash
sudo apt-get update
sudo apt-get install -y gnupg software-properties-common curl
```

### 2. Add HashiCorp GPG Key
```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

### 3. Add HashiCorp Repository
```bash
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

### 4. Install Terraform
```bash
sudo apt-get update
sudo apt-get install -y terraform
```

### 5. Verify Installation
```bash
terraform --version
```

## CentOS/RHEL

### 1. Install Required Dependencies
```bash
sudo yum install -y yum-utils
```

### 2. Add HashiCorp Repository
```bash
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
```

### 3. Install Terraform
```bash
sudo yum install -y terraform
```

### 4. Verify Installation
```bash
terraform --version
```

## macOS

### 1. Install with Homebrew
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

### 2. Verify Installation
```bash
terraform --version
```

## Windows

### 1. Install with Chocolatey
```powershell
choco install terraform
```

### 2. Manual Installation
1. Download the latest version from [Terraform Downloads](https://www.terraform.io/downloads.html)
2. Extract the zip file
3. Add the terraform.exe location to your system's PATH

### 3. Verify Installation
```powershell
terraform --version
```

## Initial Configuration

### 1. Configure Auto-completion (Bash)
```bash
terraform -install-autocomplete
```

### 2. Initialize a New Project
```bash
# Create a new directory
mkdir terraform-project
cd terraform-project

# Create main configuration file
touch main.tf

# Initialize Terraform
terraform init
```

## Basic Usage

### 1. Create a Simple Configuration
Create `main.tf`:
```hcl
terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

resource "local_file" "example" {
  content  = "Hello, Terraform!"
  filename = "${path.module}/example.txt"
}
```

### 2. Common Terraform Commands
```bash
# Initialize working directory
terraform init

# Format configuration files
terraform fmt

# Validate configuration
terraform validate

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy resources
terraform destroy
```

## Environment Variables

### 1. Set Provider Credentials
```bash
# AWS credentials
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_REGION="us-west-2"

# Azure credentials
export ARM_SUBSCRIPTION_ID="your_subscription_id"
export ARM_TENANT_ID="your_tenant_id"
export ARM_CLIENT_ID="your_client_id"
export ARM_CLIENT_SECRET="your_client_secret"
```

## State Management

### 1. Configure Remote State (AWS S3 Example)
```hcl
terraform {
  backend "s3" {
    bucket = "terraform-state-bucket"
    key    = "terraform.tfstate"
    region = "us-west-2"
  }
}
```

### 2. State Commands
```bash
# Show current state
terraform show

# List resources in state
terraform state list

# Remove resource from state
terraform state rm resource.name
```

## Troubleshooting

### 1. Common Issues
```bash
# Clean up cached plugins and modules
rm -rf .terraform

# Re-initialize with debug output
TF_LOG=DEBUG terraform init

# Check provider requirements
terraform providers
```

### 2. Enable Debug Logging
```bash
export TF_LOG=DEBUG
export TF_LOG_PATH=terraform.log
```

### 3. Workspace Management
```bash
# List workspaces
terraform workspace list

# Create new workspace
terraform workspace new dev

# Switch workspace
terraform workspace select prod
``` 