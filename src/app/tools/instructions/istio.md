---
title: Istio Installation Guide
description: Step-by-step guide to install and configure Istio service mesh for Kubernetes
---

# Istio Installation Guide

## Prerequisites
- Kubernetes cluster (version 1.22 or later)
- kubectl installed and configured
- Helm (optional)
- 16GB RAM minimum for evaluation
- 4 vCPUs minimum for evaluation

## Installation Methods

### 1. Using istioctl (Recommended)

#### Download and Install istioctl
```bash
# Download latest release
curl -L https://istio.io/downloadIstio | sh -

# Move to the Istio package directory
cd istio-*

# Add istioctl to PATH
export PATH=$PWD/bin:$PATH
```

#### Install Istio Core Components
```bash
# Install with default profile
istioctl install --set profile=default -y

# Verify installation
kubectl get pods -n istio-system
```

### 2. Using Helm

#### Add Istio Repository
```bash
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
```

#### Install Istio Base
```bash
kubectl create namespace istio-system
helm install istio-base istio/base -n istio-system
```

#### Install Istiod
```bash
helm install istiod istio/istiod -n istio-system --wait
```

#### Install Ingress Gateway
```bash
helm install istio-ingress istio/gateway -n istio-system
```

## Post-Installation Setup

### 1. Enable Sidecar Injection
```bash
# Label namespace for automatic injection
kubectl label namespace default istio-injection=enabled

# Verify label
kubectl get namespace -L istio-injection
```

### 2. Install Addons
```bash
# Install Kiali, Prometheus, Grafana, and Jaeger
kubectl apply -f samples/addons/

# Verify addon deployment
kubectl get pods -n istio-system
```

### 3. Configure Gateway
```yaml
# Create gateway.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: my-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
```

## Configuration

### 1. Traffic Management
```yaml
# Virtual Service Example
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
  - my-service
  http:
  - route:
    - destination:
        host: my-service
        subset: v1
      weight: 90
    - destination:
        host: my-service
        subset: v2
      weight: 10
```

### 2. Security Policies
```yaml
# Authentication Policy
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
```

### 3. Monitoring Configuration
```yaml
# Telemetry Configuration
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: mesh-default
  namespace: istio-system
spec:
  tracing:
    sampling: 100
  metrics:
    - providers:
      - name: prometheus
```

## Common Operations

### 1. Traffic Management
```bash
# Apply routing rules
kubectl apply -f virtual-service.yaml
kubectl apply -f destination-rule.yaml

# View routing configuration
istioctl analyze

# Describe virtual service
kubectl describe virtualservice my-service
```

### 2. Security Management
```bash
# Enable mTLS
kubectl apply -f peer-authentication.yaml

# View authentication policies
kubectl get peerauthentication -A

# Check mTLS status
istioctl analyze -n default
```

### 3. Observability
```bash
# Access Kiali dashboard
istioctl dashboard kiali

# Access Grafana
istioctl dashboard grafana

# Access Jaeger
istioctl dashboard jaeger
```

### 4. Troubleshooting
```bash
# Verify proxy status
istioctl proxy-status

# Debug envoy configuration
istioctl proxy-config all pod-name.namespace

# Check service configuration
istioctl analyze namespace
```

## Advanced Features

### 1. Fault Injection
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - fault:
      delay:
        percentage:
          value: 10
        fixedDelay: 5s
    route:
    - destination:
        host: ratings
        subset: v1
```

### 2. Circuit Breaking
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: my-service
spec:
  host: my-service
  trafficPolicy:
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
```

### 3. Request Timeouts
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
  - my-service
  http:
  - timeout: 10s
    route:
    - destination:
        host: my-service
```

## Upgrade Instructions

### 1. Canary Upgrade
```bash
# Download new version
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.18.0 sh -

# Install new control plane
istioctl install --set profile=default --revision 1.18.0

# Verify new revision
kubectl get pods -n istio-system
```

### 2. In-Place Upgrade
```bash
# Download new version
curl -L https://istio.io/downloadIstio | sh -

# Upgrade Istio
istioctl upgrade

# Verify upgrade
istioctl version
```

## Uninstallation Instructions

### 1. Using istioctl
```bash
# Remove Istio core components
istioctl uninstall --purge

# Remove namespace
kubectl delete namespace istio-system
```

### 2. Using Helm
```bash
# Remove Istio components
helm uninstall istio-ingress -n istio-system
helm uninstall istiod -n istio-system
helm uninstall istio-base -n istio-system

# Remove namespace
kubectl delete namespace istio-system
```

### 3. Clean Up Resources
```bash
# Remove CRDs
kubectl get crd | grep --color=never 'istio.io' | awk '{print $1}' | xargs -n1 kubectl delete crd

# Remove configurations
kubectl delete -f samples/addons/
kubectl label namespace default istio-injection-

# Remove istioctl
rm -rf ~/istio-*
```

### 4. Verify Cleanup
```bash
# Check for remaining resources
kubectl get all -n istio-system
kubectl get crd | grep istio

# Check for remaining configurations
istioctl analyze
``` 