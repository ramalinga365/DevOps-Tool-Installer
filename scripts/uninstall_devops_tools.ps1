# uninstall_devops_tools.ps1

Clear-Host

# Function: Display Header UI
function Show-Header {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor DarkRed
    Write-Host "║                                                                        ║" -ForegroundColor DarkRed
    Write-Host "║        🧹 DevOps Tool Uninstaller by ProDevOpsGuy Tech 🧹              ║" -ForegroundColor DarkRed
    Write-Host "║                                                                        ║" -ForegroundColor DarkRed
    Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor DarkRed
    Write-Host ""
    Write-Host "Remove DevOps tools from your system using Chocolatey with a clean and simple interface."
    Write-Host "Choose the tool you want to uninstall from the list below."
    Write-Host ""
}

# Function: Display Tool List
function Show-Tools {
    Write-Host "`n🗑️ Tools available for uninstallation:`n" -ForegroundColor Yellow

    $tools = @(
        "Docker", "Kubernetes (kubectl)", "Ansible", "Terraform", "Jenkins",
        "AWS CLI", "Azure CLI", "Google Cloud SDK", "Helm", "Prometheus",
        "Grafana", "GitLab Runner (Runner)", "HashiCorp Vault", "HashiCorp Consul",
        "Minikube", "Istio", "OpenShift CLI", "Packer", "Vagrant"
    )

    for ($i = 0; $i -lt $tools.Count; $i++) {
        Write-Host ("[{0,2}] {1}" -f ($i + 1), $tools[$i]) -ForegroundColor Magenta
    }

    return $tools
}

# Function: Map Tool Names to Chocolatey Package Names
function Get-PackageName {
    param([string]$toolName)

    $map = @{
        "Docker" = "docker-desktop"
        "Kubernetes (kubectl)" = "kubernetes-cli"
        "Ansible" = "ansible"
        "Terraform" = "terraform"
        "Jenkins" = "jenkins"
        "AWS CLI" = "awscli"
        "Azure CLI" = "azure-cli"
        "Google Cloud SDK" = "google-cloud-sdk"
        "Helm" = "kubernetes-helm"
        "Prometheus" = "prometheus"
        "Grafana" = "grafana"
        "GitLab Runner (Runner)" = "gitlab-runner"
        "HashiCorp Vault" = "vault"
        "HashiCorp Consul" = "consul"
        "Minikube" = "minikube"
        "Istio" = "istio"
        "OpenShift CLI" = "openshift-cli"
        "Packer" = "packer"
        "Vagrant" = "vagrant"
    }

    return $map[$toolName]
}

# Function: Uninstall Tool
function Uninstall-Tool {
    param([string]$packageName)

    try {
        Write-Host "`n🔄 Uninstalling '$packageName' using Chocolatey..." -ForegroundColor Cyan
        choco uninstall $packageName -y
        Write-Host "`n✅ $packageName uninstalled successfully." -ForegroundColor Green
    } catch {
        Write-Host "`n❌ Failed to uninstall $packageName: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Main Menu Function
function Show-MainMenu {
    Show-Header
    $toolList = Show-Tools

    $selection = Read-Host "`nEnter the number of the tool you want to uninstall"

    if ($selection -match "^\d+$" -and [int]$selection -ge 1 -and [int]$selection -le $toolList.Count) {
        $toolName = $toolList[[int]$selection - 1]
        $package = Get-PackageName -toolName $toolName

        if ($null -ne $package) {
            Uninstall-Tool -packageName $package
        } else {
            Write-Host "`n⚠️ Package mapping not found for selected tool." -ForegroundColor Red
        }
    } else {
        Write-Host "`n⚠️ Invalid input. Please enter a number from the list." -ForegroundColor Red
    }
}

# Entry Point
Show-MainMenu
