---
title: HashiCorp Vagrant Installation Guide
description: Step-by-step guide to install and configure HashiCorp Vagrant for managing development environments
---

# HashiCorp Vagrant Installation Guide

## Prerequisites
- 64-bit operating system
- Virtualization software (VirtualBox, VMware, Hyper-V)
- 2GB RAM minimum
- Internet connection

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

### 3. Install Vagrant
```bash
# For Debian/Ubuntu
sudo apt-get update
sudo apt-get install vagrant

# For RHEL/CentOS
sudo yum install vagrant
```

### 4. Install VirtualBox
```bash
# For Debian/Ubuntu
sudo apt-get install virtualbox virtualbox-ext-pack

# For RHEL/CentOS
sudo yum install VirtualBox
```

## macOS

### 1. Using Homebrew
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Vagrant and VirtualBox
brew install --cask vagrant
brew install --cask virtualbox
```

### 2. Manual Installation
1. Download [Vagrant](https://www.vagrantup.com/downloads)
2. Download [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
3. Install both packages

## Windows

### 1. Using Chocolatey
```powershell
# Install Chocolatey if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Vagrant and VirtualBox
choco install vagrant virtualbox
```

### 2. Manual Installation
1. Download and install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Download and install [Vagrant](https://www.vagrantup.com/downloads)
3. Restart your computer

## Post-Installation Setup

### 1. Verify Installation
```bash
# Check Vagrant version
vagrant version

# Check VirtualBox version
vboxmanage --version
```

### 2. Configure Environment Variables
```bash
# Set Vagrant home directory
export VAGRANT_HOME="/path/to/vagrant/home"

# Set default provider
export VAGRANT_DEFAULT_PROVIDER="virtualbox"
```

### 3. Install Plugins
```bash
# Install common plugins
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-share
```

## Basic Usage

### 1. Initialize Project
```bash
# Create new project directory
mkdir my-vagrant-project
cd my-vagrant-project

# Initialize Vagrant environment
vagrant init hashicorp/bionic64
```

### 2. Basic Vagrantfile
```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = 2
  end
end
```

### 3. Common Commands
```bash
# Start VM
vagrant up

# SSH into VM
vagrant ssh

# Stop VM
vagrant halt

# Destroy VM
vagrant destroy
```

## Configuration

### 1. Network Configuration
```ruby
Vagrant.configure("2") do |config|
  # Private network
  config.vm.network "private_network", ip: "192.168.33.10"

  # Port forwarding
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Public network
  config.vm.network "public_network", bridge: "en0"
end
```

### 2. Provider Configuration
```ruby
Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |vb|
    # VM resources
    vb.memory = "2048"
    vb.cpus = 2

    # GUI settings
    vb.gui = true
    vb.name = "my-vm"
  end
end
```

### 3. Provisioning
```ruby
Vagrant.configure("2") do |config|
  # Shell provisioning
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
  SHELL

  # File provisioning
  config.vm.provision "file", source: "files/config.yml", destination: "/etc/app/config.yml"

  # Ansible provisioning
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end
```

## Common Operations

### 1. Box Management
```bash
# List boxes
vagrant box list

# Add box
vagrant box add ubuntu/focal64

# Remove box
vagrant box remove ubuntu/focal64

# Update box
vagrant box update
```

### 2. Snapshot Management
```bash
# Take snapshot
vagrant snapshot save my-snapshot

# List snapshots
vagrant snapshot list

# Restore snapshot
vagrant snapshot restore my-snapshot

# Delete snapshot
vagrant snapshot delete my-snapshot
```

### 3. Multi-Machine Setup
```ruby
Vagrant.configure("2") do |config|
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/focal64"
    web.vm.network "private_network", ip: "192.168.33.10"
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/focal64"
    db.vm.network "private_network", ip: "192.168.33.11"
  end
end
```

## Advanced Usage

### 1. Custom Box Creation
```bash
# Package current VM
vagrant package --output my-custom-box.box

# Add custom box
vagrant box add my-custom-box my-custom-box.box
```

### 2. Plugin Development
```ruby
# Example plugin
module VagrantPlugins
  class MyPlugin < Vagrant.plugin("2")
    name "my_plugin"

    command "my-command" do
      require_relative "command"
      Command
    end
  end
end
```

### 3. Vagrant Share
```bash
# Share environment
vagrant share

# Connect to shared environment
vagrant connect NAME
```

## Troubleshooting

### 1. Common Issues
```bash
# Check status
vagrant status

# View detailed logs
VAGRANT_LOG=debug vagrant up

# Validate Vagrantfile
vagrant validate
```

### 2. Network Issues
```bash
# Reset networking
vagrant reload

# Check port forwarding
vagrant port

# Test SSH connection
vagrant ssh -c "echo test"
```

### 3. Provider Issues
```bash
# Check VirtualBox status
VBoxManage list runningvms

# Reset VirtualBox network
VBoxManage hostonlyif remove vboxnet0
```

## Uninstallation Instructions

### Linux
```bash
# Remove Vagrant
sudo apt-get remove --purge vagrant  # Debian/Ubuntu
sudo yum remove vagrant             # RHEL/CentOS

# Remove VirtualBox
sudo apt-get remove --purge virtualbox*  # Debian/Ubuntu
sudo yum remove VirtualBox              # RHEL/CentOS

# Clean up
rm -rf ~/.vagrant.d
rm -rf VirtualBox\ VMs/
```

### macOS
```bash
# Using Homebrew
brew uninstall --cask vagrant
brew uninstall --cask virtualbox

# Manual cleanup
sudo rm -rf /opt/vagrant
sudo rm -rf /usr/local/bin/vagrant
rm -rf ~/.vagrant.d
rm -rf VirtualBox\ VMs/
```

### Windows
```powershell
# Using Chocolatey
choco uninstall vagrant virtualbox

# Manual cleanup
Remove-Item "C:\HashiCorp\Vagrant" -Recurse
Remove-Item "$env:USERPROFILE\.vagrant.d" -Recurse
Remove-Item "C:\Program Files\Oracle\VirtualBox" -Recurse
```

### Clean Up Boxes and VMs
```bash
# Remove all boxes
vagrant box remove --all

# Remove all VMs
VBoxManage list vms | cut -d'"' -f2 | xargs -I {} VBoxManage unregistervm {} --delete
``` 