---
title: HashiCorp Vault Installation Guide
description: Step-by-step guide to install and configure HashiCorp Vault for secrets management
---

# HashiCorp Vault Installation Guide

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

### 3. Install Vault
```bash
# For Debian/Ubuntu
sudo apt-get update
sudo apt-get install vault

# For RHEL/CentOS
sudo yum install vault
```

### 4. Create Server Configuration
```bash
sudo mkdir -p /etc/vault.d
sudo tee /etc/vault.d/config.hcl <<EOF
storage "file" {
  path = "/opt/vault/data"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = 1
}

api_addr = "http://127.0.0.1:8200"
ui = true
EOF
```

### 5. Create Systemd Service
```bash
sudo tee /etc/systemd/system/vault.service <<EOF
[Unit]
Description=HashiCorp Vault
Documentation=https://www.vaultproject.io/docs/
Requires=network-online.target
After=network-online.target

[Service]
Type=simple
User=vault
Group=vault
ExecStart=/usr/bin/vault server -config=/etc/vault.d/config.hcl
ExecReload=/bin/kill -HUP \$MAINPID
KillMode=process
KillSignal=SIGINT
Restart=on-failure
RestartSec=5
TimeoutStopSec=30
StartLimitBurst=3

[Install]
WantedBy=multi-user.target
EOF
```

## Docker Installation

### 1. Pull Vault Image
```bash
docker pull hashicorp/vault
```

### 2. Create Configuration Directory
```bash
mkdir -p vault/config
mkdir -p vault/file
```

### 3. Create Configuration File
```bash
cat > vault/config/vault.hcl <<EOF
storage "file" {
  path = "/vault/file"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = 1
}

ui = true
api_addr = "http://0.0.0.0:8200"
EOF
```

### 4. Run Vault Container
```bash
docker run -d \
  --name vault \
  --cap-add=IPC_LOCK \
  -p 8200:8200 \
  -v $(pwd)/vault/config:/vault/config \
  -v $(pwd)/vault/file:/vault/file \
  hashicorp/vault server -config=/vault/config/vault.hcl
```

## Kubernetes Installation

### 1. Using Helm
```bash
# Add HashiCorp repository
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

# Install Vault
helm install vault hashicorp/vault \
  --set "server.dev.enabled=true"
```

### 2. Using Manifests
```bash
# Create namespace
kubectl create namespace vault

# Create config map
kubectl create configmap vault-config \
  --from-file=vault.hcl \
  -n vault

# Apply Vault deployment
kubectl apply -f vault.yaml
```

## Post-Installation Setup

### 1. Initialize Vault
```bash
# For local installation
vault operator init

# For Docker
docker exec vault vault operator init

# For Kubernetes
kubectl exec -it vault-0 -- vault operator init
```

### 2. Unseal Vault
You need to run this command 3 times with different unseal keys:
```bash
vault operator unseal
```

### 3. Login to Vault
```bash
export VAULT_ADDR='http://127.0.0.1:8200'
vault login
```

## Configuration

### 1. Basic Configuration
```hcl
storage "file" {
  path = "/opt/vault/data"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = 1
}

seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "alias/vault-key"
}

ui = true
api_addr = "http://127.0.0.1:8200"
```

### 2. Environment Variables
```bash
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='your-token'
export VAULT_NAMESPACE='your-namespace'
```

### 3. TLS Configuration
```hcl
listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "/path/to/cert.pem"
  tls_key_file  = "/path/to/key.pem"
}
```

## Common Operations

### 1. Secret Management
```bash
# Write a secret
vault kv put secret/myapp/config username=myuser password=mypass

# Read a secret
vault kv get secret/myapp/config

# List secrets
vault kv list secret/

# Delete a secret
vault kv delete secret/myapp/config
```

### 2. Policy Management
```bash
# Write policy
vault policy write my-policy - <<EOF
path "secret/data/myapp/*" {
  capabilities = ["read", "list"]
}
EOF

# List policies
vault policy list

# Read policy
vault policy read my-policy
```

### 3. Authentication Methods
```bash
# Enable authentication method
vault auth enable userpass

# List auth methods
vault auth list

# Create user
vault write auth/userpass/users/myuser \
  password=mypassword \
  policies=my-policy
```

### 4. Audit Logging
```bash
# Enable file audit device
vault audit enable file file_path=/var/log/vault/audit.log

# List audit devices
vault audit list

# Disable audit device
vault audit disable file
```

## Troubleshooting

### 1. Check Vault Status
```bash
vault status
```

### 2. Server Logs
```bash
# Systemd logs
sudo journalctl -u vault

# Docker logs
docker logs vault

# Kubernetes logs
kubectl logs vault-0 -n vault
```

### 3. Debug Mode
```bash
vault server -dev -log-level=debug
```

## Uninstallation Instructions

### Linux
```bash
# Stop service
sudo systemctl stop vault
sudo systemctl disable vault

# Remove package
sudo apt-get remove --purge vault  # Debian/Ubuntu
sudo yum remove vault             # RHEL/CentOS

# Clean up
sudo rm -rf /etc/vault.d
sudo rm -rf /opt/vault
sudo rm /etc/systemd/system/vault.service
sudo userdel vault
```

### Docker
```bash
# Stop and remove container
docker stop vault
docker rm vault

# Remove image
docker rmi hashicorp/vault

# Clean up volumes
rm -rf vault/
```

### Kubernetes (Helm)
```bash
# Uninstall Vault
helm uninstall vault

# Clean up namespace
kubectl delete namespace vault
```

### Kubernetes (Manifests)
```bash
# Remove Vault resources
kubectl delete -f vault.yaml
kubectl delete configmap vault-config -n vault
kubectl delete namespace vault
``` 