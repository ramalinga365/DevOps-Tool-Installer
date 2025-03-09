#!/bin/bash

set -e  # Exit immediately if a command fails
LOG_FILE="install_devops_tools.log"

# Welcome Message
clear
echo "############################################################################"
echo "#                                                                          #"
echo "#        🚀 DevOps Tool Installer/Uninstaller by ProDevOpsGuy Tech        #"
echo "#                                                                          #"
echo "############################################################################"
echo ""
echo "🔹 Automate the installation and uninstallation of essential DevOps tools."
echo "🔹 Supports multiple Linux distributions with package manager detection."
echo "🔹 Easily install, update, or remove tools with a single command."
echo ""
echo "📌 Get started by selecting the tools you want to install or uninstall."
echo ""

# Function to log messages
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Auto-detect OS and package manager
detect_os() {
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$ID
    else
        OS=$(uname -s)
    fi

    case "$OS" in
        ubuntu | debian) PKG_MANAGER="apt-get" ;;
        centos | rhel | fedora | amazon) PKG_MANAGER="yum" ;;
        arch) PKG_MANAGER="pacman" ;;
        opensuse | sles) PKG_MANAGER="zypper" ;;
        alpine) PKG_MANAGER="apk" ;;
        *) log "Unsupported OS: $OS" && exit 1 ;;
    esac
}

# Ensure dependencies are installed
install_dependencies() {
    log "Installing required dependencies..."
    case "$PKG_MANAGER" in
        apt-get) sudo $PKG_MANAGER update && sudo $PKG_MANAGER install -y curl wget unzip ;;
        yum | dnf) sudo $PKG_MANAGER install -y curl wget unzip ;;
        pacman) sudo $PKG_MANAGER -Sy --noconfirm curl wget unzip ;;
        zypper) sudo $PKG_MANAGER install -y curl wget unzip ;;
        apk) sudo $PKG_MANAGER add --no-cache curl wget unzip ;;
    esac
}

# Function to check if a tool is installed
is_installed() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install a tool
install_tool() {
    local tool="$1"
    local cmd="$2"

    if is_installed "$tool"; then
        log "$tool is already installed. Skipping."
    else
        log "Installing $tool..."
        eval "$cmd" && log "$tool installed successfully." || log "Failed to install $tool."
    fi
}

# Function to uninstall a tool
uninstall_tool() {
    local tool="$1"
    local cmd="$2"

    if is_installed "$tool"; then
        log "Uninstalling $tool..."
        eval "$cmd" && log "$tool uninstalled successfully." || log "Failed to uninstall $tool."
    else
        log "$tool is not installed. Skipping."
    fi
}

# Define tool installation commands
declare -A INSTALL_CMDS=(
    [docker]="sudo $PKG_MANAGER install -y docker"
    [kubectl]="curl -LO https://dl.k8s.io/release/stable.txt && curl -LO https://dl.k8s.io/$(cat stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/"
    [ansible]="sudo $PKG_MANAGER install -y ansible"
    [terraform]="curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null && echo 'deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main' | sudo tee /etc/apt/sources.list.d/hashicorp.list > /dev/null && sudo $PKG_MANAGER update && sudo $PKG_MANAGER install -y terraform"
    [helm]="curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash"
    [awscli]="curl -fsSL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscli.zip && unzip awscli.zip && sudo ./aws/install"
    [azurecli]="curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
    [gcloud]="curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-346.0.0-linux-x86_64.tar.gz && tar -xvzf google-cloud-sdk-346.0.0-linux-x86_64.tar.gz && ./google-cloud-sdk/install.sh"
    [grafana]="sudo $PKG_MANAGER install -y grafana"
    [gitlab-runner]="curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64 && chmod +x /usr/local/bin/gitlab-runner"
    [istio]="curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.18.0 sh - && sudo mv istio-1.18.0/bin/istioctl /usr/local/bin/"
    [openshift]="curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/latest/openshift-client-linux.tar.gz && tar -xvf openshift-client-linux.tar.gz && sudo mv oc /usr/local/bin/ && sudo mv kubectl /usr/local/bin/"
    [minikube]="curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube"
    [packer]="curl -LO https://releases.hashicorp.com/packer/1.9.2/packer_1.9.2_linux_amd64.zip && unzip packer_1.9.2_linux_amd64.zip && sudo mv packer /usr/local/bin/"
    [jenkins]="sudo $PKG_MANAGER install -y jenkins"
    [vault]="curl -LO https://releases.hashicorp.com/vault/1.7.0/vault_1.7.0_linux_amd64.zip && unzip vault_1.7.0_linux_amd64.zip && sudo mv vault /usr/local/bin/"
    [consul]="curl -LO https://releases.hashicorp.com/consul/1.9.4/consul_1.9.4_linux_amd64.zip && unzip consul_1.9.4_linux_amd64.zip && sudo mv consul /usr/local/bin/"
)

# Define tool uninstallation commands
declare -A UNINSTALL_CMDS=(
    [docker]="sudo $PKG_MANAGER remove -y docker"
    [kubectl]="sudo rm -f /usr/local/bin/kubectl"
    [ansible]="sudo $PKG_MANAGER remove -y ansible"
    [terraform]="sudo $PKG_MANAGER remove -y terraform"
    [helm]="sudo rm -f /usr/local/bin/helm"
    [awscli]="sudo rm -rf /usr/local/aws-cli"
    [azurecli]="sudo $PKG_MANAGER remove -y azure-cli"
    [gcloud]="sudo rm -rf google-cloud-sdk"
    [grafana]="sudo $PKG_MANAGER remove -y grafana"
    [gitlab-runner]="sudo rm -f /usr/local/bin/gitlab-runner"
    [istio]="sudo rm -f /usr/local/bin/istioctl"
    [openshift]="sudo rm -f /usr/local/bin/oc"
    [minikube]="sudo rm -f /usr/local/bin/minikube"
    [packer]="sudo rm -f /usr/local/bin/packer"
    [jenkins]="sudo $PKG_MANAGER remove -y jenkins"
    [vault]="sudo rm -f /usr/local/bin/vault"
    [consul]="sudo rm -f /usr/local/bin/consul"
)

# Main Execution
detect_os
install_dependencies

read -p "Do you want to install or uninstall tools? (install/uninstall): " ACTION
read -p "Enter tools to $ACTION (space-separated): " SELECTED_TOOLS

for TOOL in $SELECTED_TOOLS; do
    if [[ "$ACTION" == "install" ]]; then
        install_tool "$TOOL" "${INSTALL_CMDS[$TOOL]}"
    elif [[ "$ACTION" == "uninstall" ]]; then
        uninstall_tool "$TOOL" "${UNINSTALL_CMDS[$TOOL]}"
    else
        log "Invalid action."
    fi
done

log "Operation completed successfully."
echo "🎉 Operation completed successfully. Check $LOG_FILE for details."
