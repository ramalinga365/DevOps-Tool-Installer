---
title: Grafana Installation Guide
description: Step-by-step guide to install Grafana visualization platform
---

# Grafana Installation Guide

## Linux

### 1. Install Dependencies
```bash
sudo apt-get install -y apt-transport-https software-properties-common
```

### 2. Add Grafana Repository
```bash
# Add GPG key
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

# Add repository
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

### 3. Install Grafana
```bash
sudo apt-get update
sudo apt-get install -y grafana
```

### 4. Start Grafana Service
```bash
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

## Docker Installation

### 1. Pull Grafana Image
```bash
docker pull grafana/grafana
```

### 2. Create Persistent Storage
```bash
mkdir -p grafana-data
```

### 3. Run Grafana Container
```bash
docker run -d \
  --name=grafana \
  -p 3000:3000 \
  -v $(pwd)/grafana-data:/var/lib/grafana \
  grafana/grafana
```

## Kubernetes Installation

### 1. Using Helm
```bash
# Add Grafana repository
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Grafana
helm install grafana grafana/grafana
```

### 2. Using Manifests
```bash
# Create namespace
kubectl create namespace monitoring

# Create config map
kubectl create configmap grafana-config \
  --from-file=grafana.ini \
  -n monitoring

# Apply deployment
kubectl apply -f grafana-deployment.yaml
```

## Post-Installation Setup

### 1. Access Web Interface
Open your web browser and navigate to:
```
http://localhost:3000
```
Default credentials:
- Username: admin
- Password: admin

### 2. Change Default Password
1. Log in with default credentials
2. You will be prompted to change the password
3. Set a secure password

### 3. Add Data Sources
1. Click on Configuration (gear icon)
2. Select "Data Sources"
3. Click "Add data source"
4. Common data sources:
   - Prometheus
   - Elasticsearch
   - MySQL
   - PostgreSQL

### 4. Import Dashboards
1. Click the "+" icon
2. Select "Import"
3. Enter dashboard ID or upload JSON file
4. Popular dashboard IDs:
   - Node Exporter: 1860
   - Kubernetes: 315
   - Docker: 193

## Configuration

### 1. Basic Configuration File
```ini
[server]
http_port = 3000
domain = localhost

[security]
admin_user = admin
admin_password = admin

[auth.anonymous]
enabled = false

[analytics]
reporting_enabled = false
```

### 2. Environment Variables
```bash
# Server settings
export GF_SERVER_HTTP_PORT=3000
export GF_SERVER_DOMAIN=your-domain.com

# Security settings
export GF_SECURITY_ADMIN_USER=admin
export GF_SECURITY_ADMIN_PASSWORD=secure-password

# Database settings
export GF_DATABASE_TYPE=mysql
export GF_DATABASE_HOST=localhost:3306
```

### 3. SMTP Configuration
```ini
[smtp]
enabled = true
host = smtp.gmail.com:587
user = your-email@gmail.com
password = your-app-specific-password
from_address = your-email@gmail.com
```

## Common Operations

### 1. Service Management
```bash
# Start Grafana
sudo systemctl start grafana-server

# Stop Grafana
sudo systemctl stop grafana-server

# Restart Grafana
sudo systemctl restart grafana-server

# Check status
sudo systemctl status grafana-server
```

### 2. Backup and Restore

#### Backup
```bash
# Backup configuration
sudo cp /etc/grafana/grafana.ini /backup/grafana.ini

# Backup database (SQLite)
sudo cp /var/lib/grafana/grafana.db /backup/grafana.db

# Backup dashboards
curl -H "Authorization: Bearer your-api-key" \
  http://localhost:3000/api/dashboards/uid/your-dashboard-uid > dashboard-backup.json
```

#### Restore
```bash
# Restore configuration
sudo cp /backup/grafana.ini /etc/grafana/grafana.ini

# Restore database
sudo cp /backup/grafana.db /var/lib/grafana/grafana.db

# Restore dashboard
curl -X POST \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d @dashboard-backup.json \
  http://localhost:3000/api/dashboards/db
```

### 3. Plugin Management
```bash
# List installed plugins
grafana-cli plugins ls

# Install plugin
grafana-cli plugins install grafana-clock-panel

# Update plugin
grafana-cli plugins update grafana-clock-panel

# Remove plugin
grafana-cli plugins remove grafana-clock-panel
```

## Uninstallation Instructions

### Linux
```bash
# Stop and disable service
sudo systemctl stop grafana-server
sudo systemctl disable grafana-server

# Remove package
sudo apt-get remove --purge grafana

# Remove data and configuration
sudo rm -rf /etc/grafana
sudo rm -rf /var/lib/grafana
```

### Docker
```bash
# Stop and remove container
docker stop grafana
docker rm grafana

# Remove image
docker rmi grafana/grafana

# Clean up data
rm -rf grafana-data
```

### Kubernetes (Helm)
```bash
helm uninstall grafana
```

### Kubernetes (Manifests)
```bash
kubectl delete -f grafana-deployment.yaml
kubectl delete configmap grafana-config -n monitoring
kubectl delete namespace monitoring
``` 