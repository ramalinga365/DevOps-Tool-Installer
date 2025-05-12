---
title: Ansible Installation Guide
description: Step-by-step guide to install Ansible automation tool
---

# Ansible Installation Guide

## Prerequisites
- Python 2.7 or Python 3.5+
- pip (Python package manager)
- Access to terminal/command line
- sudo/administrator privileges

## Ubuntu/Debian

### 1. Update Package Index
```bash
sudo apt-get update
```

### 2. Install Required Dependencies
```bash
sudo apt-get install -y python3-pip
```

### 3. Install Ansible
```bash
sudo apt-get install -y ansible
```

### Alternative Installation using pip
```bash
python3 -m pip install --user ansible
```

### 4. Verify Installation
```bash
ansible --version
```

## CentOS/RHEL

### 1. Install EPEL Repository
```bash
sudo dnf install -y epel-release
```

### 2. Install Ansible
```bash
sudo dnf install -y ansible
```

### 3. Verify Installation
```bash
ansible --version
```

## macOS

### 1. Install Homebrew (if not installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Ansible
```bash
brew install ansible
```

### 3. Verify Installation
```bash
ansible --version
```

## Windows (WSL)

### 1. Install WSL
```powershell
wsl --install
```

### 2. Install Ubuntu on WSL
- Open Microsoft Store
- Search for Ubuntu
- Click Install

### 3. Install Ansible in WSL
```bash
sudo apt-get update
sudo apt-get install -y ansible
```

## Initial Configuration

### 1. Create Inventory File
```bash
sudo mkdir -p /etc/ansible
sudo nano /etc/ansible/hosts
```

Add the following content:
```ini
[servers]
server1 ansible_host=192.168.1.10
server2 ansible_host=192.168.1.11

[all:vars]
ansible_python_interpreter=/usr/bin/python3
```

### 2. Test Connection
```bash
ansible all -m ping
```

## Basic Usage

### 1. Run Ad-hoc Commands
```bash
# Check uptime of all servers
ansible all -a "uptime"

# Check disk space
ansible all -a "df -h"
```

### 2. Create a Simple Playbook
Create a file named `test.yml`:
```yaml
---
- name: Test Playbook
  hosts: all
  tasks:
    - name: Ensure nginx is installed
      apt:
        name: nginx
        state: present
      become: yes
```

Run the playbook:
```bash
ansible-playbook test.yml
```

### 3. Common Ansible Commands
```bash
# List all hosts
ansible all --list-hosts

# Gather facts about hosts
ansible all -m setup

# Check syntax of a playbook
ansible-playbook --syntax-check playbook.yml
```

## Configuration Files

### 1. ansible.cfg
Create or edit `/etc/ansible/ansible.cfg`:
```ini
[defaults]
inventory = /etc/ansible/hosts
remote_user = your_username
host_key_checking = False
```

### 2. SSH Key Setup
```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096

# Copy key to remote servers
ssh-copy-id username@remote_host
```

## Troubleshooting

### 1. Check Connectivity
```bash
# Test SSH connection
ssh username@remote_host

# Test Ansible connection with verbose output
ansible all -m ping -vvv
```

### 2. Common Issues
```bash
# Fix Python interpreter issues
ansible all -m ping -e 'ansible_python_interpreter=/usr/bin/python3'

# Fix permission issues
chmod 400 ~/.ssh/id_rsa
```

### 3. Debug Mode
```bash
# Enable debug mode
export ANSIBLE_DEBUG=1
ansible-playbook playbook.yml

# Check for syntax errors
ansible-playbook --syntax-check playbook.yml
```

## Getting Started

1. Create inventory file (hosts):
```ini
# /etc/ansible/hosts or ./inventory
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[dbservers]
db1 ansible_host=192.168.1.20
```

2. Test connection:
```bash
ansible all -m ping
```

3. Create a simple playbook (example.yml):
```yaml
---
- name: Update web servers
  hosts: webservers
  become: yes
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes

    - name: Upgrade all packages
      apt:
        upgrade: yes
```

4. Run playbook:
```bash
ansible-playbook example.yml
```

## Common Commands

```bash
# Test connection to hosts
ansible all -m ping

# Run ad-hoc command
ansible webservers -a "uptime"

# Run playbook
ansible-playbook playbook.yml

# List hosts
ansible all --list-hosts

# Gather facts
ansible all -m setup

# Check playbook syntax
ansible-playbook playbook.yml --syntax-check

# Dry run (check mode)
ansible-playbook playbook.yml --check
```

## Configuration

1. Create ansible.cfg in your project directory:
```ini
[defaults]
inventory = ./inventory
remote_user = your_ssh_user
private_key_file = ~/.ssh/id_rsa
host_key_checking = False

[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False
```

## Best Practices

1. Directory Structure:
```
project/
├── inventory/
│   ├── production
│   └── staging
├── group_vars/
│   └── all.yml
├── roles/
│   └── common/
├── ansible.cfg
└── site.yml
```

2. Use Roles:
```yaml
# roles/common/tasks/main.yml
---
- name: Install common packages
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - vim
    - curl
    - git
```

## Uninstallation Instructions

### Linux

1. Remove Ansible:
```bash
python3 -m pip uninstall ansible
```

2. Remove configuration files:
```bash
rm -rf ~/.ansible
sudo rm -rf /etc/ansible
```

3. Remove PATH addition from ~/.bashrc:
```bash
# Edit ~/.bashrc and remove the line:
# export PATH="$HOME/.local/bin:$PATH"
```

### Note for Windows Users

While Windows cannot be used as a control node, you can:
- Use Windows Subsystem for Linux (WSL)
- Use a Linux virtual machine
- Use Docker with an Ansible container 