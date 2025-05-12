---
title: Kubernetes Installation Guide
description: Step-by-step guide to install Kubernetes and its components
---

# Kubernetes Installation Guide

## Prerequisites

Before installing Kubernetes, ensure you have:
- Docker installed and running
- At least 2 CPUs
- At least 2GB of RAM
- Internet connectivity
- sudo privileges

## Ubuntu/Debian

### 1. Update Package Index
```bash
sudo apt-get update
```

### 2. Install Required Dependencies
```bash
sudo apt-get install -y apt-transport-https ca-certificates curl
```

### 3. Add Kubernetes GPG Key
```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/kubernetes-archive-keyring.gpg
```

### 4. Add Kubernetes Repository
```bash
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

### 5. Install Kubernetes Components
```bash
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

### 6. Disable Swap
```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### 7. Initialize Kubernetes Cluster (Master Node Only)
```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16
```

### 8. Set Up kubectl Configuration (Master Node Only)
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 9. Install Network Plugin (Calico) (Master Node Only)
```bash
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
```

## CentOS/RHEL

### 1. Configure Repository
```bash
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-\$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF
```

### 2. Set SELinux to Permissive Mode
```bash
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```

### 3. Install Kubernetes Components
```bash
sudo yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes
sudo systemctl enable --now kubelet
```

## Worker Node Setup

### 1. Join Worker Node to Cluster
```bash
# Run the join command provided by kubeadm init on master node
sudo kubeadm join <master-ip>:<master-port> --token <token> --discovery-token-ca-cert-hash <hash>
```

## Verify Installation

### 1. Check Node Status
```bash
kubectl get nodes
```

### 2. Check System Pods
```bash
kubectl get pods --all-namespaces
```

## Common Operations

### 1. Create a Test Deployment
```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
```

### 2. View Kubernetes Resources
```bash
# List all pods
kubectl get pods

# List all services
kubectl get services

# List all deployments
kubectl get deployments

# Get detailed information
kubectl describe pod <pod-name>
```

### 3. Access Kubernetes Dashboard (Optional)
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl proxy
```

### 4. Generate New Join Token
```bash
# On master node
kubeadm token create --print-join-command
```

## Troubleshooting

### 1. Check Component Status
```bash
kubectl get componentstatuses
```

### 2. View System Logs
```bash
# View kubelet logs
sudo journalctl -u kubelet

# View pod logs
kubectl logs <pod-name>
```

### 3. Reset Cluster
```bash
# Only if needed to start over
sudo kubeadm reset
``` 