# Azure CLI

Command line interface for managing Azure resources

## Requirements

- Internet connectivity
- Azure subscription (for using the CLI)
- Python 3.6 or later (for Linux installation)

## Linux Installation

1. Get packages needed for the installation process:
```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl apt-transport-https lsb-release gnupg
```

2. Download and install the Microsoft signing key:
```bash
curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null
```

3. Add the Azure CLI software repository:
```bash
AZ_REPO=$(lsb_release -cs)
echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | sudo tee /etc/apt/sources.list.d/azure-cli.list
```

4. Update repository information and install:
```bash
sudo apt-get update
sudo apt-get install -y azure-cli
```

5. Verify the installation:
```bash
az --version
```

## Windows Installation

1. Download the MSI installer:
- Visit [Azure CLI Windows Installer](https://aka.ms/installazurecliwindows)
- Download and run the MSI installer
- Follow the installation wizard

2. Verify the installation:
```powershell
az --version
```

## Configuration

1. Sign in to Azure:
```bash
az login
```

2. Set your default subscription:
```bash
az account set --subscription "subscription-name-or-id"
```

## Common Commands

```bash
# List resource groups
az group list

# Create a resource group
az group create --name MyResourceGroup --location eastus

# List virtual machines
az vm list

# Create a storage account
az storage account create \
  --name mystorageaccount \
  --resource-group MyResourceGroup \
  --location eastus \
  --sku Standard_LRS

# List available locations
az account list-locations

# Get help for a command
az vm create --help
```

## Environment Variables

Configure Azure CLI behavior using environment variables:

```bash
# Set default subscription
export AZURE_SUBSCRIPTION_ID="your-subscription-id"

# Set default resource group
export AZURE_RESOURCE_GROUP="your-resource-group"

# Set default location
export AZURE_LOCATION="eastus"
```

## Uninstallation Instructions

### Linux

1. Remove Azure CLI:
```bash
sudo apt-get remove -y azure-cli
sudo apt-get autoremove -y
```

2. Remove repository and signing key:
```bash
sudo rm /etc/apt/sources.list.d/azure-cli.list
sudo rm /etc/apt/trusted.gpg.d/microsoft.gpg
```

3. Remove configuration files:
```bash
rm -rf ~/.azure
```

### Windows

1. Uninstall via Control Panel:
- Open Control Panel
- Programs and Features
- Select Microsoft Azure CLI
- Click Uninstall

2. Remove configuration files:
```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.azure"
``` 