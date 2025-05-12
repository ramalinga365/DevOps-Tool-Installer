# Google Cloud SDK

Command line interface for Google Cloud Platform

## Requirements

- Internet connectivity
- Google Cloud account
- Python 2.7.9 or higher / Python 3.5 or higher

## Linux Installation

1. Add the Google Cloud SDK distribution URI as a package source:
```bash
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

2. Import the Google Cloud public key:
```bash
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
```

3. Update and install the SDK:
```bash
sudo apt-get update
sudo apt-get install -y google-cloud-sdk
```

4. Verify installation:
```bash
gcloud --version
```

## Windows Installation

1. Download the Google Cloud SDK installer:
- Visit [Google Cloud SDK Installer](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe)
- Run the downloaded installer
- Follow the installation wizard

2. Verify installation:
```powershell
gcloud --version
```

## Configuration

1. Initialize the SDK:
```bash
gcloud init
```

2. Authenticate and set project:
```bash
gcloud auth login
gcloud config set project PROJECT_ID
```

## Common Commands

```bash
# List all configurations
gcloud config list

# List compute instances
gcloud compute instances list

# Create a new instance
gcloud compute instances create INSTANCE_NAME \
  --machine-type=n1-standard-1 \
  --zone=us-central1-a

# List Cloud Storage buckets
gsutil ls

# Create a new bucket
gsutil mb gs://BUCKET_NAME

# List available regions
gcloud compute regions list

# Get help
gcloud help
```

## Components and Extensions

Install additional components:

```bash
# List available components
gcloud components list

# Install specific component
gcloud components install COMPONENT_ID

# Update all components
gcloud components update
```

## Environment Variables

Configure the SDK using environment variables:

```bash
# Set default project
export CLOUDSDK_CORE_PROJECT="your-project-id"

# Set default compute region
export CLOUDSDK_COMPUTE_REGION="us-central1"

# Set default compute zone
export CLOUDSDK_COMPUTE_ZONE="us-central1-a"
```

## Uninstallation Instructions

### Linux

1. Remove Google Cloud SDK:
```bash
sudo apt-get remove -y google-cloud-sdk
sudo apt-get autoremove -y
```

2. Remove repository configuration:
```bash
sudo rm /etc/apt/sources.list.d/google-cloud-sdk.list
sudo rm /usr/share/keyrings/cloud.google.gpg
```

3. Remove configuration files:
```bash
rm -rf ~/.config/gcloud
```

### Windows

1. Uninstall via Control Panel:
- Open Control Panel
- Programs and Features
- Select Google Cloud SDK
- Click Uninstall

2. Remove configuration files:
```powershell
Remove-Item -Recurse -Force "$env:APPDATA\gcloud"
``` 