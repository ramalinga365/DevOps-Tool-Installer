---
title: HashiCorp Consul Installation Guide
description: Step-by-step guide to install and configure HashiCorp Consul for service discovery and configuration
---

# HashiCorp Consul Installation Guide

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

### 3. Install Consul
```bash
# For Debian/Ubuntu
sudo apt-get update
sudo apt-get install consul

# For RHEL/CentOS
sudo yum install consul
```

### 4. Create Server Configuration
```bash
sudo mkdir -p /etc/consul.d
sudo tee /etc/consul.d/config.hcl <<EOF
datacenter = "dc1"
data_dir = "/opt/consul"
client_addr = "0.0.0.0"
ui_config{
  enabled = true
}

server = true
bootstrap_expect = 1
bind_addr = "0.0.0.0"
EOF
```

### 5. Create Systemd Service
```bash
sudo tee /etc/systemd/system/consul.service <<EOF
[Unit]
Description=HashiCorp Consul
Documentation=https://www.consul.io/docs/
Requires=network-online.target
After=network-online.target

[Service]
Type=simple
User=consul
Group=consul
ExecStart=/usr/bin/consul agent -config-dir=/etc/consul.d/
ExecReload=/bin/kill -HUP \$MAINPID
KillMode=process
KillSignal=SIGINT
Restart=on-failure
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
```

### 6. Start Consul Service
```bash
sudo systemctl daemon-reload
sudo systemctl start consul
sudo systemctl enable consul
```

## Docker Installation

### 1. Pull Consul Image
```bash
docker pull hashicorp/consul
```

### 2. Create Configuration Directory
```bash
mkdir -p consul/config
mkdir -p consul/data
```

### 3. Create Configuration File
```bash
cat > consul/config/config.hcl <<EOF
datacenter = "dc1"
data_dir = "/consul/data"
client_addr = "0.0.0.0"
ui_config{
  enabled = true
}

server = true
bootstrap_expect = 1
bind_addr = "0.0.0.0"
EOF
```

### 4. Run Consul Container
```bash
docker run -d \
  --name consul \
  -p 8500:8500 \
  -p 8600:8600/udp \
  -v $(pwd)/consul/config:/consul/config \
  -v $(pwd)/consul/data:/consul/data \
  hashicorp/consul agent -config-dir=/consul/config
```

## Kubernetes Installation

### 1. Using Helm
```bash
# Add HashiCorp repository
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

# Install Consul
helm install consul hashicorp/consul \
  --set global.name=consul \
  --create-namespace \
  --namespace consul
```

### 2. Using Manifests
```bash
# Create namespace
kubectl create namespace consul

# Create config map
kubectl create configmap consul-config \
  --from-file=config.hcl \
  -n consul

# Apply Consul deployment
kubectl apply -f consul.yaml
```

## Post-Installation Setup

### 1. Verify Installation
```bash
# Check Consul status
consul members

# Check service health
curl localhost:8500/v1/health/service/consul
```

### 2. Configure ACL System
```bash
# Bootstrap ACL system
consul acl bootstrap

# Create policy
consul acl policy create -name "read-only" \
  -description "Read-only access" \
  -rules @read-only.hcl

# Create token
consul acl token create \
  -description "Read-only token" \
  -policy-name "read-only"
```

### 3. Join Consul Cluster
```bash
# Join existing cluster
consul join <existing-node-ip>

# Force leave node
consul force-leave <node-name>
```

## Configuration

### 1. Basic Configuration
```hcl
datacenter = "dc1"
data_dir = "/opt/consul"
encrypt = "your-encryption-key"
verify_incoming = true
verify_outgoing = true
verify_server_hostname = true

acl = {
  enabled = true
  default_policy = "deny"
  enable_token_persistence = true
}

performance {
  raft_multiplier = 1
}
```

### 2. Service Definition
```hcl
service {
  name = "web"
  port = 80
  tags = ["prod"]
  check {
    id = "web-health"
    http = "http://localhost:80/health"
    interval = "10s"
    timeout = "1s"
  }
}
```

### 3. Environment Variables
```bash
export CONSUL_HTTP_ADDR="http://localhost:8500"
export CONSUL_HTTP_TOKEN="your-acl-token"
```

## Common Operations

### 1. Service Management
```bash
# Register service
consul services register web.hcl

# Deregister service
consul services deregister web.hcl

# List services
consul catalog services

# Query service health
consul health service web
```

### 2. Key-Value Operations
```bash
# Write key-value
consul kv put myapp/config/key value

# Read key-value
consul kv get myapp/config/key

# List keys
consul kv list myapp/config

# Delete key
consul kv delete myapp/config/key
```

### 3. Cluster Management
```bash
# List members
consul members

# Leave cluster
consul leave

# Reload configuration
consul reload

# Monitor logs
consul monitor
```

### 4. Snapshot Management
```bash
# Create snapshot
consul snapshot save backup.snap

# Restore snapshot
consul snapshot restore backup.snap

# Inspect snapshot
consul snapshot inspect backup.snap
```

## Troubleshooting

### 1. Check Cluster Status
```bash
# Check cluster members
consul members

# Check leader status
consul operator raft list-peers
```

### 2. Debug Logs
```bash
# Enable debug logging
consul agent -log-level=debug

# View logs
sudo journalctl -u consul -f
```

### 3. Common Issues
```bash
# Check DNS resolution
dig @127.0.0.1 -p 8600 web.service.consul

# Check service health
curl http://localhost:8500/v1/health/state/critical

# Verify ACL token
consul acl token read -self
```

## Uninstallation Instructions

### Linux
```bash
# Stop service
sudo systemctl stop consul
sudo systemctl disable consul

# Remove package
sudo apt-get remove --purge consul  # Debian/Ubuntu
sudo yum remove consul             # RHEL/CentOS

# Clean up
sudo rm -rf /etc/consul.d
sudo rm -rf /opt/consul
sudo rm /etc/systemd/system/consul.service
sudo userdel consul
```

### Docker
```bash
# Stop and remove container
docker stop consul
docker rm consul

# Remove image
docker rmi hashicorp/consul

# Clean up volumes
rm -rf consul/
```

### Kubernetes (Helm)
```bash
# Uninstall Consul
helm uninstall consul -n consul

# Clean up namespace
kubectl delete namespace consul
```

### Kubernetes (Manifests)
```bash
# Remove Consul resources
kubectl delete -f consul.yaml
kubectl delete configmap consul-config -n consul
kubectl delete namespace consul
``` 