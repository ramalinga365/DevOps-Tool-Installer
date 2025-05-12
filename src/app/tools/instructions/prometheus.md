---
title: Prometheus Installation Guide
description: Step-by-step guide to install Prometheus monitoring system
---

# Prometheus Installation Guide

## Linux

### 1. Create Prometheus User
```bash
sudo groupadd --system prometheus
sudo useradd -s /sbin/nologin --system -g prometheus prometheus
```

### 2. Create Directories
```bash
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```

### 3. Download Prometheus
```bash
PROMETHEUS_VERSION="2.45.0"
wget https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz
```

### 4. Extract and Install
```bash
tar xvf prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz
cd prometheus-${PROMETHEUS_VERSION}.linux-amd64
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
sudo cp -r consoles/ /etc/prometheus
sudo cp -r console_libraries/ /etc/prometheus
```

### 5. Configure Prometheus
```bash
sudo tee /etc/prometheus/prometheus.yml <<EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
EOF

sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml
```

### 6. Create Systemd Service
```bash
sudo tee /etc/systemd/system/prometheus.service <<EOF
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
EOF
```

### 7. Start Prometheus Service
```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

## Docker Installation

### 1. Pull Prometheus Image
```bash
docker pull prom/prometheus
```

### 2. Create Configuration
```bash
mkdir prometheus-data
cat > prometheus-data/prometheus.yml <<EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
EOF
```

### 3. Run Prometheus Container
```bash
docker run -d \
    --name prometheus \
    -p 9090:9090 \
    -v $(pwd)/prometheus-data:/etc/prometheus \
    prom/prometheus
```

## Kubernetes Installation

### 1. Using Helm
```bash
# Add Prometheus repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/prometheus
```

### 2. Using Manifests
```bash
# Clone kube-prometheus
git clone https://github.com/prometheus-operator/kube-prometheus.git
cd kube-prometheus

# Apply manifests
kubectl apply --server-side -f manifests/setup
kubectl wait \
    --for condition=Established \
    --all CustomResourceDefinition \
    --namespace=monitoring
kubectl apply -f manifests/
```

## Post-Installation Setup

### 1. Verify Installation
```bash
# For native installation
curl localhost:9090/-/healthy

# For Kubernetes
kubectl get pods -n monitoring
```

### 2. Access Web Interface
Open your web browser and navigate to:
```
http://localhost:9090
```

### 3. Basic Configuration

#### Add Job Target
```yaml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

#### Add Alert Rules
```yaml
rule_files:
  - 'alert.rules'

alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - localhost:9093
```

## Common Operations

### 1. Service Management
```bash
# Start Prometheus
sudo systemctl start prometheus

# Stop Prometheus
sudo systemctl stop prometheus

# Restart Prometheus
sudo systemctl restart prometheus

# Check status
sudo systemctl status prometheus
```

### 2. Query Examples
```bash
# Basic query
rate(prometheus_http_requests_total[5m])

# Alert query
sum(rate(node_cpu_seconds_total{mode="idle"}[2m])) by (instance)

# Range query
http_requests_total{job="api-server"}[5m]
```

### 3. Configuration Reload
```bash
# Using systemctl
sudo systemctl reload prometheus

# Using HTTP API
curl -X POST http://localhost:9090/-/reload

# Using process signal
kill -HUP $(pgrep prometheus)
```

## Uninstallation Instructions

### Linux
```bash
# Stop and disable service
sudo systemctl stop prometheus
sudo systemctl disable prometheus

# Remove files
sudo rm -rf /etc/prometheus
sudo rm -rf /var/lib/prometheus
sudo rm /usr/local/bin/prometheus
sudo rm /usr/local/bin/promtool
sudo rm /etc/systemd/system/prometheus.service

# Remove user and group
sudo userdel prometheus
sudo groupdel prometheus
```

### Docker
```bash
# Stop and remove container
docker stop prometheus
docker rm prometheus

# Remove image
docker rmi prom/prometheus

# Clean up data
rm -rf prometheus-data
```

### Kubernetes (Helm)
```bash
helm uninstall prometheus
```

### Kubernetes (Manifests)
```bash
kubectl delete -f manifests/
kubectl delete -f manifests/setup
``` 